import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RESTAURANT_JSON_LD, SITE } from "@/data/site";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { ListIcon, PinIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Us | Pakistani, Afghan & Indo-Chinese Restaurant in Harrow",
  description:
    "Zaiqa-e-Mehfil means 'the taste of the gathering'. A halal Pakistani, Afghan and Indo-Chinese restaurant for families and friends on Greenford Road, Harrow.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Pakistani, Afghan & Indo-Chinese Restaurant in Harrow | Zaiqa-E-Mehfil",
    description:
      "Zaiqa-e-Mehfil means 'the taste of the gathering'. A halal Pakistani, Afghan and Indo-Chinese restaurant for families and friends on Greenford Road, Harrow.",
    url: `${SITE.url}/about`,
  },
};

const VALUES = [
  {
    title: "Halal kitchen",
    description: "Every dish on our menu is halal, from the breakfast nihari to the mixed grill.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-bone-gold fill-none stroke-current stroke-[1.35]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    title: "Charcoal grill",
    description: "Lamb chops, koubideh, tikka, wings and seekh kebabs cooked over glowing coals.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-bone-gold fill-none stroke-current stroke-[1.35]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21 21 3" />
        <circle cx="8" cy="16" r="2.4" />
        <circle cx="12" cy="12" r="2.4" />
        <circle cx="16" cy="8" r="2.4" />
      </svg>
    ),
  },
  {
    title: "Made for sharing",
    description: "Grill platters for two to six and karahi by the half or full kilo.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-bone-gold fill-none stroke-current stroke-[1.35]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
      </svg>
    ),
  },
  {
    title: "Families welcome",
    description: "A kids' menu and sharing platters sized for the whole family.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-bone-gold fill-none stroke-current stroke-[1.35]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="7" r="2.5" />
        <circle cx="16.5" cy="9" r="2" />
        <path d="M3.5 20v-3.5A4.5 4.5 0 0 1 8 12a4.5 4.5 0 0 1 4.5 4.5V20M13 20v-2.8a3.5 3.5 0 0 1 7 0V20" />
      </svg>
    ),
  },
];

