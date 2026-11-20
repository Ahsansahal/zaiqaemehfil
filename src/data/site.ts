export const SITE = {
  name: "Zaiqa-E-Mehfil",
  legalName: "Zaiqa-E-Mehfil Restaurant",
  tagline: "SUDBURY HILL · HARROW",
  url: "https://zaiqaemehfil.com",
  phone: "020 8422 6129",
  tel: "+442084226129",
  email: "zaiqaemehfiluk@gmail.com",
  gtmId: "GTM-MB2NNHL2",
  formEndpoint: "https://formsubmit.co/ajax/zaiqaemehfiluk@gmail.com",
  mapsUrl: "https://maps.app.goo.gl/mhRA9gGKeJ6ZYgxd6",
  address: {
    street: "156 Greenford Road",
    locality: "Sudbury Hill, Harrow",
    postcode: "HA1 3QS",
    full: "156 Greenford Road, Sudbury Hill, Harrow HA1 3QS",
    lat: 51.5574781,
    lng: -0.3354046,
  },
  hours: {
    Monday: ["11:30", "23:30"],
    Tuesday: ["11:30", "23:30"],
    Wednesday: ["11:30", "23:30"],
    Thursday: ["11:30", "23:30"],
    Friday: ["11:30", "23:30"],
    Saturday: ["08:00", "23:30"],
    Sunday: ["08:00", "23:30"],
  } as Record<string, [string, string]>,
  hoursSummary: "Mon–Fri 11:30–23:30 · Sat–Sun 8:00–23:30",
  rating: {
    score: "4.5",
    count: 619,
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/#catering", label: "Catering" },
  { href: "/contact", label: "Book & contact" },
] as const;

export const PROOF_STATS = [
  { value: 4.5, decimals: 1, suffix: "★", label: "from 619 Google reviews" },
  { value: 119, decimals: 0, suffix: "", label: "dishes from 3 cuisines" },
  { value: 500, decimals: 0, suffix: "", label: "guests — our largest catering" },
  { value: 7, decimals: 0, suffix: "", label: "days a week (Sat and Sun 8am to 11:30pm)" },
] as const;

export const MARQUEE_DISHES = [
  "Chapli Kebab",
  "Kabuli Pulao",
  "Nihari",
  "Charsi Karahi",
  "Chicken Manchurian",
  "Mantu",
  "Paya",
  "Lamb Koubideh",
  "Halwa Puri",
  "Chicken Noodles",
] as const;

export interface SignatureDish {
  name: string;
  price: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
}

export interface CuisineShowcase {
  title: string;
  subtitle: string;
  dishes: SignatureDish[];
  showMenuCard?: boolean;
}

export const SIGNATURE_CUISINES: CuisineShowcase[] = [
  {
    title: "Pakistani",
    subtitle: "Slow-cooked classics and karahi",
    dishes: [
      {
        name: "Nihari",
        price: "£14.95",
        description:
          "Beef shin simmered overnight in a velvety spiced gravy, finished with fresh ginger, green chilli and coriander.",
        image: "/img/v2/feat-nihari.webp",
        alt: "Nihari at Zaiqa-E-Mehfil, Harrow",
      },
      {
        name: "Paya",
        price: "£10.95",
        description:
          "Traditional trotter soup, slow-simmered until rich, silky and deeply spiced.",
        image: "/img/v2/feat-paya.webp",
        alt: "Paya at Zaiqa-E-Mehfil, Harrow",
      },
      {
        name: "Charsi Karahi",
        price: "from £19.95",
        description:
          "Cooked in a traditional wok with fresh tomato, green chilli, coarse salt and black pepper. Chicken or lamb, half or full kilo.",
        image: "/img/v2/feat-charsi.webp",
        alt: "Charsi Karahi at Zaiqa-E-Mehfil, Harrow",
      },
    ],
  },
  {
    title: "Afghan",
    subtitle: "From the Kabul and Pashtun table",
    dishes: [
      {
        name: "Chapli Kebab",
        price: "£8.95",
        badge: "Most mentioned in reviews",
        description:
          "Hand-flattened Pashtun-style minced meat kebab — crisp outside, tender in the centre, with coriander seed and crushed chilli.",
        image: "/img/v2/feat-chapli.webp",
        alt: "Chapli Kebab at Zaiqa-E-Mehfil, Harrow",
      },
      {
        name: "Kabuli Pulao with Lamb Shank",
        price: "£16.95",
        description:
          "Slow-cooked lamb shank on dum-style basmati, topped with caramelised carrot, raisins and almonds.",
        image: "/img/v2/feat-kabuli.webp",
        alt: "Kabuli Pulao with Lamb Shank at Zaiqa-E-Mehfil, Harrow",
      },
      {
        name: "Mixed Grill Platter",
        price: "£44.95",
        badge: "For sharing",
        description:
          "Lamb chops, lamb ribs, seekh kebabs, chicken tikka, wings and lamb tikka from the charcoal grill, with rice and chips. Serves 2–3; £79.95 for 4–6.",
        image: "/img/r2/grill-card.webp",
        alt: "Mixed Grill Platter at Zaiqa-E-Mehfil, Harrow",
      },
    ],
  },
  {
    title: "Indo-Chinese",
    subtitle: "Wok-fired, tangy and spicy",
    showMenuCard: true,
    dishes: [
      {
        name: "Chicken Manchurian",
        price: "£8.95",
        description:
          "Crispy chicken in a tangy, spicy garlic-soy sauce with spring onion and capsicum.",
        image: "/img/v2/feat-manchurian.webp",
        alt: "Chicken Manchurian at Zaiqa-E-Mehfil, Harrow",
      },
      {
        name: "Chicken Noodles",
        price: "£7.95",
        description:
          "Wok-tossed noodles with chicken, crunchy vegetables and savoury Indo-Chinese seasoning.",
        image: "/img/v2/feat-noodles.webp",
        alt: "Chicken Noodles at Zaiqa-E-Mehfil, Harrow",
      },
    ],
  },
];

export const GRILL_HIGHLIGHTS = [
  { name: "Grill Platter (2–3 persons)", price: "£44.95" },
  { name: "Grill Platter (4–6 persons)", price: "£79.95" },
  { name: "Trio Chapli Kebab", price: "£19.95" },
  { name: "Lamb Chops", price: "£14.95" },
  { name: "Momtaz", price: "£12.95" },
] as const;

export const MOJITOS = [
  { name: "Coke Mojito", price: "£4.45", image: "/img/r2/m-coke-mojito.webp" },
  { name: "Passion Fruit Mojito", price: "£4.45", image: "/img/r2/m-passionfruit-mojito.webp" },
  { name: "Classic Mojito", price: "£4.45", image: "/img/r2/m-classic-mojito.webp" },
  { name: "Strawberry Mojito", price: "£4.45", image: "/img/r2/m-strawberry-mojito.webp" },
] as const;

export const MOST_ORDERED = [
  { rank: "01", name: "Chapli kebab", image: "/img/v2/sq-chapli.webp" },
  { rank: "02", name: "Kabuli pulao", image: "/img/v2/sq-kabuli-lamb.webp" },
  { rank: "03", name: "Paya", image: "/img/sq/paya.webp" },
  { rank: "04", name: "Lamb chops", image: "/img/sq/lamb-chops.webp" },
  { rank: "05", name: "Lahori chana", image: "/img/stock/channa-masala.webp" },
  { rank: "06", name: "Charsi karahi", image: "/img/sq/chicken-charsi-full-kg.webp" },
  { rank: "07", name: "Chicken biryani", image: "/img/sq/chicken-biryani.webp" },
  { rank: "08", name: "Afghan naan", image: "/img/sq/afghan-naan.webp" },
] as const;

export interface ReviewItem {
  quote: string;
  foodScore: string;
  author: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    foodScore: "Food 5/5",
    quote:
      "Absolutely amazing food! The Chapli Kebab, Charsi Karahi, and Kabuli Pulao were all outstanding. Everything was full of authentic flavours, perfectly cooked, and beautifully seasoned. The Chapli Kebab was especially delicious, and the Charsi Karahi had that perfect rich, traditional taste. The Kabuli Pulao was equally impressive—fragrant, tasty, and perfectly cooked. Definitely one of the best places for authentic asian food. Highly recommended!",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "We tried the chefs special Chapli kebab and kabuli pulao and it was the best one we had in london. Our host Lily was very sweet and helpful she catered to our every need. Highly recommended",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "I've both dined in and gotten take out from here and it's always excellent. First time I dined in, my server was very helpful. The Burani Afghani was so good that I think it's my new favourite way to have aubergine/eggplant and the Chapli Kebab was super flavourful.",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Really enjoyed the food here. Everything was full of flavour, well cooked and the portions were generous. The meat was tender, the rice was delicious, and the food tasted fresh. Friendly service and good value for money too. Definitely a nice place for Afghan food — would happily come back.",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Food was fantastic, the kebabs were really juicy. We ordered the Kobeedas and Grilled chicken with rice. Amazing flavours. The service was also amazing, Fatima was very attentive and polite. I will definitely come back.",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Mixed platter was really enjoyable and their Koubideh was fantastic. The Chapali Kebab was pretty good too - I liked the way the seasoned onions were topped up on it. … Their Koubideh also comes in a wrap form and this with their white sauce goes a treat. Overall enjoyed it here",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "We were 50 people and really enjoyed the food and service. … Very tasty food and great service. We will come again and again. Very friendly Staff and well managed restaurant.",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Absolutely amazing food and experience! The flavours were rich authentic n perfectly cooked. Every dish tasted fresh and full of spice, truly representing the country’s cuisine. The portions were generous, the atmosphere was warm and welcoming, and the staff were friendly and attentive. You can really tell a lot of care goes into the food here. Highly recommend this restaurant — I’ll definitely be coming back!",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Great Afghan food, but what stood out was how attentive and polite Fatima was. I would definitely return for the food and friendly service. Chapli kebab, chicken and kobeda were all fresh and tasty!",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "The Kabuli Pulao was absolutely delicious, and all the chicken dishes were very tasty and perfectly cooked. A special thanks to Rose, who served us so well. She was very friendly, always smiling, and spoke so nicely. … Highly recommended!",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Wow amazing!! Ordered the whole chicken and it was cooked to perfection and seasoned very well. Nothing to complain about. Honestly 10/10. Will defo be ordering again and highly recommend this place.",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "We’ve visited this restaurant a couple of times now, and every visit has been fantastic. The food is absolutely amazing, the service is warm and attentive, and Rose is incredibly kind and welcoming — especially with my kids, which made such a difference for us. … Amazing food, lovely atmosphere, and great value… we’ll definitely be back!",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "…It was so delicious and tasty and freshly cooked some of Afghanistan dishes. Everyone really enjoyed the meal with a very very calm and lovely atmosphere in this little place. I would definitely recommend this place to anyone to try.",
    author: "Google review",
  },
  {
    foodScore: "Food 4/5",
    quote:
      "Tried this restaurant on recommendation and was not disappointed at all. Clean environment, great fresh food, quick and friendly service and very decent rates, I went with a group of 10 and everyone was happy with the food. Will go again.",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "The food was absolutely amazing! … This is TOO good to be true, what a scrumptious meal. We come for brunches and dinners and the amount of food is just perfect.",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Delicious and satisfying food with generous portions. … The meat is flavorful and well-cooked, making it a great choice for sharing.",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Absolutely delicious, it's always a hit. We are never disappointed when we come for dinner. Food is always fresh and taste homemade. Absolute perfection.",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Delicious food, Top service by Rose and nice atmosphere. Highlights of the day was the chaply kabab",
    author: "Local Guide · Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Beautiful resturant & the food was super good! Delicious & very flavourful. Would definitely recommend & come back!",
    author: "Google review",
  },
  {
    foodScore: "Food 5/5",
    quote:
      "Amazing food which was well cooked and tasty, excellent service by Rose and will definitely be back! Thank you for a brilliant dinner experience.",
    author: "Local Guide · Google review",
  },
];

