import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/quiz?lessonId=...&count=N
// If lessonId is provided, return that lesson's questions.
// Otherwise, return a randomised mixed quiz.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");
  const count = parseInt(searchParams.get("count") ?? "10", 10);

  let questions;
  if (lessonId) {
    questions = await db.quizQuestion.findMany({
      where: { lessonId },
      orderBy: { createdAt: "asc" },
    });
  } else {
    const all = await db.quizQuestion.findMany({ orderBy: { createdAt: "asc" } });
    // Fisher–Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    questions = all.slice(0, Math.min(count, all.length));
  }
  return NextResponse.json(questions);
}
