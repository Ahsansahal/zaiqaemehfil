"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { PROOF_STATS, SITE } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { AnimatedCounter, LUX_EASE } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { CalendarIcon, HalalBadge, PhoneIcon } from "@/components/ui/Icons";
import { LiveStatusBadge } from "@/components/sections/LiveStatusBadge";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <section ref={heroRef} className="relative overflow-hidden isolate bg-void">
      {/* Hero background image — pre-sized responsive WebP for instant mobile & desktop LCP + scroll parallax */}
      <div className="absolute top-0 left-0 right-0 h-[min(100vw,600px)] min-[900px]:h-auto min-[900px]:bottom-0 min-[900px]:left-auto min-[900px]:w-[min(64%,1000px)] -z-10 overflow-hidden">
        <m.div style={{ y: bgY, scale: bgScale }} className="w-full h-full will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/v2/hero-wide-1500.webp"
            srcSet="/img/v2/hero-wide-700.webp 700w, /img/v2/hero-wide-1000.webp 1000w, /img/v2/hero-wide-1500.webp 1400w"
            sizes="(min-width: 900px) 64vw, 100vw"
            alt="A table spread at Zaiqa-E-Mehfil: charsi karahi, chicken karahi, daal, Kabuli pulao, mantu, chapli kebab and chicken Manchurian"
            width={1400}
            height={1402}
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover object-center"
          />
        </m.div>

        {/* Responsive vignette overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 min-[900px]:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,11,13,.55) 0%, rgba(10,11,13,.08) 30%, rgba(10,11,13,.35) 62%, #0A0B0D 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hidden min-[900px]:block absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #0A0B0D 0%, rgba(10,11,13,.82) 16%, rgba(10,11,13,.28) 46%, rgba(10,11,13,.08) 100%), linear-gradient(0deg, #0A0B0D 0%, rgba(10,11,13,0) 24%), linear-gradient(180deg, rgba(10,11,13,.55) 0%, rgba(10,11,13,0) 16%)",
          }}
        />
      </div>

      <div className="max-w-[1240px] mx-auto px-5 lg:px-10 pt-[calc(min(100vw,600px)-64px)] pb-7 min-[900px]:min-h-[min(88svh,820px)] min-[900px]:flex min-[900px]:items-center min-[900px]:pt-[clamp(7rem,10vw,8rem)] min-[900px]:pb-8">
        <m.div style={{ y: copyY }} className="max-w-[640px] will-change-transform">
          <m.div
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, ease: LUX_EASE }}
            className="flex items-center justify-between gap-4 w-full"
          >
            <Image
              src="/img/v2/crest-240.webp"
              alt="Zaiqa-E-Mehfil Restaurant crest"
              width={112}
              height={112}
              priority
              className="w-24 h-24 min-[900px]:w-28 min-[900px]:h-28 rounded-full shadow-[0_0_0_1px_rgba(227,197,111,0.4),0_24px_70px_-12px_rgba(227,197,111,0.32)]"
            />
            <HalalBadge className="w-24 h-24 min-[900px]:w-28 min-[900px]:h-28" />
          </m.div>

          <m.h1
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: LUX_EASE }}
            className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] mt-5 min-[900px]:mt-6 text-[clamp(2.8rem,5.8vw,5.2rem)] leading-[0.98] [text-shadow:0_2px_30px_rgba(10,11,13,0.6)]"
          >
            <span className="block text-[0.62em] leading-[1.08] text-fg font-semibold">
              Pakistani &amp; Afghan restaurant in Harrow
            </span>
            <span className="block mt-[0.35em] text-gold font-medium">
              Authentic flavours.{" "}
              <em className="italic font-normal text-gold">Memorable moments.</em>
            </span>
          </m.h1>

          <m.p
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: LUX_EASE }}
            className="mt-5.5 max-w-[52ch] text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] font-light text-[#E4DCCE] [text-shadow:0_1px_16px_rgba(10,11,13,0.8)]"
          >
            Three rich cuisines under one golden roof &mdash; slow-cooked nihari and sizzling charsi
            karahi, hand-pressed chapli kebab and lamb-shank Kabuli pulao, with Indo-Chinese
            favourites for the whole table.
          </m.p>

          <m.p
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: LUX_EASE }}
            className="mt-3 text-[clamp(1.02rem,1.5vw,1.16rem)] font-bold text-fg"
          >
            On Greenford Road, by Sudbury Hill station.
          </m.p>

          <m.div
            initial={{ y: 14 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: LUX_EASE }}
            className="flex flex-wrap gap-2.5 mt-8"
          >
            <CtaButton
              href={`tel:${SITE.tel}`}
              variant="gold"
              trackAs="call_click"
              where="hero"
              icon={<PhoneIcon />}
            >
              Call {SITE.phone}
            </CtaButton>
            <CtaButton href="/contact#book" variant="line" icon={<CalendarIcon />}>
              Book a table
            </CtaButton>
          </m.div>

          <m.p
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.24, ease: LUX_EASE }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5.5 text-[0.9rem]"
          >
            <LiveStatusBadge />
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("directions_click", { link_location: "hero" })}
              className="text-gold border-b border-[rgba(227,197,111,0.4)] hover:border-gold py-0.5 transition-colors"
            >
              Get directions &rarr;
            </a>
          </m.p>
        </m.div>
      </div>

      {/* Proof stats bar */}
      <div className="max-w-[1240px] mx-auto px-5 lg:px-10 pb-[clamp(2.4rem,5vw,3.6rem)] relative">
        <m.ul
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: LUX_EASE }}
          className="list-none m-0 p-0 grid grid-cols-2 min-[900px]:grid-cols-4 border border-[rgba(227,197,111,0.22)] rounded-[1.4rem] bg-[rgba(16,18,22,0.74)] backdrop-blur-lg overflow-hidden"
        >
          {PROOF_STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`p-4.5 sm:p-5.5 min-[900px]:py-5.5 min-[900px]:px-6 ${
                i >= 2 ? "border-t border-[rgba(240,234,222,0.06)] min-[900px]:border-t-0" : ""
              } ${
                i % 2 === 1 ? "border-l border-[rgba(240,234,222,0.06)]" : ""
              } ${i > 0 ? "min-[900px]:border-l min-[900px]:border-[rgba(240,234,222,0.06)]" : ""}`}
            >
              <b className="flex items-baseline gap-0.5 font-serif text-[clamp(2rem,3.4vw,2.7rem)] text-gold font-semibold leading-none">
                <AnimatedCounter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </b>
              <span className="block mt-1.5 text-[0.8rem] leading-[1.4] text-fg-soft">
                {stat.label}
              </span>
            </li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
