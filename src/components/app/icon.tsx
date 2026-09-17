"use client";

import {
  Scale,
  ArrowLeftRight,
  BookOpen,
  BookCopy,
  ListChecks,
  FileText,
  HelpCircle,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const map: Record<string, ComponentType<LucideProps>> = {
  Scale,
  ArrowLeftRight,
  BookOpen,
  BookCopy,
  ListChecks,
  FileText,
};

export function LessonIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Cmp = map[name] ?? HelpCircle;
  return <Cmp {...props} />;
}
