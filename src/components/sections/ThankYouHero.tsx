"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { Reveal } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { ListIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

type TyType = "generic" | "table" | "catering";

function formatNiceDate(iso: string) {
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  } catch {
    return iso;
  }
}

export function ThankYouHero() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get("t");
  const type: TyType =
    rawType === "catering" ? "catering" : rawType === "table" ? "table" : "generic";
  const isPreview = searchParams.get("preview") === "1";

  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("zem_ty");
      if (!raw) return;
      const rec = JSON.parse(raw);
      const fresh = rec && rec.t === type && Date.now() - rec.ts < 30 * 60 * 1000;
      if (fresh) {
        window.sessionStorage.removeItem("zem_ty");
        trackEvent("thankyou_view", { form_type: type });
        const parts =
          type === "catering"
            ? [rec.e, rec.g ? `${rec.g} guests` : "", rec.d ? formatNiceDate(rec.d) : ""]
            : [rec.g ? `Table for ${rec.g}` : "", rec.d ? formatNiceDate(rec.d) : "", rec.tm || ""];
        const filtered = parts.filter(Boolean);
        if (filtered.length) setSummary(filtered.join(" · "));
      }
    } catch {
      // ignore storage errors
    }
  }, [type]);

  return (
    <section className="relative overflow-hidden pt-[clamp(7rem,12vw,9rem)] pb-[clamp(2.6rem,5vw,4rem)] border-b border-[rgba(240,234,222,0.06)] before:content-[''] before:absolute before:-top-[40%] before:-right-[10%] before:w-[min(640px,80vw)] before:aspect-square before:bg-[radial-gradient(circle,rgba(227,197,111,0.09)_0%,transparent_62%)] before:pointer-events-none">
      <div className="relative max-w-[1240px] mx-auto px-5 lg:px-10 min-[1000px]:grid min-[1000px]:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)] min-[1000px]:gap-16 min-[1000px]:items-center">
        <Reveal y={18}>
          <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
            Request received
          </span>
          <h1 className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] mt-5 text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.96]">
            Thank you &mdash;{" "}
            <em className="italic font-normal text-gold">
              {type === "table"
                ? "we’ll call to confirm"
                : type === "catering"
                ? "let’s plan your event"
                : "we’ll be in touch"}
            </em>
          </h1>

          {summary && (
            <p className="inline-block mt-5 py-2 px-4 rounded-full border border-[rgba(108,199,154,0.35)] bg-[rgba(108,199,154,0.08)] text-fg font-semibold text-[0.92rem]">
              <span className="text-green-live mr-2" aria-hidden="true">
                ✓
              </span>
              {summary}
            </p>
          )}

          <p className="mt-5 max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light">
            {type === "table" ? (
              <>
                Your table isn&rsquo;t confirmed until we call you back. If it&rsquo;s for today,
                the quickest way is to call us now on{" "}
                <a
                  href={`tel:${SITE.tel}`}
                  onClick={() => trackEvent("call_click", { link_location: "thanks_lede" })}
                  className="text-gold font-medium whitespace-nowrap"
                >
                  {SITE.phone}
                </a>
                .
              </>
            ) : type === "catering" ? (
              <>
                We&rsquo;ll call you on the number you gave to talk through the date, numbers and
                menu. Can&rsquo;t wait? Call{" "}
                <a
                  href={`tel:${SITE.tel}`}
                  onClick={() => trackEvent("call_click", { link_location: "thanks_lede" })}
                  className="text-gold font-medium whitespace-nowrap"
                >
                  {SITE.phone}
                </a>
                .
              </>
            ) : (
              <>
                We&rsquo;ve received your request and will call you on the number you gave. For a
                table today, the quickest way is to call{" "}
                <a
                  href={`tel:${SITE.tel}`}
                  onClick={() => trackEvent("call_click", { link_location: "thanks_lede" })}
                  className="text-gold font-medium whitespace-nowrap"
                >
                  {SITE.phone}
                </a>
                .
              </>
            )}
          </p>

          {isPreview && (
            <p className="mt-4 text-[0.85rem] text-muted border-l-2 border-gold-deep pl-3">
              Preview: on the live site this request would now be in the restaurant&rsquo;s inbox.
              Nothing was sent.
            </p>
          )}

          <div className="flex flex-wrap gap-2.5 mt-7">
            <CtaButton
              href={`tel:${SITE.tel}`}
              variant="gold"
              trackAs="call_click"
              where="thanks"
              icon={<PhoneIcon />}
            >
              Call {SITE.phone}
            </CtaButton>
            <CtaButton
              href={SITE.mapsUrl}
              external
              variant="line"
              trackAs="directions_click"
              where="thanks"
              icon={<PinIcon />}
            >
              Get directions
            </CtaButton>
            <CtaButton href="/menu" variant="line" icon={<ListIcon />}>
              See the menu
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="hidden min-[1000px]:block max-w-[400px] justify-self-end w-full bez">
          <div className="core">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src="/img/card/momtaz.webp"
                alt="Momtaz: chicken tikka and lamb koubideh skewers over rice"
                fill
                priority
                sizes="400px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
