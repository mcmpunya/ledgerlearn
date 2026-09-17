"use client";

import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react";
import {
  auth,
  googleProvider,
  firebaseClientEnabled,
} from "@/lib/firebase-client";
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged, type User } from "firebase/auth";

type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type AuthState = {
  /** True while the initial session check is in flight. */
  loading: boolean;
  /** The signed-in user, or null. */
  user: AuthUser | null;
  /** True when Firebase is configured and a session cookie is active. */
  isSignedIn: boolean;
  /** True when running without Firebase (sandbox). */
  demoMode: boolean;
  /** Trigger Google sign-in (creates session cookie via /api/auth/session). */
  signInWithGoogle: () => Promise<void>;
  /** Sign out (clears session cookie + Firebase client state). */
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [demoMode, setDemoMode] = useState(!firebaseClientEnabled);

  // Bootstrap: read /api/auth/me once on mount to hydrate from the
  // HTTP-only session cookie. We don't rely on Firebase client state
  // alone because the cookie is what the server sees.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await r.json();
        if (cancelled) return;
        if (data.user) {
          setUser(data.user);
        }
        setDemoMode(!!data.demo);
      } catch {
        // ignore — leave defaults
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    // Also subscribe to Firebase client auth state so we react to
    // token refreshes while the tab is open.
    if (auth) {
      const unsub = onAuthStateChanged(auth, (fbUser: User | null) => {
        // Don't override user from cookie — only refresh if user already present
        if (fbUser && !cancelled) {
          setUser((prev) =>
            prev
              ? {
                  ...prev,
                  email: fbUser.email ?? prev.email,
                  displayName: fbUser.displayName ?? prev.displayName,
                  photoURL: fbUser.photoURL ?? prev.photoURL,
                }
              : prev
          );
        }
      });
      return () => {
        cancelled = true;
        unsub();
      };
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) {
      // Demo mode — no actual sign-in. The UI shouldn't call this
      // when demoMode is true, but we guard anyway.
      return;
    }
    const cred = await signInWithPopup(auth, googleProvider);
    const idToken = await cred.user.getIdToken();
    // Exchange for session cookie
    const r = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!r.ok) {
      throw new Error("Failed to create session");
    }
    setUser({
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName,
      photoURL: cred.user.photoURL,
    });
    // Sign out of the client SDK — we rely on the cookie from here.
    await fbSignOut(auth);
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <Ctx.Provider
      value={{
        loading,
        user,
        isSignedIn: !!user,
        demoMode,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
