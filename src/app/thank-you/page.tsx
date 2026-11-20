import { Suspense } from "react";
import type { Metadata } from "next";
import { ThankYouHero } from "@/components/sections/ThankYouHero";
import { FindUsSection } from "@/components/sections/FindUsSection";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for your booking request. We will call you to confirm.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <Suspense fallback={<div className="pt-40 pb-20" />}>
        <ThankYouHero />
      </Suspense>
      <FindUsSection context="thanks" />
    </>
  );
}