export const CATERING_FEATURES = [
  {
    title: "Up to 500 guests",
    description:
      "We’ve catered gatherings of up to 500 people — large or small, we scale to your numbers.",
  },
  {
    title: "Your menu, your choice",
    description:
      "Mix dishes from all three cuisines, or tell us what you have in mind and we’ll customise the menu.",
  },
  {
    title: "Weddings & family functions",
    description: "Weddings, engagements, birthdays, parties and family celebrations.",
  },
  {
    title: "Corporate & community",
    description: "Office lunches, corporate events and community gatherings, all halal.",
  },
] as const;

export const RESTAURANT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE.url}/#restaurant`,
  name: SITE.name,
  url: `${SITE.url}/`,
  image: [`${SITE.url}/img/v2/og-image.jpg`, `${SITE.url}/img/v2/shopfront.webp`],
  logo: `${SITE.url}/img/v2/crest-240.webp`,
  telephone: SITE.tel,
  email: SITE.email,
  servesCuisine: ["Pakistani", "Afghan", "Indo-Chinese", "Halal"],
  priceRange: "££",
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: "Harrow",
    addressRegion: "Greater London",
    postalCode: SITE.address.postcode,
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.address.lat,
    longitude: SITE.address.lng,
  },
  hasMap: SITE.mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:30",
      closes: "23:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "23:30",
    },
  ],
  menu: `${SITE.url}/menu`,
};
