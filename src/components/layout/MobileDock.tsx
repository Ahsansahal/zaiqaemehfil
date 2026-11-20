"use client";

import Link from "next/link";
import { SITE } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { CalendarIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

export function MobileDock() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed left-0 right-0 bottom-0 z-[42] px-3 pt-2 pb-[calc(0.55rem+env(safe-area-inset-bottom,0px))] bg-[rgba(10,11,13,0.92)] backdrop-blur-xl border-t border-[rgba(240,234,222,0.06)] grid grid-cols-3 gap-2 min-[900px]:hidden"
    >
      <a
        href={`tel:${SITE.tel}`}
        onClick={() => trackEvent("call_click", { link_location: "dock" })}
        className="flex flex-col items-center justify-center gap-1 min-h-[56px] rounded-2xl text-[0.75rem] font-bold tracking-[0.07em] uppercase bg-gold text-void border border-gold active:scale-95 transition-transform"
      >
        <PhoneIcon className="w-[19px] h-[19px]" />
        Call
      </a>
      <a
        href={SITE.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("directions_click", { link_location: "dock" })}
        className="flex flex-col items-center justify-center gap-1 min-h-[56px] rounded-2xl text-[0.75rem] font-bold tracking-[0.07em] uppercase text-fg-soft bg-[rgba(240,234,222,0.05)] border border-[rgba(240,234,222,0.06)] active:scale-95 transition-transform"
      >
        <PinIcon className="w-[19px] h-[19px]" />
        Directions
      </a>
      <Link
        href="/contact#book"
        className="flex flex-col items-center justify-center gap-1 min-h-[56px] rounded-2xl text-[0.75rem] font-bold tracking-[0.07em] uppercase text-fg-soft bg-[rgba(240,234,222,0.05)] border border-[rgba(240,234,222,0.06)] active:scale-95 transition-transform"
      >
        <CalendarIcon className="w-[19px] h-[19px]" />
        Book
      </Link>
    </nav>
  );
}
