"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { MOST_ORDERED, REVIEWS, SITE } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { LUX_EASE, Reveal } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

export function ReviewsSection() {
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const visibleReviews = expanded ? REVIEWS : REVIEWS.slice(0, 6);

  const handleToggle = () => {
    const next = !expanded;
    setExpanded(next);
    if (!next && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      aria-labelledby="rev-h"
      className="py-[clamp(3.6rem,8vw,7rem)]"
    >
      <div className="max-w-[96%] mx-auto px-5 lg:px-10">
        <div className="grid gap-8 items-end mb-[clamp(2rem,4vw,3rem)] min-[980px]:grid-cols-2 min-[980px]:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)] mb-5">
              Google reviews
            </span>
            <h2
              id="rev-h"
              className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mb-4"
            >
              What our guests <em className="italic font-normal text-gold">keep ordering</em>
            </h2>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
              The dishes our guests come back for again and again &mdash; and what they say about us
              on Google.
            </p>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 mt-6">
              <b className="font-serif text-[3.6rem] leading-none text-gold font-semibold">
                {SITE.rating.score}
              </b>
              <span
                className="text-gold tracking-[0.12em] text-[1.15rem]"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </span>
              <span className="text-[0.88rem] text-muted w-full sm:w-auto">
                {SITE.rating.count} Google reviews
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="bez">
            <div className="core p-6">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                Our most-ordered dishes
              </p>
              <ol className="list-none m-0 p-0 grid gap-2 min-[480px]:grid-cols-2 min-[480px]:gap-x-5">
                {MOST_ORDERED.map((item) => (
                  <li
                    key={item.rank}
                    className="flex items-center gap-3 py-1.5 px-2 rounded-[14px] bg-[rgba(240,234,222,0.03)] border border-[rgba(240,234,222,0.06)] hover:border-[rgba(227,197,111,0.28)] transition-colors"
                  >
                    <span className="font-serif text-[1.15rem] text-gold font-semibold min-w-[1.7rem] tabular-nums">
                      {item.rank}
                    </span>
                    <Image
                      src={item.image}
                      alt=""
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                    <span className="text-fg text-[0.95rem] font-medium">{item.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-[1.1rem]"
        >
          <AnimatePresence initial={false}>
            {visibleReviews.map((review, idx) => (
              <m.figure
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.45,
                  delay: idx >= 6 ? Math.min((idx - 6) * 0.03, 0.35) : 0,
                  ease: LUX_EASE,
                }}
                className="bez break-inside-avoid mb-[1.1rem]"
              >
                <div className="core p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="text-gold tracking-[0.12em] text-[0.84rem]"
                      aria-label="5 out of 5 stars"
                    >
                      ★★★★★
                    </span>
                    <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)] rounded-full py-1 px-2.5">
                      {review.foodScore}
                    </span>
                  </div>
                  <blockquote className="m-0 font-serif text-[1.18rem] leading-[1.45] text-fg font-medium">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-[0.8rem] text-muted">{review.author}</figcaption>
                </div>
              </m.figure>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-5">
          <CtaButton
            type="button"
            variant="line"
            onClick={handleToggle}
            icon={<ArrowUpRightIcon />}
          >
            {expanded ? "Show fewer reviews" : `Show all ${REVIEWS.length} reviews`}
          </CtaButton>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("directions_click", { link_location: "reviews" })}
            className="text-gold border-b border-[rgba(227,197,111,0.4)] hover:border-gold py-2 text-[0.92rem] transition-colors"
          >
            Read all {SITE.rating.count} reviews on Google Maps &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
