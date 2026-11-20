"use client";

import { useEffect, useState } from "react";
import { getLiveStatus } from "@/lib/hours";

export function LiveStatusBadge() {
  const [status, setStatus] = useState<{ isOpen: boolean; label: string } | null>(null);

  useEffect(() => {
    setStatus(getLiveStatus());
  }, []);

  const isOpen = status ? status.isOpen : true;
  const label = status ? status.label : "Open daily, from 8:00 at weekends";

  return (
    <span className="inline-flex items-center gap-2 font-semibold text-fg">
      <span
        className={`relative flex h-2 w-2 shrink-0`}
        aria-hidden="true"
      >
        {isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-live opacity-60" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isOpen
              ? "bg-green-live shadow-[0_0_0_4px_rgba(108,199,154,0.18)]"
              : "bg-red-closed shadow-[0_0_0_4px_rgba(224,134,108,0.18)]"
          }`}
        />
      </span>
      <span>{label}</span>
    </span>
  );
}
