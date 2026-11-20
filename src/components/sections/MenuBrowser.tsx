"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Search, X } from "lucide-react";
import { MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/menu";
import { trackEvent } from "@/lib/analytics";
import { LUX_EASE } from "@/components/motion/Primitives";

export function MenuBrowser() {
  const [activeId, setActiveId] = useState<string>(MENU_CATEGORIES[0].id);
  const [query, setQuery] = useState("");
  const railRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    trackEvent("menu_view");
  }, []);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MENU_CATEGORIES;
    return MENU_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          cat.name.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const matchCount = useMemo(
    () => filteredCategories.reduce((sum, c) => sum + c.items.length, 0),
    [filteredCategories]
  );

  useEffect(() => {
    if (query.trim()) return;
    if (typeof IntersectionObserver === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActiveId(id);
          const rail = railRef.current;
          const el = linkRefs.current[id];
          if (rail && el) {
            const left = el.offsetLeft - rail.clientWidth / 2 + el.clientWidth / 2;
            rail.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    const sections = document.querySelectorAll(".mcat");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [query]);

  return (
    <div className="max-w-[96%] mx-auto px-5 lg:px-10">
      {/* Sticky category rail + search */}
      <div className="sticky top-[calc(env(safe-area-inset-top,0px)+78px)] z-12 mb-9 space-y-2.5">
        <nav aria-label="Menu categories">
          <div
            ref={railRef}
            className="flex gap-1 overflow-x-auto no-scrollbar p-1.5 bg-[rgba(242,237,226,0.94)] backdrop-blur-lg border border-bone-line rounded-full shadow-[0_10px_30px_-18px_rgba(21,19,15,0.2)]"
          >
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeId === cat.id && !query.trim();
              return (
                <a
                  key={cat.id}
                  ref={(el) => {
                    linkRefs.current[cat.id] = el;
                  }}
                  href={`#${cat.id}`}
                  onClick={() => {
                    setQuery("");
                    setActiveId(cat.id);
                  }}
                  className={`relative shrink-0 py-2 px-4 rounded-full text-[0.8rem] font-semibold whitespace-nowrap transition-colors duration-300 ${
                    isActive ? "text-bone-2" : "text-bone-muted hover:text-bone-ink"
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="menu-rail-pill"
                      transition={{ duration: 0.4, ease: LUX_EASE }}
                      className="absolute inset-0 bg-bone-ink rounded-full -z-10"
                    />
                  )}
                  {cat.name}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center gap-3 max-w-md">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-bone-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search all ${TOTAL_MENU_ITEMS} dishes…`}
              aria-label="Search menu dishes"
              className="w-full bg-bone-2/95 backdrop-blur-md border border-bone-line rounded-full py-2 pl-9 pr-9 text-sm text-bone-ink placeholder:text-bone-muted focus:outline-none focus:border-bone-gold"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-bone-muted hover:text-bone-ink cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {query.trim() && (
            <span className="text-xs font-semibold text-bone-gold whitespace-nowrap">
              {matchCount} {matchCount === 1 ? "dish" : "dishes"}
            </span>
          )}
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-serif text-2xl text-bone-ink mb-2">
            No dishes found for &ldquo;{query}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-sm font-semibold text-bone-gold underline underline-offset-4 cursor-pointer"
          >
            Show all {TOTAL_MENU_ITEMS} dishes
          </button>
        </div>
      ) : (
        <div className="grid gap-y-[clamp(2.4rem,4vw,3.4rem)] gap-x-[clamp(2.4rem,5vw,4.5rem)] min-[760px]:grid-cols-2 items-start">
          {filteredCategories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              aria-labelledby={`${cat.id}-h`}
              className="mcat scroll-mt-[155px]"
            >
              <h2
                id={`${cat.id}-h`}
                className="flex items-center gap-3 m-0 mb-3.5 font-serif text-[1.85rem] font-semibold text-bone-ink leading-none after:content-[''] after:flex-1 after:h-px after:bg-bone-line"
              >
                {cat.name}
                <span className="order-3 font-sans text-[10px] font-bold tracking-[0.12em] text-bone-gold bg-[rgba(122,92,14,0.09)] rounded-full py-1 px-2.5">
                  {cat.items.length}
                </span>
              </h2>
              <ul className="list-none m-0 p-0">
                {cat.items.map((item) => (
                  <li
                    key={`${cat.id}-${item.name}`}
                    className="group flex gap-3.5 py-3 border-b border-bone-line last:border-b-0 items-start"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover shrink-0 bg-white border border-bone-line transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-3.5">
                        <h3 className="m-0 text-[0.99rem] font-semibold text-bone-ink leading-[1.32]">
                          {item.name}
                        </h3>
                        <span className="text-[0.94rem] font-bold text-bone-gold tabular-nums whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[0.82rem] leading-[1.5] text-bone-muted mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <p className="max-w-[70ch] mt-12 pt-6 border-t border-bone-line text-[0.85rem] text-bone-muted">
        Allergies or dietary needs? Please speak to a member of our team before you order &mdash;
        we&rsquo;ll talk you through the ingredients. Prices include VAT and may change; dishes are
        subject to availability.
      </p>
    </div>
  );
}
