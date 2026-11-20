"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { SITE } from "@/data/site";
import {
  fmtTime,
  getDayNameForIsoDate,
  getLondonNow,
  hoursForDay,
  toMins,
} from "@/lib/hours";
import { trackEvent } from "@/lib/analytics";
import { LUX_EASE } from "@/components/motion/Primitives";
import { CtaButton } from "@/components/ui/CtaButton";
import { ArrowUpRightIcon, CalendarIcon, ListIcon, PhoneIcon } from "@/components/ui/Icons";

type Mode = "table" | "catering";

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function getTodayIso() {
  const t = new Date();
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
}

export function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("table");
  const [today, setToday] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "ok" | "bad"; title: string; message: string } | null>(
    null
  );

  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [notes, setNotes] = useState("");
  const [honey, setHoney] = useState("");

  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToday(getTodayIso());
    const wantCatering =
      searchParams.get("type") === "catering" || window.location.hash === "#catering";
    if (wantCatering) setMode("catering");
  }, [searchParams]);

  const clearErr = (key: string) => {
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    const tToday = today || getTodayIso();

    if (!name.trim()) next.name = "Please fill this in.";
    if (!phone.trim()) next.phone = "Please fill this in.";
    else if (phone.replace(/[^\d]/g, "").length < 10)
      next.phone = "Please enter a full phone number.";

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please check the email address.";
    }

    if (mode === "table") {
      if (!date) next.date = "Please fill this in.";
      else if (date < tToday) next.date = "Please choose today or a later date.";

      if (!time) next.time = "Please fill this in.";
      else {
        const dayName = getDayNameForIsoDate(date) || getLondonNow().day;
        const hh = hoursForDay(dayName);
        const bo = toMins(hh[0]);
        const bc = toMins(hh[1]) - 30;
        const val = toMins(time);
        if (val < bo || val > bc) {
          next.time = `On ${dayName} we take bookings from ${fmtTime(hh[0])} to ${pad(
            Math.floor(bc / 60)
          )}:${pad(bc % 60)}.`;
        }
      }

      if (!guests.trim()) next.guests = "Please fill this in.";
      else if (Number(guests) < 1) next.guests = "Please enter a number of guests.";
    } else {
      if (!eventType) next.event_type = "Please fill this in.";
      if (!eventDate) next.event_date = "Please fill this in.";
      if (!guestCount.trim()) next.guest_count = "Please fill this in.";
      else if (Number(guestCount) < 10) next.guest_count = "Please enter at least 10 guests.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return; // bot honeypot
    if (!validate()) return;

    const who = name.trim() || "Guest";
    const payload: Record<string, string> = {
      name: who,
      phone: phone.trim(),
      ...(email.trim() ? { email: email.trim() } : {}),
      ...(mode === "table"
        ? { date, time, guests: guests.trim() }
        : { event_type: eventType, event_date: eventDate, guest_count: guestCount.trim() }),
      ...(notes.trim() ? { notes: notes.trim() } : {}),
      _subject:
        mode === "catering"
          ? `Catering enquiry: ${who}${eventDate ? ` — ${eventDate}` : ""}`
          : `Table request: ${who} — ${guests || "?"} guests, ${date} ${time}`,
      enquiry_type: mode === "catering" ? "Catering / event" : "Table booking",
      _template: "table",
      _captcha: "false",
    };

    if (email.trim()) {
      payload._replyto = email.trim();
      payload._autoresponse = `Thank you for contacting ${SITE.name}. We have received your ${
        mode === "catering" ? "catering enquiry" : "table request"
      } and will call you to confirm. For anything urgent please call ${SITE.phone}.`;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && (json.success === true || json.success === "true")) {
        setStatus({
          kind: "ok",
          title: mode === "catering" ? "Enquiry sent — thank you." : "Request sent — thank you.",
          message:
            mode === "catering"
              ? `We'll call you on the number you gave to talk through dates, numbers and the menu. Need us sooner? Call ${SITE.phone}.`
              : `Your table is not confirmed until we call you back. If it's for today, the quickest way is to call ${SITE.phone}.`,
        });

        try {
          window.sessionStorage.setItem(
            "zem_ty",
            JSON.stringify({
              t: mode,
              ts: Date.now(),
              g: mode === "catering" ? guestCount.trim() : guests.trim(),
              d: mode === "catering" ? eventDate : date,
              tm: mode === "catering" ? "" : time,
              e: mode === "catering" ? eventType : "",
            })
          );
        } catch {
          // ignore storage errors
        }

        let navigated = false;
        const go = () => {
          if (navigated) return;
          navigated = true;
          router.push(`/thank-you?t=${mode}`);
        };

        trackEvent(mode === "catering" ? "catering_submit" : "booking_submit", {
          form_type: mode,
          party_size: mode === "catering" ? guestCount.trim() : guests.trim(),
          eventCallback: go,
          eventTimeout: 1200,
        });
        setTimeout(go, 1500);
      } else {
        setSubmitting(false);
        setStatus({
          kind: "bad",
          title: "That didn't go through.",
          message: `Sorry — please call us on ${SITE.phone} and we'll sort it straight away.`,
        });
        statusRef.current?.focus();
      }
    } catch {
      setSubmitting(false);
      setStatus({
        kind: "bad",
        title: "That didn't go through.",
        message: `It looks like a connection problem. Please call ${SITE.phone} or try again in a moment.`,
      });
      statusRef.current?.focus();
    }
  };

  const inputBase =
    "font-sans text-base text-fg bg-raise border border-[rgba(240,234,222,0.12)] rounded-[14px] px-4 py-3 min-h-[52px] w-full min-w-0 transition-all duration-300 focus:outline-none focus:border-[rgba(227,197,111,0.6)] focus:shadow-[0_0_0_4px_rgba(227,197,111,0.1)]";

  return (
    <section
      id="book"
      aria-labelledby="book-h"
      className="py-[clamp(3.6rem,8vw,7rem)] bg-ink border-y border-[rgba(240,234,222,0.06)]"
    >
      <div className="max-w-[96%] mx-auto px-5 lg:px-10 grid gap-[clamp(2rem,4vw,3rem)] items-start min-[980px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[980px]:gap-16">
        <div className="min-[980px]:sticky min-[980px]:top-[120px]">
          <span className="inline-flex items-center gap-2 rounded-full py-[0.38rem] px-[0.9rem] text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-gold bg-[rgba(227,197,111,0.14)] border border-[rgba(227,197,111,0.22)]">
            Book a table
          </span>
          <h2
            id="book-h"
            className="font-serif font-semibold text-fg text-balance tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.9rem)] leading-none mt-5"
          >
            Request{" "}
            <em className="italic font-normal text-gold">
              {mode === "catering" ? "catering & events" : "a table"}
            </em>
          </h2>
          <p className="mt-4 text-[clamp(1.02rem,1.5vw,1.16rem)] leading-[1.65] text-fg-soft font-light max-w-[54ch]">
            Send us your details and we&rsquo;ll call you to confirm. For a table today, calling{" "}
            <a
              href={`tel:${SITE.tel}`}
              onClick={() => trackEvent("call_click", { link_location: "book_intro" })}
              className="text-gold font-medium whitespace-nowrap"
            >
              {SITE.phone}
            </a>{" "}
            is quickest.
          </p>

          <ul className="list-none mt-7 p-0 grid gap-4.5">
            <li className="flex gap-3.5 items-start">
              <PhoneIcon className="w-5 h-5 shrink-0 text-gold mt-0.5" />
              <span>
                <b className="block text-fg font-semibold text-[0.98rem]">We call to confirm</b>
                <span className="text-[0.9rem] text-fg-soft leading-[1.5]">
                  On the number you give us. Your table is held once we speak.
                </span>
              </span>
            </li>
            <li className="flex gap-3.5 items-start">
              <CalendarIcon className="w-5 h-5 shrink-0 text-gold mt-0.5" />
              <span>
                <b className="block text-fg font-semibold text-[0.98rem]">
                  Groups and families welcome
                </b>
                <span className="text-[0.9rem] text-fg-soft leading-[1.5]">
                  Tell us your numbers and we&rsquo;ll set the table.
                </span>
              </span>
            </li>
            <li className="flex gap-3.5 items-start">
              <ListIcon className="w-5 h-5 shrink-0 text-gold mt-0.5" />
              <span>
                <b className="block text-fg font-semibold text-[0.98rem]">
                  Catering up to 500 guests
                </b>
                <span className="text-[0.9rem] text-fg-soft leading-[1.5]">
                  Switch to &ldquo;Catering &amp; events&rdquo; and tell us your plans.
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div className="bez">
          <div className="core p-5 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              {/* Animated mode toggle */}
              <fieldset className="border-0 p-0 m-0">
                <legend className="sr-only">What is this for?</legend>
                <div className="inline-flex w-full sm:w-fit gap-1 p-1 border border-[rgba(240,234,222,0.12)] rounded-full bg-void">
                  {(
                    [
                      { value: "table", label: "Table booking" },
                      { value: "catering", label: "Catering & events" },
                    ] as const
                  ).map((opt) => {
                    const active = mode === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          setMode(opt.value);
                          setErrors({});
                        }}
                        className={`relative flex-1 sm:flex-none py-3 px-5 rounded-full text-[0.86rem] font-semibold cursor-pointer whitespace-nowrap transition-colors duration-300 z-10 ${
                          active ? "text-void" : "text-fg-soft hover:text-fg"
                        }`}
                      >
                        {active && (
                          <m.span
                            layoutId="booking-mode-pill"
                            transition={{ duration: 0.38, ease: LUX_EASE }}
                            className="absolute inset-0 bg-gold rounded-full -z-10"
                          />
                        )}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <AnimatePresence initial={false}>
                {mode === "catering" && (
                  <m.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: LUX_EASE }}
                    className="m-0 py-3.5 px-4 rounded-[14px] border border-[rgba(227,197,111,0.25)] bg-[rgba(227,197,111,0.14)] text-fg text-[0.92rem] overflow-hidden"
                  >
                    We cater for gatherings of up to 500 guests and build the menu around your
                    choice &mdash; tell us the dishes you have in mind in the notes below.
                  </m.p>
                )}
              </AnimatePresence>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 min-w-0">
                  <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                    Your name <i className="not-italic text-gold-deep">*</i>
                  </span>
                  <input
                    id="f-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearErr("name");
                    }}
                    aria-invalid={errors.name ? "true" : undefined}
                    className={`${inputBase} ${errors.name ? "border-red-closed" : ""}`}
                  />
                  {errors.name && (
                    <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                      {errors.name}
                    </em>
                  )}
                </label>

                <label className="grid gap-1.5 min-w-0">
                  <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                    Phone <i className="not-italic text-gold-deep">*</i>
                  </span>
                  <input
                    id="f-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearErr("phone");
                    }}
                    aria-invalid={errors.phone ? "true" : undefined}
                    className={`${inputBase} ${errors.phone ? "border-red-closed" : ""}`}
                  />
                  {errors.phone && (
                    <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                      {errors.phone}
                    </em>
                  )}
                </label>
              </div>

              <label className="grid gap-1.5 min-w-0">
                <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                  Email <i className="not-italic text-gold-deep tracking-normal">(optional)</i>
                </span>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearErr("email");
                  }}
                  aria-invalid={errors.email ? "true" : undefined}
                  className={`${inputBase} ${errors.email ? "border-red-closed" : ""}`}
                />
                {errors.email && (
                  <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                    {errors.email}
                  </em>
                )}
              </label>

              {mode === "table" ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                  <label className="grid gap-1.5 min-w-0 col-span-2 sm:col-span-1">
                    <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                      Date <i className="not-italic text-gold-deep">*</i>
                    </span>
                    <input
                      id="f-date"
                      name="date"
                      type="date"
                      min={today}
                      required
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        clearErr("date");
                      }}
                      aria-invalid={errors.date ? "true" : undefined}
                      className={`${inputBase} ${errors.date ? "border-red-closed" : ""}`}
                    />
                    {errors.date && (
                      <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                        {errors.date}
                      </em>
                    )}
                  </label>

                  <label className="grid gap-1.5 min-w-0">
                    <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                      Time <i className="not-italic text-gold-deep">*</i>
                    </span>
                    <input
                      id="f-time"
                      name="time"
                      type="time"
                      min="08:00"
                      max="23:00"
                      step={900}
                      required
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        clearErr("time");
                      }}
                      aria-invalid={errors.time ? "true" : undefined}
                      className={`${inputBase} ${errors.time ? "border-red-closed" : ""}`}
                    />
                    {errors.time && (
                      <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                        {errors.time}
                      </em>
                    )}
                  </label>

                  <label className="grid gap-1.5 min-w-0">
                    <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                      Guests <i className="not-italic text-gold-deep">*</i>
                    </span>
                    <input
                      id="f-guests"
                      name="guests"
                      type="number"
                      min={1}
                      max={60}
                      inputMode="numeric"
                      required
                      value={guests}
                      onChange={(e) => {
                        setGuests(e.target.value);
                        clearErr("guests");
                      }}
                      aria-invalid={errors.guests ? "true" : undefined}
                      className={`${inputBase} ${errors.guests ? "border-red-closed" : ""}`}
                    />
                    {errors.guests && (
                      <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                        {errors.guests}
                      </em>
                    )}
                  </label>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="grid gap-1.5 min-w-0">
                    <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                      Type of event <i className="not-italic text-gold-deep">*</i>
                    </span>
                    <select
                      id="f-event"
                      name="event_type"
                      required
                      value={eventType}
                      onChange={(e) => {
                        setEventType(e.target.value);
                        clearErr("event_type");
                      }}
                      aria-invalid={errors.event_type ? "true" : undefined}
                      className={`${inputBase} appearance-none select-chevron pr-10 ${
                        errors.event_type ? "border-red-closed" : ""
                      }`}
                    >
                      <option value="">Choose&hellip;</option>
                      <option>Birthday</option>
                      <option>Wedding or engagement</option>
                      <option>Family gathering</option>
                      <option>Office or corporate</option>
                      <option>Community or religious event</option>
                      <option>Other</option>
                    </select>
                    {errors.event_type && (
                      <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                        {errors.event_type}
                      </em>
                    )}
                  </label>

                  <label className="grid gap-1.5 min-w-0">
                    <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                      Event date <i className="not-italic text-gold-deep">*</i>
                    </span>
                    <input
                      id="f-edate"
                      name="event_date"
                      type="date"
                      min={today}
                      required
                      value={eventDate}
                      onChange={(e) => {
                        setEventDate(e.target.value);
                        clearErr("event_date");
                      }}
                      aria-invalid={errors.event_date ? "true" : undefined}
                      className={`${inputBase} ${errors.event_date ? "border-red-closed" : ""}`}
                    />
                    {errors.event_date && (
                      <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                        {errors.event_date}
                      </em>
                    )}
                  </label>

                  <label className="grid gap-1.5 min-w-0">
                    <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                      Number of guests <i className="not-italic text-gold-deep">*</i>
                    </span>
                    <input
                      id="f-eguests"
                      name="guest_count"
                      type="number"
                      min={10}
                      inputMode="numeric"
                      required
                      value={guestCount}
                      onChange={(e) => {
                        setGuestCount(e.target.value);
                        clearErr("guest_count");
                      }}
                      aria-invalid={errors.guest_count ? "true" : undefined}
                      className={`${inputBase} ${errors.guest_count ? "border-red-closed" : ""}`}
                    />
                    {errors.guest_count && (
                      <em className="not-italic text-[0.78rem] text-red-closed" aria-live="polite">
                        {errors.guest_count}
                      </em>
                    )}
                  </label>
                </div>
              )}

              <label className="grid gap-1.5 min-w-0">
                <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-muted">
                  Anything we should know
                </span>
                <textarea
                  id="f-notes"
                  name="notes"
                  placeholder="High chair, birthday, dishes you'd like for your event…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${inputBase} min-h-[104px] resize-y`}
                />
              </label>

              {/* Honeypot */}
              <div className="absolute -left-[9999px] w-px h-px opacity-0" aria-hidden="true">
                <label>
                  Leave this empty
                  <input
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honey}
                    onChange={(e) => setHoney(e.target.value)}
                  />
                </label>
              </div>

              <p className="text-[0.8rem] text-muted">
                We only use these details to reply to your request. See our{" "}
                <Link
                  href="/privacy"
                  className="text-fg-soft border-b border-[rgba(240,234,222,0.12)] hover:text-gold"
                >
                  privacy notice
                </Link>
                .
              </p>

              <div className="flex flex-wrap gap-3 items-center mt-1">
                <CtaButton
                  type="submit"
                  variant="gold"
                  disabled={submitting}
                  icon={<ArrowUpRightIcon />}
                >
                  {submitting
                    ? "Sending…"
                    : mode === "catering"
                    ? "Send catering enquiry"
                    : "Request this table"}
                </CtaButton>
                <CtaButton
                  href={`tel:${SITE.tel}`}
                  variant="line"
                  trackAs="call_click"
                  where="book_actions"
                  icon={<PhoneIcon />}
                >
                  Or call {SITE.phone}
                </CtaButton>
              </div>
            </form>

            {status && (
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className={`mt-6 rounded-[18px] p-5 border ${
                  status.kind === "ok"
                    ? "border-[rgba(108,199,154,0.35)] bg-[rgba(108,199,154,0.07)]"
                    : "border-[rgba(224,134,108,0.4)] bg-[rgba(224,134,108,0.07)]"
                }`}
              >
                <b
                  className={`block text-[1.05rem] mb-1 ${
                    status.kind === "ok" ? "text-green-live" : "text-red-closed"
                  }`}
                >
                  {status.title}
                </b>
                <p className="text-[0.94rem] text-fg-soft">{status.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
