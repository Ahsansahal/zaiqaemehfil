import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CATERING_FEATURES,
  GRILL_HIGHLIGHTS,
  MARQUEE_DISHES,
  MOJITOS,
  RESTAURANT_JSON_LD,
  SIGNATURE_CUISINES,
  SITE,
} from "@/data/site";
import { HomeHero } from "@/components/sections/HomeHero";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FindUsSection } from "@/components/sections/FindUsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  MotionCard,
  ParallaxWrap,
  Reveal,
  ScrollLine,
  ScrollVelocityMarquee,
  StaggerGrid,
  StaggerItem,
} from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  ListIcon,
  PhoneIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zaiqa-E-Mehfil | Pakistani & Afghan Restaurant in Harrow, Sudbury Hill",
    description:
      "Halal Pakistani, Afghan and Indo-Chinese restaurant on Greenford Road, Sudbury Hill, Harrow. Chapli kebab, Kabuli pulao, nihari, karahi and grill platters. Open daily from 11:30, weekends from 8:00.",
    url: `${SITE.url}/`,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_JSON_LD) }}
      />

      <HomeHero />

      {/* Scroll-velocity reactive dish marquee */}
      <ScrollVelocityMarquee items={MARQUEE_DISHES} />

      {/* Signature dishes — warm parchment ("paper") section */}
      <section
        aria-labelledby="feat-h"
        className="paper below-fold bg-bone text-bone-soft relative py-[clamp(3.6rem,8vw,7rem)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gold-deep before:opacity-45 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold-deep after:opacity-45"
      >
        <div className="max-w-[1240px] mx-auto px-5 lg:px-10">
          <Reveal className="max-w-[60ch] mb-[clamp(2.2rem,4.5vw,3.6rem)]">
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-bone-gold bg-[rgba(122,92,14,0.08)] border border-[rgba(122,92,14,0.22)] mb-5">
              Signature dishes
            </span>
            <h2
              id="feat-h"
              className="font-serif font-semibold text-bone-ink text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mb-4"
            >
              One kitchen, <em className="italic font-normal text-bone-gold">three cuisines</em>
            </h2>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-bone-muted font-light max-w-[64ch]">
              Pakistani, Afghan and Indo-Chinese cooking side by side &mdash; a few of the dishes to
              start with.
            </p>
          </Reveal>

          <div className="grid gap-[clamp(2.4rem,4vw,3.4rem)]">
            {SIGNATURE_CUISINES.map((cuisine) => (
              <div key={cuisine.title} className="grid gap-4.5">
                <Reveal className="flex items-baseline gap-4 mb-0.5">
                  <h3 className="m-0 font-serif text-[clamp(1.6rem,2.6vw,2rem)] font-semibold text-bone-ink leading-none">
                    {cuisine.title}
                  </h3>
                  <p className="text-[0.86rem] text-bone-muted">{cuisine.subtitle}</p>
                  <ScrollLine />
                </Reveal>

                <StaggerGrid className="grid gap-4.5 grid-cols-1 min-[600px]:grid-cols-2 min-[760px]:grid-cols-3">
                  {cuisine.dishes.map((dish) => (
                    <StaggerItem key={dish.name} className="h-full">
                      <MotionCard className="h-full">
                        <article className="group bg-bone-2 border border-bone-line rounded-[1.4rem] overflow-hidden flex flex-col h-full transition-shadow duration-500 hover:shadow-[0_22px_45px_-22px_rgba(21,19,15,0.32)]">
                          <figure className="m-0 relative overflow-hidden aspect-[5/4] bg-white">
                            {dish.badge && (
                              <span className="absolute top-3.5 left-3.5 z-10 bg-bone-ink text-bone rounded-full py-1 px-3 text-[10.5px] tracking-[0.14em] uppercase font-semibold">
                                {dish.badge}
                              </span>
                            )}
                            <Image
                              src={dish.image}
                              alt={dish.alt}
                              fill
                              sizes="(min-width: 760px) 33vw, (min-width: 600px) 50vw, 100vw"
                              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.055]"
                            />
                          </figure>
                          <div className="p-5 flex flex-col gap-1.5 flex-1">
                            <div className="flex justify-between items-baseline gap-3">
                              <h4 className="m-0 font-serif text-[1.45rem] font-semibold text-bone-ink leading-[1.1]">
                                {dish.name}
                              </h4>
                              <span className="text-[0.95rem] font-bold text-bone-gold tabular-nums whitespace-nowrap">
                                {dish.price}
                              </span>
                            </div>
                            <p className="text-[0.88rem] leading-[1.55] text-bone-muted">
                              {dish.description}
                            </p>
                          </div>
                        </article>
                      </MotionCard>
                    </StaggerItem>
                  ))}

                  {cuisine.showMenuCard && (
                    <StaggerItem className="h-full min-[600px]:col-span-2 min-[760px]:col-span-1">
                      <MotionCard className="h-full">
                        <Link
                          href="/menu"
                          className="group bg-bone-ink hover:bg-[#221d14] text-bone rounded-[1.4rem] p-6 flex flex-col justify-between gap-6 min-h-[260px] h-full transition-colors duration-500"
                        >
                          <span className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold">
                            The full menu
                          </span>
                          <span className="font-serif text-[clamp(2rem,3.4vw,2.7rem)] leading-[1.02] text-bone">
                            All <em className="italic text-gold font-normal">119 dishes</em>, with
                            photos and prices
                          </span>
                          <span className="inline-flex items-center gap-3 font-semibold text-[0.92rem] text-gold">
                            See the menu
                            <span className="w-[38px] h-[38px] rounded-full grid place-items-center bg-[rgba(227,197,111,0.14)] transition-transform duration-500 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]">
                              <ArrowUpRightIcon />
                            </span>
                          </span>
                        </Link>
                      </MotionCard>
                    </StaggerItem>
                  )}
                </StaggerGrid>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charcoal grill split section with scroll-linked image depth */}
      <section aria-labelledby="grill-h" className="below-fold py-[clamp(3.6rem,8vw,7rem)]">
        <div className="max-w-[1240px] mx-auto px-5 lg:px-10 grid gap-[clamp(2.2rem,5vw,4rem)] items-center min-[900px]:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="bez max-w-[620px] min-[900px]:max-w-none w-full">
            <div className="core">
              <ParallaxWrap
                offset={26}
                scaleRange={[1.09, 1.0]}
                className="relative aspect-[4/3] min-[900px]:aspect-[4/5] w-full"
              >
                <Image
                  src="/img/r2/grill-portrait.webp"
                  alt="Zaiqa-E-Mehfil mixed grill platter: seekh kebabs, lamb chops, ribs, chicken tikka and wings over Kabuli rice"
                  fill
                  sizes="(min-width: 900px) 42vw, 100vw"
                  className="object-cover"
                />
              </ParallaxWrap>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
              Charcoal grill
            </span>
            <h2
              id="grill-h"
              className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mt-5 mb-4"
            >
              Built for <em className="italic font-normal text-gold">sharing</em>
            </h2>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
              Bring the family. Platters for two to six, chapli kebabs by the trio and karahi by the
              half or full kilo.
            </p>

            <div className="grid mt-6 border-t border-[rgba(240,234,222,0.06)]">
              {GRILL_HIGHLIGHTS.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between gap-4 py-2.5 border-b border-[rgba(240,234,222,0.06)] text-[0.95rem]"
                >
                  <b className="text-fg font-medium">{item.name}</b>
                  <span className="text-gold font-bold tabular-nums">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5 mt-7">
              <CtaButton href="/menu#m-grill" variant="gold" icon={<ListIcon />}>
                See the grill menu
              </CtaButton>
              <CtaButton href="/contact#book" variant="line" icon={<CalendarIcon />}>
                Book for a group
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mojitos & cold drinks */}
      <section
        aria-labelledby="drinks-h"
        className="py-[clamp(3.6rem,8vw,7rem)] border-t border-[rgba(240,234,222,0.06)]"
      >
        <div className="max-w-[1240px] mx-auto px-5 lg:px-10">
          <Reveal className="max-w-[60ch] mb-[clamp(2.2rem,4.5vw,3.6rem)]">
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)] mb-5">
              Mojitos &amp; cold drinks
            </span>
            <h2
              id="drinks-h"
              className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mb-4"
            >
              Something cool <em className="italic font-normal text-gold">for the table</em>
            </h2>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
              Classic, passion fruit, strawberry and coke mojitos at £4.45 each &mdash; or a jug of
              mango lassi to share.
            </p>
          </Reveal>

          <StaggerGrid className="grid gap-4 grid-cols-2 min-[900px]:grid-cols-4 min-[900px]:gap-4.5">
            {MOJITOS.map((drink) => (
              <StaggerItem key={drink.name}>
                <MotionCard>
                  <figure className="group m-0 rounded-[1.4rem] overflow-hidden relative bg-ink border border-[rgba(240,234,222,0.06)] hover:border-[rgba(227,197,111,0.32)] transition-colors duration-500">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={drink.image}
                        alt={`${drink.name} at Zaiqa-E-Mehfil`}
                        fill
                        sizes="(min-width: 900px) 25vw, 50vw"
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                      />
                    </div>
                    <figcaption className="absolute left-0 right-0 bottom-0 flex justify-between items-baseline gap-2 pt-9 pb-3.5 px-3.5 bg-gradient-to-t from-[rgba(10,11,13,0.92)] to-transparent">
                      <b className="text-fg font-serif text-[1rem] sm:text-[1.15rem] font-semibold leading-[1.1]">
                        {drink.name}
                      </b>
                      <span className="text-gold font-bold text-[0.9rem] whitespace-nowrap">
                        {drink.price}
                      </span>
                    </figcaption>
                  </figure>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <div className="mt-7">
            <CtaButton href="/menu#m-cold" variant="line" icon={<ListIcon />}>
              See all drinks
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Google Reviews wall */}
      <ReviewsSection />

      {/* Catering & Events with subtle parallax backdrop */}
      <section
        id="catering"
        aria-labelledby="cater-h"
        className="relative overflow-hidden border-y border-[rgba(240,234,222,0.06)] bg-void"
      >
        <div className="absolute top-0 left-0 right-0 h-[min(70vw,520px)] min-[1180px]:h-full min-[1180px]:inset-0 overflow-hidden">
          <ParallaxWrap offset={28} className="w-full h-[115%] -mt-[5%]">
            <Image
              src="/img/v2/cater-wide.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </ParallaxWrap>
          <div
            aria-hidden="true"
            className="absolute inset-0 min-[1180px]:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,11,13,.5) 0%, rgba(10,11,13,.82) 45%, #0A0B0D 92%)",
            }}
          />
          <div
            aria-hidden="true"
            className="hidden min-[1180px]:block absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, #0A0B0D 8%, rgba(10,11,13,.92) 48%, rgba(10,11,13,.55) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1240px] mx-auto px-5 lg:px-10 py-[clamp(3.6rem,8vw,7rem)] grid gap-10 items-center min-[1180px]:grid-cols-[1.05fr_0.95fr] min-[1180px]:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
              Catering &amp; events
            </span>
            <h2
              id="cater-h"
              className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mt-5 mb-4"
            >
              Catering in Harrow for up to{" "}
              <em className="italic font-normal text-gold">500 guests</em>
            </h2>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[54ch]">
              From an intimate family function to a celebration for 500, we bring the same rich
              Pakistani, Afghan and Indo-Chinese cooking to your event. Pick from our menu or let us
              build a menu around your guests and your occasion.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-7">
              <CtaButton
                href="/contact?type=catering#book"
                variant="gold"
                icon={<ArrowUpRightIcon />}
              >
                Get a catering quote
              </CtaButton>
              <CtaButton
                href={`tel:${SITE.tel}`}
                variant="line"
                trackAs="call_click"
                where="catering"
                icon={<PhoneIcon />}
              >
                Call to discuss
              </CtaButton>
            </div>
          </Reveal>

          <StaggerGrid className="list-none m-0 p-0 grid gap-3 min-[560px]:grid-cols-2">
            {CATERING_FEATURES.map((feat) => (
              <StaggerItem key={feat.title}>
                <div className="bg-[rgba(16,18,22,0.78)] backdrop-blur-md border border-[rgba(227,197,111,0.2)] rounded-[1.2rem] p-5 h-full hover:border-[rgba(227,197,111,0.45)] transition-colors">
                  <b className="block font-serif text-[1.4rem] text-gold font-semibold leading-[1.15] mb-1.5">
                    {feat.title}
                  </b>
                  <span className="text-[0.88rem] leading-[1.5] text-fg-soft">
                    {feat.description}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <FindUsSection context="home" />

      <CtaBand
        headingPrefix="Hungry?"
        headingEmphasis="We’re open today."
        description={`Walk in, or call ${SITE.phone} to reserve a table. Open every day, ${SITE.hoursSummary}.`}
      />
    </>
  );
}
