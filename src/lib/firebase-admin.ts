import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

/**
 * Server-side Firebase Admin SDK.
 *
 * Initialised only when service-account credentials are present.
 * In the sandbox (no creds), `firebaseApp` is null and the app falls
 * back to demo mode using DEFAULT_STUDENT_ID.
 */
const hasCreds =
  !!process.env.FIREBASE_PROJECT_ID &&
  !!process.env.FIREBASE_CLIENT_EMAIL &&
  !!process.env.FIREBASE_PRIVATE_KEY;

let firebaseApp: App | null = null;
let firebaseAuth: Auth | null = null;

if (hasCreds && getApps().length === 0) {
  firebaseApp = initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    }),
  });
} else if (hasCreds) {
  firebaseApp = getApps()[0];
}

if (firebaseApp) {
  firebaseAuth = getAuth(firebaseApp);
}

export { firebaseApp, firebaseAuth, hasCreds as firebaseEnabled };

/** Session cookie lifetime in milliseconds (5 days). */
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 5 * 1000;
export const SESSION_COOKIE_NAME = "ledgerlearn_session";
