"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { updateConsent } from "@/lib/analytics";
import { LUX_EASE } from "@/components/motion/Primitives";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("zem_consent");
      if (saved !== "granted" && saved !== "denied") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }

    const onOpen = () => setVisible(true);
    window.addEventListener("zem:open-consent", onOpen);
    return () => window.removeEventListener("zem:open-consent", onOpen);
  }, []);

  const choose = (choice: "granted" | "denied") => {
    updateConsent(choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="dialog"
          aria-label="Cookie choices"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: LUX_EASE }}
          className="fixed z-45 left-3 right-3 bottom-[calc(84px+env(safe-area-inset-bottom,0px))] min-[900px]:bottom-5 min-[900px]:left-5 min-[900px]:right-auto max-w-[560px] min-[900px]:max-w-[440px] mx-auto min-[900px]:mx-0 bg-[rgba(16,18,22,0.97)] border border-[rgba(240,234,222,0.12)] rounded-[20px] p-4 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.7)] grid gap-3 backdrop-blur-lg"
        >
          <p className="text-[0.84rem] leading-[1.5] text-fg-soft">
            We use cookies to see which ads bring people to the restaurant. They only switch on if
            you accept.{" "}
            <Link
              href="/privacy#cookies"
              className="text-gold border-b border-[rgba(227,197,111,0.4)] hover:border-gold"
            >
              More detail
            </Link>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 min-h-[44px] rounded-full font-bold text-[0.88rem] cursor-pointer border border-[rgba(240,234,222,0.12)] bg-transparent text-fg hover:border-gold-deep hover:text-gold transition-colors"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 min-h-[44px] rounded-full font-bold text-[0.88rem] cursor-pointer border border-gold bg-gold text-void hover:bg-gold-hi transition-colors"
            >
              Accept
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
