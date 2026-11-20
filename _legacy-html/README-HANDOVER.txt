ZAIQA-E-MEHFIL WEBSITE - HANDOVER NOTES (2 October 2026)
==========================================================

WHAT'S IN THIS FOLDER
  index.html, menu.html, about.html, contact.html, privacy.html, thank-you.html, 404.html
  assets/   stylesheet, script, self-hosted fonts (no Google Fonts calls)
  img/      all photos (WebP)
  favicon.ico / favicon.svg / apple-touch-icon.png / icon-*.png / site.webmanifest
  robots.txt, sitemap.xml, .htaccess (404 page + browser caching on Apache hosts)

1. UPLOAD
  Upload everything inside this folder to the web root of zaiqaemehfil.com (keep the folder structure).
  Make sure https://zaiqaemehfil.com (non-www) is the main address and www redirects to it.
  On a non-Apache host, set 404.html as the custom error page.

2. BOOKING FORM - ONE-TIME ACTIVATION (FormSubmit, free)
  The form posts to https://formsubmit.co/ajax/zaiqaemehfiluk@gmail.com
  a) After the site is live, submit one test booking from the Contact page.
  b) FormSubmit emails zaiqaemehfiluk@gmail.com an activation link - click "Activate Form".
  c) Submit a second test booking: it should arrive in the inbox as a table, and the browser
     should land on thank-you.html showing the booking summary.
  d) Optional (hides the address from the page source): the activation email gives a random
     alias like https://formsubmit.co/ajax/abc123... - paste it into  data-endpoint="..."
     in contact.html (the only page with the form).
  After a successful send the visitor is redirected to thank-you.html?t=table or ?t=catering.
  If a request fails, they stay on the form and are shown the phone number to call instead.

3. GOOGLE TAG MANAGER  (GTM-MB2NNHL2)
  Installed on every page: head snippet as high as possible (after Consent Mode defaults) and the
  noscript iframe immediately after <body>.
  Consent Mode v2: everything is "denied" until the visitor clicks Accept on the cookie bar.
  dataLayer events to use as GTM triggers / Google Ads conversions:
    call_click        - any phone link (link_location says where: hero, nav, dock, footer...)
    directions_click  - any Google Maps link
    booking_submit    - table request sent successfully (pushed just before the redirect;
                        the redirect waits for GTM to finish, max 1.2 s)
    catering_submit   - catering enquiry sent successfully (same as above)
    thankyou_view     - thank-you page shown after a REAL submission (form_type = table|catering).
                        Does not fire on a refresh or a direct visit to the page.
    email_click, menu_view, consent_granted, consent_denied

  Booking conversion - use ONE of these, not both (or bookings are counted twice):
    Recommended: Custom Event trigger  booking_submit  (and a second one for catering_submit)
    Or:          Custom Event trigger  thankyou_view   (filter form_type if you want them separate)
  Avoid a plain "Page View - Page Path equals /thank-you.html" trigger: it also counts refreshes
  and direct visits. thank-you.html is set to noindex and is not in the sitemap.
  No personal data is pushed to the dataLayer.

4. STILL TO CONFIRM WITH THE RESTAURANT
  - "Every dish is halal" wording on About page.
  - Breakfast items are listed; breakfast serving times are not stated anywhere - confirm.
  - Privacy notice (privacy.html) is a sensible template - client should review it.
  - Rating/review count (4.5 from 619) and the 'most mentioned dishes' counts are hard-coded from
    Google Maps (6 Oct 2026) - update occasionally.
  - Reviews on the site are 20 REAL Google reviews (Google Maps "Most relevant", read 6 Oct 2026),
    quoted word for word with reviewer names removed; "..." marks a trimmed passage (old name/prices).
    We do not write or invent reviews (fake reviews are illegal in the UK under the DMCC Act 2024).
  - 'Catering for up to 500 guests' is shown as stated by the restaurant.
  - Better dish photos: send them and we'll swap them in (featured dishes, menu and About page).

5. MENU PHOTOS
  All 119 dishes have a photo. 95 use the restaurant's own photos, Pink Tea uses a photo supplied
  by us, and 23 dishes use free stock photos (Pexels / Unsplash
  licence: free for commercial use, no credit required) saved in img/stock/. Replace any of them
  with the restaurant's own photo by saving a square image over the file with the same name.

6. NOTES FROM ROUND 2 (7 Oct 2026 feedback)
  - Stylesheet and script now have versioned names (assets/site.<code>.css / .js). When updating,
    upload ALL files and delete the old assets/site.*.css / site.*.js and the old assets/site.css /
    assets/site.js, so phones never show an outdated layout.
  - Opening hours: Mon-Fri 11:30-23:30, Sat-Sun 08:00-23:30. Update the Google Business Profile too.
  - "Our most-ordered dishes" list is the restaurant's own ranking (no review counts shown).
