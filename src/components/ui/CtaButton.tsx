"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Variant = "gold" | "line" | "dark";

interface BaseProps {
  variant?: Variant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  trackAs?: "call_click" | "directions_click" | "email_click";
  where?: string;
}

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variantClasses: Record<Variant, string> = {
  gold: "bg-gold text-void hover:bg-gold-hi border-transparent",
  line: "bg-transparent text-fg border-[rgba(240,234,222,0.12)] hover:border-[rgba(227,197,111,0.55)] hover:text-gold",
  dark: "bg-bone-ink text-bone hover:bg-[#2B2518] border-transparent",
};

const iconBgClasses: Record<Variant, string> = {
  gold: "bg-[rgba(10,11,13,0.12)]",
  line: "bg-[rgba(240,234,222,0.07)]",
  dark: "bg-[rgba(251,248,241,0.14)]",
};

export function CtaButton(props: LinkProps | ButtonProps) {
  const {
    variant = "gold",
    icon,
    children,
    className = "",
    trackAs,
    where,
  } = props;

  const base = `group inline-flex items-center justify-between sm:justify-start gap-3.5 rounded-full min-h-[52px] py-[0.55rem] pr-[0.55rem] pl-6 text-[0.95rem] font-semibold border cursor-pointer whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.975] disabled:opacity-60 disabled:cursor-progress w-full sm:w-auto ${variantClasses[variant]} ${className}`;

  const iconEl = icon ? (
    <span
      className={`w-[38px] h-[38px] rounded-full grid place-items-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:scale-[1.06] ${iconBgClasses[variant]}`}
    >
      {icon}
    </span>
  ) : null;

  const handleTrack = () => {
    if (trackAs) {
      trackEvent(trackAs, where ? { link_location: where } : undefined);
    }
  };

  if (props.href) {
    const isExternal =
      props.external ||
      props.href.startsWith("http") ||
      props.href.startsWith("tel:") ||
      props.href.startsWith("mailto:");

    if (isExternal) {
      const isHttp = props.href.startsWith("http");
      return (
        <a
          href={props.href}
          target={isHttp ? "_blank" : undefined}
          rel={isHttp ? "noopener noreferrer" : undefined}
          onClick={handleTrack}
          className={base}
        >
          <span>{children}</span>
          {iconEl}
        </a>
      );
    }

    return (
      <Link href={props.href} onClick={handleTrack} className={base}>
        <span>{children}</span>
        {iconEl}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={() => {
        handleTrack();
        props.onClick?.();
      }}
      className={base}
    >
      <span>{children}</span>
      {iconEl}
    </button>
  );
}
