"use client";

import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Target, TrendingUp } from "lucide-react";
import { LessonIcon } from "./icon";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

type Dashboard = {
  stats: {
    totalLessons: number;
    completedLessons: number;
    totalAttempts: number;
    correctAttempts: number;
    totalPoints: number;
    accuracy: number;
    overallCompletion: number;
  };
  byLesson: {
    id: string;
    slug: string;
    titleEn: string;
    titleMs: string;
    icon: string;
    order: number;
    status: string;
    completionPct: number;
    quizCount: number;
    attempts: number;
    accuracy: number;
  }[];
  byDifficulty: { difficulty: string; total: number; correct: number }[];
  scoreTrend: { idx: number; correct: number; points: number }[];
};

export function ProgressView({ onOpenLesson }: { onOpenLesson: (slug: string) => void }) {
  const { t, locale } = useI18n();

  const { data, isLoading } = useQuery<Dashboard>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const r = await fetch("/api/dashboard");
      return r.json();
    },
  });

  if (isLoading || !data) {
    return (
      <div className="grid h-64 place-items-center text-sm text-muted-foreground">
        {t("common.loading")}
      </div>
    );
  }

  const { stats } = data;

  // Difficulty bar chart
  const diffData = data.byDifficulty.map((d) => ({
    name: d.difficulty.charAt(0).toUpperCase() + d.difficulty.slice(1),
    total: d.total,
    correct: d.correct,
    rate: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("progress.title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("progress.subtitle")}</p>
      </div>

      {/* Top stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Award}
          label={t("progress.totalPoints")}
          value={String(stats.totalPoints)}
          tone="amber"
        />
        <StatCard
          icon={Target}
          label={t("progress.accuracy")}
          value={`${stats.accuracy}%`}
          tone="emerald"
        />
        <StatCard
          icon={TrendingUp}
          label={t("dash.lessonsCompleted")}
          value={`${stats.completedLessons}/${stats.totalLessons}`}
          tone="primary"
        />
        <StatCard
          icon={Award}
          label={t("dash.quizzesTaken")}
          value={String(stats.totalAttempts)}
          tone="rose"
        />
      </div>

      {/* Per-module progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("progress.byModule")}</CardTitle>
          <CardDescription className="text-xs">
            {locale === "ms"
              ? "Klik modul untuk membuka pelajaran"
              : "Click a module to open the lesson"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.byLesson.map((l) => (
              <button
                key={l.id}
                onClick={() => onOpenLesson(l.slug)}
                className="focus-ring w-full rounded-lg border border-border p-3 text-left transition-colors hover:border-primary/40 hover:bg-muted/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <LessonIcon name={l.icon} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        {locale === "ms" ? l.titleMs : l.titleEn}
                      </div>
                      <div className="text-[0.7rem] text-muted-foreground">
                        {l.attempts} {locale === "ms" ? "percubaan" : "attempts"}
                        {l.attempts > 0 && ` · ${l.accuracy}% ${locale === "ms" ? "tepat" : "accurate"}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {l.status === "completed" && (
                      <Badge className="bg-emerald-600 text-[0.65rem] hover:bg-emerald-600">
                        {t("lessons.completed")}
                      </Badge>
                    )}
                    <span className="font-mono text-xs text-muted-foreground">{l.completionPct}%</span>
                  </div>
                </div>
                <Progress value={l.completionPct} className="mt-2 h-1" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Difficulty chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("progress.attemptsByDifficulty")}</CardTitle>
          <CardDescription className="text-xs">
            {locale === "ms"
              ? "Bilangan soalan dijawab mengikut tahap kesukaran"
              : "Number of questions answered by difficulty level"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {diffData.every((d) => d.total === 0) ? (
            <div className="grid h-48 place-items-center text-sm text-muted-foreground">
              {t("progress.noData")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={diffData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="total" name={locale === "ms" ? "Jumlah" : "Total"} radius={[4, 4, 0, 0]}>
                  {diffData.map((d, i) => (
                    <Cell
                      key={i}
                      fill={
                        d.name === "Beginner"
                          ? "var(--chart-1)"
                          : d.name === "Intermediate"
                          ? "var(--chart-2)"
                          : "var(--chart-3)"
                      }
                    />
                  ))}
                </Bar>
                <Bar dataKey="correct" name={locale === "ms" ? "Betul" : "Correct"} fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            {diffData.map((d) => (
              <div key={d.name} className="flex items-center gap-1">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background:
                      d.name === "Beginner"
                        ? "var(--chart-1)"
                        : d.name === "Intermediate"
                        ? "var(--chart-2)"
                        : "var(--chart-3)",
                  }}
                />
                <span className="text-muted-foreground">{d.name}:</span>
                <span className="font-mono">
                  {d.correct}/{d.total} ({d.rate}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Award;
  label: string;
  value: string;
  tone: "primary" | "emerald" | "amber" | "rose";
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={`grid h-10 w-10 place-items-center rounded-lg ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold leading-tight">{value}</div>
            <div className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
