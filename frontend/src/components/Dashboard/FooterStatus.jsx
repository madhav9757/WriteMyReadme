"use client";

import { Separator } from "@/components/ui/separator";

export default function FooterStatus() {
  return (
    <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Active Session
      </div>
      <Separator orientation="vertical" className="h-4" />
      <span>Last synced just now</span>
    </div>
  );
}
