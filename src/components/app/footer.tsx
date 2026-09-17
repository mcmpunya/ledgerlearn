"use client";

import { BookOpenCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <BookOpenCheck className="h-4 w-4 text-primary" />
          <span className="font-semibold">{t("app.title")}</span>
          <span className="text-muted-foreground">— {t("footer.tagline")}</span>
        </div>
        <div className="text-xs text-muted-foreground">{t("footer.disclaimer")}</div>
      </div>
    </footer>
  );
}
