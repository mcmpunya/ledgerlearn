import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentStudentId } from "@/lib/auth";

// GET /api/dashboard
// Returns aggregated progress + recent activity for the current student.
export async function GET() {
  const studentId = await getCurrentStudentId();

  const [student, lessons] = await Promise.all([
    db.student.findUnique({ where: { id: studentId } }),
    db.lesson.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { quizQuestions: true } } },
    }),
  ]);

  const progress = await db.lessonProgress.findMany({
    where: { studentId },
    include: { lesson: true },
  });

  const attempts = await db.quizAttempt.findMany({
    where: { studentId },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: { question: { include: { lesson: true } } },
  });

  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((a) => a.isCorrect).length;
  const totalPoints = attempts.reduce((sum, a) => sum + a.pointsEarned, 0);
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  const completedLessons = progress.filter((p) => p.status === "completed").length;
  const overallCompletion =
    lessons.length > 0
      ? Math.round(
          progress.reduce((sum, p) => sum + p.completionPct, 0) / lessons.length
        )
      : 0;

  // Skill mastery per lesson (avg correctness)
  const byLesson = lessons.map((l) => {
    const lessonAttempts = attempts.filter((a) => a.question.lessonId === l.id);
    const lessonCorrect = lessonAttempts.filter((a) => a.isCorrect).length;
    const lessonAccuracy =
      lessonAttempts.length > 0
        ? Math.round((lessonCorrect / lessonAttempts.length) * 100)
        : 0;
    const p = progress.find((pp) => pp.lessonId === l.id);
    return {
      id: l.id,
      slug: l.slug,
      titleEn: l.titleEn,
      titleMs: l.titleMs,
      icon: l.icon,
      order: l.order,
      status: p?.status ?? "not_started",
      completionPct: p?.completionPct ?? 0,
      quizCount: l._count.quizQuestions,
      attempts: lessonAttempts.length,
      accuracy: lessonAccuracy,
    };
  });

  // Score trend (last 10 attempts in chronological order)
  const scoreTrend = [...attempts]
    .reverse()
    .slice(-15)
    .map((a, idx) => ({
      idx: idx + 1,
      correct: a.isCorrect ? 1 : 0,
      points: a.pointsEarned,
      lessonSlug: a.question.lesson?.slug ?? null,
      difficulty: a.question.difficulty,
      at: a.createdAt.toISOString(),
    }));

  // Attempts by difficulty
  const byDifficulty = ["beginner", "intermediate", "advanced"].map((d) => {
    const list = attempts.filter((a) => a.question.difficulty === d);
    return {
      difficulty: d,
      total: list.length,
      correct: list.filter((a) => a.isCorrect).length,
    };
  });

  return NextResponse.json({
    student: {
      id: studentId,
      displayName: student?.displayName ?? "Student",
      photoUrl: student?.photoUrl ?? null,
      isDemo: studentId === "student-demo",
    },
    stats: {
      totalLessons: lessons.length,
      completedLessons,
      totalAttempts,
      correctAttempts,
      totalPoints,
      accuracy,
      overallCompletion,
    },
    byLesson,
    recentAttempts: attempts.slice(0, 8).map((a) => ({
      id: a.id,
      isCorrect: a.isCorrect,
      pointsEarned: a.pointsEarned,
      difficulty: a.question.difficulty,
      lessonSlug: a.question.lesson?.slug ?? null,
      lessonTitleEn: a.question.lesson?.titleEn ?? null,
      lessonTitleMs: a.question.lesson?.titleMs ?? null,
      at: a.createdAt.toISOString(),
    })),
    scoreTrend,
    byDifficulty,
  });
}
