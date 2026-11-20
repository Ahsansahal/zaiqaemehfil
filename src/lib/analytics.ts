declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, extra?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...extra });
}

export function updateConsent(choice: "granted" | "denied") {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("zem_consent", choice);
  } catch {
    // ignore storage errors
  }
  window.dataLayer = window.dataLayer || [];
  const args = [
    "consent",
    "update",
    {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
    },
  ];
  window.dataLayer.push(args as unknown as Record<string, unknown>);
  trackEvent(`consent_${choice}`);
}
