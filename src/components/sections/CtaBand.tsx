import { SITE } from "@/data/site";
import { Reveal } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { CalendarIcon, PhoneIcon } from "@/components/ui/Icons";

interface CtaBandProps {
  headingPrefix: string;
  headingEmphasis: string;
  description: string;
}

export function CtaBand({
  headingPrefix,
  headingEmphasis,
  description,
}: CtaBandProps) {
  return (
    <section aria-label="Book or call" className="py-[clamp(3.6rem,8vw,7rem)]">
      <div className="max-w-[96%] mx-auto px-5 lg:px-10">
        <Reveal className="bez">
          <div className="core p-[clamp(1.8rem,4vw,3rem)]">
            <div className="grid gap-6 items-center min-[900px]:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mb-3.5">
                  {headingPrefix}{" "}
                  <em className="italic font-normal text-gold">{headingEmphasis}</em>
                </h2>
                <p className="text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[64ch]">
                  {description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 min-[900px]:justify-end">
                <CtaButton
                  href={`tel:${SITE.tel}`}
                  variant="gold"
                  trackAs="call_click"
                  where="band"
                  icon={<PhoneIcon />}
                >
                  Call {SITE.phone}
                </CtaButton>
                <CtaButton href="/contact#book" variant="line" icon={<CalendarIcon />}>
                  Book a table
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
