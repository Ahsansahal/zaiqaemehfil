"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SITE } from "@/data/site";
import { DAYS_ORDER, getLondonNow } from "@/lib/hours";
import { trackEvent } from "@/lib/analytics";
import { Reveal } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { PhoneIcon, PinIcon } from "@/components/ui/Icons";

interface FindUsSectionProps {
  context: "home" | "contact" | "thanks";
}

export function FindUsSection({ context }: FindUsSectionProps) {
  const [copied, setCopied] = useState(false);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(getLondonNow().day);
  }, []);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(SITE.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <section
      id="find"
      aria-labelledby="find-h"
      className="py-[clamp(3.6rem,8vw,7rem)]"
    >
      <div className="max-w-[96%] mx-auto px-5 lg:px-10 grid gap-[clamp(2.2rem,5vw,4rem)] items-start min-[900px]:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
            Find us
          </span>
          <h2
            id="find-h"
            className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mt-5 mb-6"
          >
            Pakistani &amp; Afghan restaurant by{" "}
            <em className="italic font-normal text-gold">Sudbury Hill station</em>
          </h2>
          <address className="font-serif text-[1.55rem] leading-[1.45] text-fg not-italic">
            {SITE.address.street}
            <br />
            {SITE.address.locality}
            <br />
            {SITE.address.postcode}
          </address>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackEvent("call_click", { link_location: `${context}_big` })}
              className="inline-block py-1 font-serif text-[clamp(2.2rem,5.4vw,3.1rem)] text-gold font-semibold leading-none hover:text-gold-hi transition-colors"
            >
              {SITE.phone}
            </a>
            <button
              type="button"
              onClick={copyPhone}
              className="bg-transparent border border-[rgba(240,234,222,0.12)] text-muted hover:border-gold-deep hover:text-gold rounded-full text-[0.78rem] min-h-[44px] px-4.5 py-2 cursor-pointer transition-colors duration-300"
            >
              {copied ? "Copied ✓" : "Copy number"}
            </button>
          </div>

          <a
            href={`mailto:${SITE.email}`}
            onClick={() => trackEvent("email_click", { link_location: context })}
            className="inline-block mt-1.5 py-2.5 text-fg-soft underline decoration-[rgba(240,234,222,0.12)] underline-offset-[5px] hover:text-gold transition-colors"
          >
            {SITE.email}
          </a>

          <div className="grid gap-3 mt-6">
            <div className="flex gap-3.5 items-start text-[0.92rem]">
              <svg
                className="w-[17px] h-[17px] shrink-0 mt-1 text-gold-deep"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M3 12h18" />
              </svg>
              <span>
                <b className="text-fg font-semibold">Sudbury Hill</b> &middot; Piccadilly line, a
                short walk away
              </span>
            </div>
            <div className="flex gap-3.5 items-start text-[0.92rem]">
              <svg
                className="w-[17px] h-[17px] shrink-0 mt-1 text-gold-deep"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="5" y="3" width="14" height="13" rx="3" />
                <path d="M5 10h14M9 20l-2 2M15 20l2 2M9 13h.01M15 13h.01" />
              </svg>
              <span>
                <b className="text-fg font-semibold">Sudbury Hill Harrow</b> &middot; Chiltern
                Railways, a short walk away
              </span>
            </div>
            <div className="flex gap-3.5 items-start text-[0.92rem]">
              <svg
                className="w-[17px] h-[17px] shrink-0 mt-1 text-gold-deep"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>
                <b className="text-fg font-semibold">Open every day</b> &middot;{" "}
                {SITE.hoursSummary}. Walk-ins welcome.
              </span>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4.5">
          <Reveal delay={0.08} className="bez">
            <div className="core">
              <div className="relative aspect-[1400/832] w-full overflow-hidden">
                <Image
                  src="/img/v2/shopfront.webp"
                  alt="The Zaiqa-E-Mehfil shopfront on Greenford Road, Sudbury Hill, lit up in the evening"
                  fill
                  sizes="(min-width: 900px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6 grid gap-4">
                <p className="text-[0.93rem] text-muted max-w-[52ch]">
                  Look for the golden Zaiqa-E-Mehfil sign on Greenford Road.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <CtaButton
                    href={SITE.mapsUrl}
                    external
                    variant="gold"
                    trackAs="directions_click"
                    where={`${context}_card`}
                    icon={<PinIcon />}
                  >
                    Get directions
                  </CtaButton>
                  <CtaButton
                    href={`tel:${SITE.tel}`}
                    variant="line"
                    trackAs="call_click"
                    where={`${context}_card`}
                    icon={<PhoneIcon />}
                  >
                    Call us
                  </CtaButton>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14} className="bez">
            <div className="core px-6 py-5">
              <table className="w-full border-collapse text-[0.92rem]">
                <caption className="text-left text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-deep pb-2">
                  Opening hours
                </caption>
                <tbody>
                  {DAYS_ORDER.map((day) => {
                    const [open, close] = SITE.hours[day];
                    const isToday = today === day;
                    return (
                      <tr
                        key={day}
                        aria-current={isToday ? "date" : undefined}
                        className={isToday ? "text-gold font-semibold" : ""}
                      >
                        <th
                          scope="row"
                          className={`py-2 px-0.5 border-b border-[rgba(240,234,222,0.06)] text-left ${
                            isToday ? "font-semibold text-gold" : "font-normal text-fg-soft"
                          }`}
                        >
                          {day}
                          {isToday && (
                            <span className="ml-2 text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-[rgba(227,197,111,0.14)] text-gold">
                              Today
                            </span>
                          )}
                        </th>
                        <td
                          className={`py-2 px-0.5 border-b border-[rgba(240,234,222,0.06)] text-right tabular-nums ${
                            isToday ? "text-gold font-semibold" : "text-muted"
                          }`}
                        >
                          {open} &ndash; {close}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
