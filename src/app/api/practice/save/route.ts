import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DEFAULT_STUDENT_ID } from "@/lib/constants";

// POST /api/practice/save
// Body: { scenarioId, entriesJson, isBalanced }
export async function POST(req: Request) {
  const body = await req.json();
  const { scenarioId, entriesJson, isBalanced } = body as {
    scenarioId: string;
    entriesJson: string;
    isBalanced: boolean;
  };

  if (!scenarioId || !entriesJson) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const record = await db.practiceRecord.create({
    data: {
      studentId: DEFAULT_STUDENT_ID,
      scenarioId,
      entriesJson,
      isBalanced,
    },
  });
  return NextResponse.json({ id: record.id, savedAt: record.createdAt });
}
