"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { NAV_LINKS, SITE } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { PhoneIcon } from "@/components/ui/Icons";
import { LUX_EASE } from "@/components/motion/Primitives";

export function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isCurrent = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 pt-[calc(env(safe-area-inset-top,0px)+14px)] px-3 flex justify-center pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-between gap-5 w-full max-w-[960px] rounded-full p-[0.42rem] border border-[rgba(240,234,222,0.12)] backdrop-blur-xl backdrop-saturate-[1.3] transition-colors duration-500 ${
            solid ? "bg-[rgba(10,11,13,0.92)]" : "bg-[rgba(16,18,22,0.68)]"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 min-w-0"
          >
            <Image
              src="/img/v2/crest-96.webp"
              alt=""
              width={40}
              height={40}
              priority
              className="w-10 h-10 rounded-full shrink-0 shadow-[0_0_0_1px_rgba(227,197,111,0.35)]"
            />
            <span className="font-serif text-[1.12rem] sm:text-[1.24rem] font-bold text-gold leading-none whitespace-nowrap">
              {SITE.name}
              <span aria-hidden="true" className="block font-sans text-[9.5px] tracking-[0.28em] text-muted font-semibold mt-1">
                {SITE.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden min-[980px]:flex items-center gap-3.5 text-[0.86rem] font-medium text-fg-soft">
            {NAV_LINKS.map((item) => {
              const active = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`py-2.5 px-1.5 transition-colors duration-300 hover:text-gold ${
                    active ? "text-gold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackEvent("call_click", { link_location: "nav" })}
              aria-label={`Call ${SITE.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-gold text-void hover:bg-gold-hi rounded-full h-11 min-w-11 px-0 min-[560px]:px-4 text-[0.84rem] font-bold whitespace-nowrap transition-colors duration-300"
            >
              <PhoneIcon />
              <span className="hidden min-[560px]:inline">{SITE.phone}</span>
            </a>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-sheet"
              className="w-11 h-11 rounded-full border border-[rgba(240,234,222,0.12)] flex flex-col items-center justify-center cursor-pointer shrink-0 text-fg min-[980px]:hidden"
            >
              <span
                className={`block w-4 h-[1.4px] bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "translate-y-[5.9px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-4 h-[1.4px] bg-current mt-[4.5px] transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-4 h-[1.4px] bg-current mt-[4.5px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "-translate-y-[5.9px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: LUX_EASE }}
            className="fixed inset-0 z-[38] bg-[rgba(10,11,13,0.95)] backdrop-blur-2xl grid place-items-center"
          >
            <nav aria-label="Mobile" className="grid gap-1 text-center px-6 pt-20 pb-12">
              {NAV_LINKS.map((item, idx) => {
                const active = isCurrent(item.href);
                return (
                  <m.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: LUX_EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block font-serif text-[clamp(2rem,8vw,3rem)] leading-[1.3] transition-colors hover:text-gold ${
                        active ? "text-gold" : "text-fg"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </m.div>
                );
              })}

              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: 0.25, ease: LUX_EASE }}
              >
                <a
                  href={`tel:${SITE.tel}`}
                  onClick={() => {
                    trackEvent("call_click", { link_location: "menu_sheet" });
                    setOpen(false);
                  }}
                  className="inline-block mt-6 py-3 px-4 font-sans text-base font-semibold text-gold"
                >
                  Call {SITE.phone}
                </a>
              </m.div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
