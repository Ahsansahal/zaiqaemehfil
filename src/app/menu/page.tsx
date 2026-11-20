import type { Metadata } from "next";
import Image from "next/image";
import { MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/menu";
import { RESTAURANT_JSON_LD, SITE } from "@/data/site";
import { MenuBrowser } from "@/components/sections/MenuBrowser";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { CalendarIcon, PhoneIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: {
    absolute: "Menu | Chapli Kebab, Kabuli Pulao, Nihari & Karahi | Zaiqa-E-Mehfil Harrow",
  },
  description:
    "Full menu with prices: chapli kebab, Kabuli pulao, nihari, paya, charsi karahi, charcoal grill platters, biryani and Indo-Chinese dishes. Halal, Sudbury Hill, Harrow.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu | Chapli Kebab, Kabuli Pulao, Nihari & Karahi | Zaiqa-E-Mehfil Harrow",
    description:
      "Full menu with prices: chapli kebab, Kabuli pulao, nihari, paya, charsi karahi, charcoal grill platters, biryani and Indo-Chinese dishes. Halal, Sudbury Hill, Harrow.",
    url: `${SITE.url}/menu`,
  },
};

export default function MenuPage() {
  const menuJsonLd = {
    ...RESTAURANT_JSON_LD,
    hasMenu: {
      "@type": "Menu",
      name: "Zaiqa-E-Mehfil menu",
      hasMenuSection: MENU_CATEGORIES.map((cat) => ({
        "@type": "MenuSection",
        name: cat.name,
        hasMenuItem: cat.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          offers: {
            "@type": "Offer",
            price: item.price.replace(/[^0-9.]/g, ""),
            priceCurrency: "GBP",
          },
          ...(item.description ? { description: item.description } : {}),
        })),
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE.url}/menu` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
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
              Menu &middot; {TOTAL_MENU_ITEMS} dishes
            </span>
            <h1 className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] mt-5 text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.96]">
              Our menu &mdash; Pakistani, Afghan &amp;{" "}
              <em className="italic font-normal text-gold">Indo-Chinese</em>
            </h1>
            <p className="mt-5 max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light">
              Chapli kebab, Kabuli pulao, nihari, paya, charsi and reshmi karahi, charcoal grill
              platters, biryani, curries, Indo-Chinese, breakfast classics, desserts and drinks. All
              halal. Prices are for dining in.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-7">
              <CtaButton
                href={`tel:${SITE.tel}`}
                variant="gold"
                trackAs="call_click"
                where="menu_hero"
                icon={<PhoneIcon />}
              >
                Call {SITE.phone}
              </CtaButton>
              <CtaButton href="/contact#book" variant="line" icon={<CalendarIcon />}>
                Book a table
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="hidden min-[1000px]:block max-w-[400px] justify-self-end w-full bez">
            <div className="core">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src="/img/card/mantoo.webp"
                  alt="Mantu, Afghan steamed dumplings with garlic yoghurt and split-pea tomato sauce"
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

      {/* Full menu on warm parchment */}
      <section
        aria-label="Full menu"
        className="paper bg-bone text-bone-soft relative pt-[clamp(2rem,4vw,3rem)] pb-[clamp(3.6rem,8vw,7rem)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gold-deep before:opacity-45 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold-deep after:opacity-45"
      >
        <MenuBrowser />
      </section>

      <CtaBand
        headingPrefix="Seen something you like?"
        headingEmphasis="Come in."
        description={`Open every day at 156 Greenford Road, Sudbury Hill — ${SITE.hoursSummary}. Walk in or call ahead.`}
      />
    </>
  );
}
