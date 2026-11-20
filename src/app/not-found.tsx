import { SITE } from "@/data/site";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowUpRightIcon, ListIcon, PhoneIcon } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="min-h-[72vh] grid place-items-center text-center pt-32 pb-16">
      <div className="max-w-[96%] mx-auto px-5 lg:px-10">
        <p className="font-serif font-semibold text-gold leading-none text-[clamp(5rem,16vw,9rem)]">
          404
        </p>
        <h1 className="font-serif font-semibold text-fg text-balance text-[clamp(2.2rem,5vw,3.9rem)] leading-none mt-2.5 mb-4">
          This page has <em className="italic font-normal text-gold">left the table</em>
        </h1>
        <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[44ch] mx-auto mb-7">
          The page you were looking for isn&rsquo;t here. Try the menu, or call us and we&rsquo;ll
          help.
        </p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          <CtaButton href="/" variant="gold" icon={<ArrowUpRightIcon />}>
            Back to home
          </CtaButton>
          <CtaButton href="/menu" variant="line" icon={<ListIcon />}>
            See the menu
          </CtaButton>
          <CtaButton
            href={`tel:${SITE.tel}`}
            variant="line"
            trackAs="call_click"
            where="404"
            icon={<PhoneIcon />}
          >
            Call us
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
