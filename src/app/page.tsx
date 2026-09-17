"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Header } from "@/components/app/header";
import { Footer } from "@/components/app/footer";
import { DashboardView } from "@/components/app/dashboard-view";
import { LessonsView } from "@/components/app/lessons-view";
import { LessonDetailView } from "@/components/app/lesson-detail-view";
import { PracticeView } from "@/components/app/practice-view";
import { QuizView } from "@/components/app/quiz-view";
import { ProgressView } from "@/components/app/progress-view";
import { AuthProvider, useAuth } from "@/components/app/auth-provider";
import { LayoutDashboard, BookOpen, Beaker, Brain, LineChart } from "lucide-react";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: false },
  },
});

type Tab = "dashboard" | "lessons" | "lesson" | "practice" | "quiz" | "progress";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthAwareRefresher />
          <AppShell />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

/** When the signed-in user changes, invalidate all queries so the
 * dashboard / progress views refetch against the new student ID. */
function AuthAwareRefresher() {
  const { user } = useAuth();
  const qc = useQueryClient();
  useEffect(() => {
    qc.invalidateQueries();
  }, [user?.uid, qc]);
  return null;
}

function AppShell() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [lessonSlug, setLessonSlug] = useState<string>("");

  function openLesson(slug: string) {
    setLessonSlug(slug);
    setTab("lesson");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchTab(next: string) {
    setTab(next as Tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { id: "lessons", label: t("nav.lessons"), icon: BookOpen },
    { id: "practice", label: t("nav.practice"), icon: Beaker },
    { id: "quiz", label: t("nav.quiz"), icon: Brain },
    { id: "progress", label: t("nav.progress"), icon: LineChart },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Tab navigation */}
      <nav className="sticky top-16 z-30 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-2 sm:px-6">
          {tabs.map((tb) => {
            const active = tab === tb.id || (tb.id === "lessons" && tab === "lesson");
            return (
              <button
                key={tb.id}
                onClick={() => switchTab(tb.id)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm transition-colors ${
                  active
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tb.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tb.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {tab === "dashboard" && (
          <DashboardView onOpenLesson={openLesson} onSwitchTab={switchTab} />
        )}
        {tab === "lessons" && <LessonsView onOpen={openLesson} />}
        {tab === "lesson" && lessonSlug && (
          <LessonDetailView
            slug={lessonSlug}
            onBack={() => switchTab("lessons")}
            onCompleteQuiz={() => switchTab("quiz")}
          />
        )}
        {tab === "practice" && <PracticeView />}
        {tab === "quiz" && <QuizView />}
        {tab === "progress" && <ProgressView onOpenLesson={openLesson} />}
      </main>

      <Footer />
    </div>
  );
}