const CUISINE_TRIO = [
  {
    title: "Pakistani",
    description:
      "Nihari, paya and halwa puri, charsi and reshmi karahi, handi and slow-cooked curries.",
    href: "/menu#m-nvcurry",
    cta: "See Pakistani dishes",
  },
  {
    title: "Afghan",
    description:
      "Kabuli pulao with lamb shank, mantu dumplings, banjan burani, chapli kebab and lamb koubideh.",
    href: "/menu#m-rice",
    cta: "See Afghan dishes",
  },
  {
    title: "Indo-Chinese",
    description:
      "Chicken Manchurian, black pepper chicken, sweet and sour, chilli paneer and noodles.",
    href: "/menu#m-indo",
    cta: "See Indo-Chinese dishes",
  },
];

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "About us", item: `${SITE.url}/about` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Page hero */}
      <section className="relative overflow-hidden pt-[clamp(7rem,12vw,9rem)] pb-[clamp(2.6rem,5vw,4rem)] border-b border-[rgba(240,234,222,0.06)] before:content-[''] before:absolute before:-top-[40%] before:-right-[10%] before:w-[min(640px,80vw)] before:aspect-square before:bg-[radial-gradient(circle,rgba(227,197,111,0.09)_0%,transparent_62%)] before:pointer-events-none">
        <div className="relative max-w-[1240px] mx-auto px-5 lg:px-10 min-[1000px]:grid min-[1000px]:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)] min-[1000px]:gap-16 min-[1000px]:items-center">
          <Reveal y={18}>
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
              Our story
            </span>
            <h1 className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] mt-5 text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.96]">
              The taste of a <em className="italic font-normal text-gold">diverse gathering</em>
            </h1>
            <p className="mt-5 max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light">
              We didn&rsquo;t start with a recipe. We started by listening to our community &mdash;
              and the answer to &ldquo;what does Harrow love to eat?&rdquo; was never just one
              cuisine.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-7">
              <CtaButton href="/menu" variant="gold" icon={<ListIcon />}>
                See the menu
              </CtaButton>
              <CtaButton
                href={SITE.mapsUrl}
                external
                variant="line"
                trackAs="directions_click"
                where="about_hero"
                icon={<PinIcon />}
              >
                Get directions
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden min-[1000px]:block max-w-[400px] justify-self-end w-full bez">
            <div className="core">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src="/img/v2/shopfront-sq.webp"
                  alt="The golden Zaiqa-E-Mehfil sign above the restaurant on Greenford Road"
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

      {/* Story + sticky name card */}
      <section aria-labelledby="story-h" className="py-[clamp(3.6rem,8vw,7rem)]">
        <div className="max-w-[1240px] mx-auto px-5 lg:px-10 grid gap-[clamp(2.2rem,5vw,4.5rem)] items-start min-[900px]:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="min-[900px]:sticky min-[900px]:top-[120px]">
            <div className="bez">
              <div
                className="core py-6 px-5 min-[900px]:py-8 min-[900px]:px-7 text-center grid grid-cols-[1fr_auto_1fr] min-[900px]:block items-center gap-y-2"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(227,197,111,.12), transparent 60%), #101216",
                }}
              >
                <Image
                  src="/img/v2/crest-240.webp"
                  alt=""
                  width={96}
                  height={96}
                  className="col-span-3 w-[76px] h-[76px] min-[900px]:w-24 min-[900px]:h-24 rounded-full mx-auto mb-2.5 min-[900px]:mb-6 shadow-[0_0_0_1px_rgba(227,197,111,0.35)]"
                />
                <div className="grid gap-0.5">
                  <span
                    className="text-[1.7rem] min-[900px]:text-[2.2rem] leading-[1.5] text-gold"
                    style={{ fontFamily: "var(--font-urdu)" }}
                    lang="ur"
                  >
                    ذائقہ
                  </span>
                  <b className="font-serif text-[1.6rem] min-[900px]:text-[2rem] text-fg font-semibold leading-none">
                    Zaiqa
                  </b>
                  <span className="text-[11px] tracking-[0.24em] uppercase text-muted font-semibold">
                    taste
                  </span>
                </div>

                <div className="mx-1 min-[900px]:my-4 font-serif italic text-gold-deep text-[1.1rem] min-[900px]:text-[1.3rem]">
                  &mdash; e &mdash;
                  <small className="block font-sans not-italic text-[11px] tracking-[0.24em] uppercase text-muted">
                    of a
                  </small>
                </div>

                <div className="grid gap-0.5">
                  <span
                    className="text-[1.7rem] min-[900px]:text-[2.2rem] leading-[1.5] text-gold"
                    style={{ fontFamily: "var(--font-urdu)" }}
                    lang="ur"
                  >
                    محفل
                  </span>
                  <b className="font-serif text-[1.6rem] min-[900px]:text-[2rem] text-fg font-semibold leading-none">
                    Mehfil
                  </b>
                  <span className="text-[11px] tracking-[0.24em] uppercase text-muted font-semibold">
                    gathering
                  </span>
                </div>

                <p className="col-span-3 mt-4 min-[900px]:mt-6 pt-5 border-t border-[rgba(240,234,222,0.06)] font-serif italic text-[1.25rem] min-[900px]:text-[1.45rem] text-fg">
                  &ldquo;The taste of a diverse gathering&rdquo;
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-4.5">
            <h2
              id="story-h"
              className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mb-5"
            >
              Built around <em className="italic font-normal text-gold">our community</em>
            </h2>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
              Before we opened our doors on Greenford Road, we spent time getting to know the
              neighbourhood &mdash; the families, the regulars and the friends who meet after work
              &mdash; and what they really love to eat.
            </p>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
              Harrow is one of London&rsquo;s most diverse boroughs, and the answer came back rich
              and varied. Pakistani households wanted nihari and charsi karahi made the traditional
              way. Afghan families wanted a proper Kabuli pulao and a crisp chapli kebab. And nearly
              every table wanted something Indo-Chinese, like Chicken Manchurian, to share.
            </p>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
              So we stopped asking which cuisine to cook, and brought all three together under one
              golden roof &mdash; each dish cooked the way it&rsquo;s meant to be, and served to
              share.
            </p>
            <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
              That&rsquo;s the meaning behind our name.{" "}
              <strong className="text-fg font-medium">Zaiqa</strong> is taste.{" "}
              <strong className="text-fg font-medium">Mehfil</strong> is a gathering. Zaiqa-e-Mehfil
              is the taste of a diverse gathering: a place where every family and every friend finds
              their favourite on the same table.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What to expect — paper section */}
      <section
        aria-labelledby="val-h"
        className="paper bg-bone text-bone-soft relative py-[clamp(3.6rem,8vw,7rem)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gold-deep before:opacity-45 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold-deep after:opacity-45"
      >
        <div className="max-w-[1240px] mx-auto px-5 lg:px-10">
          <Reveal className="max-w-[60ch] mb-[clamp(2.2rem,4.5vw,3.6rem)]">
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-bone-gold bg-[rgba(122,92,14,0.08)] border border-[rgba(122,92,14,0.22)] mb-5">
              What to expect
            </span>
            <h2
              id="val-h"
              className="font-serif font-semibold text-bone-ink text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none"
            >
              Good food, <em className="italic font-normal text-bone-gold">generous tables</em>
            </h2>
          </Reveal>

          <StaggerGrid className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val) => (
              <StaggerItem key={val.title}>
                <div className="bg-bone-2 border border-bone-line rounded-[1.4rem] p-6 h-full">
                  {val.icon}
                  <h3 className="mt-3.5 mb-1.5 font-serif text-[1.45rem] font-semibold text-bone-ink leading-[1.1]">
                    {val.title}
                  </h3>
                  <p className="text-[0.9rem] text-bone-muted leading-[1.55]">{val.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Three cuisines trio */}
      <section aria-labelledby="trio-h" className="py-[clamp(3.6rem,8vw,7rem)]">
        <div className="max-w-[1240px] mx-auto px-5 lg:px-10">
          <Reveal className="max-w-[60ch] mb-[clamp(2.2rem,4.5vw,3.6rem)]">
            <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)] mb-5">
              The menu
            </span>
            <h2
              id="trio-h"
              className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none"
            >
              Three cuisines, <em className="italic font-normal text-gold">one table</em>
            </h2>
          </Reveal>

          <StaggerGrid className="grid gap-4.5 min-[820px]:grid-cols-3">
            {CUISINE_TRIO.map((c) => (
              <StaggerItem key={c.title} className="bez h-full">
                <div className="core p-6 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="m-0 mb-2 font-serif text-[1.7rem] text-gold font-semibold">
                      {c.title}
                    </h3>
                    <p className="text-[0.93rem] text-fg-soft">{c.description}</p>
                  </div>
                  <p className="mt-4">
                    <Link
                      href={c.href}
                      className="inline-block py-2 text-fg-soft underline decoration-[rgba(240,234,222,0.12)] underline-offset-[5px] hover:text-gold transition-colors"
                    >
                      {c.cta} &rarr;
                    </Link>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <ReviewsSection />

      <CtaBand
        headingPrefix="Come and"
        headingEmphasis="eat with us."
        description={`${SITE.address.full}. Open every day, ${SITE.hoursSummary}.`}
      />
    </>
  );
}
