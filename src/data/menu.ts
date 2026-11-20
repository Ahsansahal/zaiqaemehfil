export interface MenuItem {
  name: string;
  price: string;
  image: string;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    "id": "m-breakfast",
    "name": "Breakfast",
    "items": [
      {
        "name": "Nihari",
        "price": "£14.95",
        "image": "/img/sq/nihari.webp",
        "description": "Beef shin simmered overnight in a velvety spiced gravy, finished with fresh ginger and coriander."
      },
      {
        "name": "Haleem",
        "price": "£11.95",
        "image": "/img/stock/haleem.webp",
        "description": "Shredded meat, lentils, barley and whole wheat with crispy fried onion, ginger and lemon."
      },
      {
        "name": "Paya",
        "price": "£10.95",
        "image": "/img/sq/paya.webp",
        "description": "Collagen-rich traditional soup from slow-simmered trotters."
      },
      {
        "name": "Chole Halwa Puri",
        "price": "£9.95",
        "image": "/img/r2/chole-halwa-puri.webp",
        "description": "Spiced chickpea curry, sweet semolina halwa and deep-fried puffed puri."
      },
      {
        "name": "Murgh Choly",
        "price": "£5.95",
        "image": "/img/sq/murgh-chole.webp",
        "description": "Chicken and plump chickpeas in a rich onion-and-tomato gravy."
      },
      {
        "name": "Halwa Puri",
        "price": "£5.95",
        "image": "/img/r2/halwa-puri.webp",
        "description": "Fluffy golden puri with rich, aromatic sooji halwa."
      },
      {
        "name": "Aloo Bhujia",
        "price": "£5.45",
        "image": "/img/stock/aloo-bhujia.webp",
        "description": "Dry potato curry tempered with mustard seed, cumin and turmeric."
      },
      {
        "name": "Shakshuka",
        "price": "£4.95",
        "image": "/img/stock/shakshuka.webp",
        "description": "Poached eggs in spiced tomato and red pepper sauce with garlic and cumin."
      },
      {
        "name": "Masala Omelette",
        "price": "£3.95",
        "image": "/img/sq/masala-omlette.webp",
        "description": "Eggs whisked with onion, tomato, green chilli and coriander."
      },
      {
        "name": "Aloo Paratha",
        "price": "£3.45",
        "image": "/img/stock/aloo-paratha.webp",
        "description": "Whole-wheat flatbread stuffed with spiced mashed potato, griddled with ghee."
      },
      {
        "name": "Fried Egg",
        "price": "£3.45",
        "image": "/img/sq/fried-eggs.webp",
        "description": "Crisp edges and a velvety yolk, cooked how you like it."
      },
      {
        "name": "Puri (3) / Paratha / Naan",
        "price": "£1.95",
        "image": "/img/sq/paratha.webp"
      }
    ]
  },
  {
    "id": "m-vstart",
    "name": "Veg starters",
    "items": [
      {
        "name": "Banjan Burani",
        "price": "£6.95",
        "image": "/img/v2/sq-burani.webp",
        "description": "Afghan fried aubergine in spiced tomato garlic sauce, with garlicky strained yoghurt and dried mint."
      },
      {
        "name": "Samosa Chaat",
        "price": "£6.95",
        "image": "/img/sq/samosa-chaat.webp",
        "description": "Samosas topped with spiced chickpeas, cool yoghurt, tamarind chutney, mint and crunchy sev."
      },
      {
        "name": "Chilli Paneer",
        "price": "£6.95",
        "image": "/img/sq/chilli-paneer.webp",
        "description": "Soft paneer tossed with crisp peppers, onion and green chilli."
      },
      {
        "name": "Pani Puri",
        "price": "£5.95",
        "image": "/img/sq/pani-puri.webp",
        "description": "Crisp hollow puri filled with spiced potato and chickpea, with ice-cold mint and tamarind water."
      },
      {
        "name": "Onion Bhaji",
        "price": "£4.95",
        "image": "/img/stock/onion-bhaji.webp",
        "description": "Golden fritters of thinly sliced onion in a light chickpea batter."
      },
      {
        "name": "Samosas",
        "price": "£4.95",
        "image": "/img/sq/samosas.webp",
        "description": "Crisp pastry filled with spiced potato, green peas and warm aromatics."
      }
    ]
  },
  {
    "id": "m-nvstart",
    "name": "Non-veg starters",
    "items": [
      {
        "name": "Mantu",
        "price": "£9.95",
        "image": "/img/sq/mantoo.webp",
        "description": "Afghan steamed dumplings of seasoned minced meat and onion, with garlic yoghurt and split-pea tomato ragout."
      },
      {
        "name": "Masala Fish Bites",
        "price": "£9.95",
        "image": "/img/stock/masala-fish-bites.webp",
        "description": "White fish in warm spices and herbs, fried golden and crisp."
      },
      {
        "name": "Dynamite Prawns",
        "price": "£9.95",
        "image": "/img/sq/dynamite-prawns.webp",
        "description": "Crispy fried prawns in a glossy, tangy, spicy cream sauce."
      },
      {
        "name": "Dynamite Chicken",
        "price": "£7.95",
        "image": "/img/r2/dynamite-chicken.webp",
        "description": "Crispy chicken bites in a creamy, mildly spicy dynamite sauce with spring onion."
      },
      {
        "name": "Chicken Soup with Sweetcorn",
        "price": "£4.95",
        "image": "/img/sq/chicken-sweet-corn-soup.webp",
        "description": "Comforting clear broth with shredded chicken and sweetcorn."
      },
      {
        "name": "Hot and Sour Chicken Soup",
        "price": "£4.95",
        "image": "/img/sq/hot-and-sour-soup.webp",
        "description": "Warming broth with chicken, mushroom and vegetables, spicy and sharp."
      }
    ]
  },
  {
    "id": "m-kebab",
    "name": "Kebabs",
    "items": [
      {
        "name": "Trio Chapli Kebab",
        "price": "£19.95",
        "image": "/img/v2/sq-chapli.webp",
        "description": "Three hand-flattened chapli kebabs, deep-fried golden, with fresh mint chutney and salad."
      },
      {
        "name": "Single Chapli Kebab",
        "price": "£8.95",
        "image": "/img/v2/sq-chapli.webp",
        "description": "Pashtun-style minced meat with coriander seed, crushed chilli and fresh herbs — crisp outside, tender inside."
      }
    ]
  },
  {
    "id": "m-grill",
    "name": "Charcoal grill",
    "items": [
      {
        "name": "Grill Platter (4–6 persons)",
        "price": "£79.95",
        "image": "/img/sq/mix-grill-4-5.webp",
        "description": "Lamb chops, lamb ribs, lamb seekh, chicken seekh, chicken tikka, chicken wings and lamb tikka, with rice and chips."
      },
      {
        "name": "Grill Platter (2–3 persons)",
        "price": "£44.95",
        "image": "/img/sq/mix-grill-2-3.webp",
        "description": "Lamb chops, lamb ribs, lamb seekh, chicken seekh, chicken tikka, chicken wings and lamb tikka, with rice and chips."
      },
      {
        "name": "Lamb Chops",
        "price": "£14.95",
        "image": "/img/sq/lamb-chops.webp",
        "description": "Chops in a fragrant herb and spice rub, charcoal-grilled crisp outside and tender within."
      },
      {
        "name": "Whole Peri Chicken with Rice or Chips",
        "price": "£14.95",
        "image": "/img/sq/whole-grill-chicken.webp",
        "description": "A whole chicken in vibrant peri peri spice, flame-grilled until tender and smoky."
      },
      {
        "name": "Momtaz",
        "price": "£12.95",
        "image": "/img/sq/momtaz.webp",
        "description": "One skewer of chicken tikka and one of lamb koubideh, charcoal-grilled, served over rice."
      },
      {
        "name": "Lamb Ribs",
        "price": "£12.95",
        "image": "/img/sq/lamb-ribs.webp",
        "description": "Warm-spiced ribs, flame-grilled for a smoky finish."
      },
      {
        "name": "Lamb Tikka",
        "price": "£11.95",
        "image": "/img/sq/lamb-tikka.webp",
        "description": "Lamb marinated in garlic, olive oil and warm aromatics, skewered and grilled."
      },
      {
        "name": "Lamb Koubideh",
        "price": "£11.95",
        "image": "/img/v2/sq-koubideh.webp",
        "description": "Persian-style minced lamb skewers with grated onion and aromatic spice, grilled over open flame."
      },
      {
        "name": "Chicken Wings",
        "price": "£9.95",
        "image": "/img/sq/chicken-wings.webp",
        "description": "Wings in a tangy spiced yoghurt glaze, flame-grilled with a smoky char."
      },
      {
        "name": "Chicken Tikka",
        "price": "£9.95",
        "image": "/img/sq/chicken-tikka.webp",
        "description": "Boneless chicken in a classic spiced yoghurt and lemon marinade, grilled over open flame."
      },
      {
        "name": "Chicken Seekh Kebab",
        "price": "£9.95",
        "image": "/img/sq/chicken-seekh-kebab.webp",
        "description": "Minced chicken with herbs, fresh ginger and garlic, cooked over glowing coals."
      },
      {
        "name": "Half Peri Chicken with Rice or Chips",
        "price": "£9.95",
        "image": "/img/sq/half-peri-chicken.webp",
        "description": "Half a chicken in fiery flame-grilled peri peri spice."
      }
    ]
  },
  {
    "id": "m-wraps",
    "name": "Wraps",
    "items": [
      {
        "name": "Chicken Tikka Wrap",
        "price": "£9.95",
        "image": "/img/stock/chicken-tikka-wrap.webp",
        "description": "Chicken tikka in warm flatbread with fresh salad and garlic-herb sauce."
      },
      {
        "name": "Chapli Kebab Wrap",
        "price": "£8.95",
        "image": "/img/sq/chapli-kebab-wrap.webp",
        "description": "Crispy chapli kebab in warm flatbread with salad, pickles and house sauces."
      },
      {
        "name": "Lamb Kebab Wrap",
        "price": "£8.95",
        "image": "/img/sq/lamb-kebab-wrap.webp",
        "description": "Flame-grilled spiced lamb kebab in soft flatbread with lettuce, onion and garlic or mint sauce."
      },
      {
        "name": "Chicken Kebab Wrap",
        "price": "£7.95",
        "image": "/img/sq/chicken-kebab-wrap.webp",
        "description": "Minced chicken kebab grilled over open flame, wrapped with crisp salad and house dressing."
      }
    ]
  },
  {
    "id": "m-rice",
    "name": "Rice dishes",
    "items": [
      {
        "name": "Kabuli Pulao with Lamb Shank",
        "price": "£16.95",
        "image": "/img/v2/sq-kabuli-lamb.webp",
        "description": "Slow-cooked lamb shank on fragrant dum-style basmati, topped with caramelised carrot, raisins and almonds."
      },
      {
        "name": "Lamb Biryani",
        "price": "£11.95",
        "image": "/img/sq/lamb-biryani.webp",
        "description": "Fragrant basmati slow-cooked dum-style with spice-marinated lamb, whole spices and fresh herbs."
      },
      {
        "name": "Chicken Biryani",
        "price": "£9.95",
        "image": "/img/sq/chicken-biryani.webp",
        "description": "Long-grain basmati layered with marinated chicken, warm spice, coriander and caramelised onion."
      },
      {
        "name": "Kabuli Pulao without Meat",
        "price": "£6.95",
        "image": "/img/sq/kabuli-rice.webp",
        "description": "Dum-style basmati with caramelised carrot, raisins and almonds."
      }
    ]
  },
  {
    "id": "m-vcurry",
    "name": "Veg curries",
    "items": [
      {
        "name": "Palak",
        "price": "£9.95",
        "image": "/img/sq/palak.webp",
        "description": "Spiced spinach with cumin, garlic and aromatic herbs."
      },
      {
        "name": "Paneer Curry",
        "price": "£9.95",
        "image": "/img/sq/paneer-curry.webp",
        "description": "Paneer simmered in a spiced onion-tomato sauce with roasted garam masala."
      },
      {
        "name": "Shahi Paneer",
        "price": "£9.95",
        "image": "/img/stock/shahi-paneer.webp",
        "description": "Soft paneer in a rich, mildly sweet cream and cashew sauce."
      },
      {
        "name": "Okra",
        "price": "£8.95",
        "image": "/img/sq/bindi.webp",
        "description": "Okra pan-fried with caramelised onion, tomato and dry spices."
      },
      {
        "name": "Channa Masala",
        "price": "£8.95",
        "image": "/img/stock/channa-masala.webp",
        "description": "Chickpeas in a bold, tangy onion-tomato gravy with cumin and fresh coriander."
      },
      {
        "name": "Mix Sabzi",
        "price": "£8.95",
        "image": "/img/sq/mix-veg.webp",
        "description": "Garden vegetables sautéed with onion, tomato, herbs and traditional spices."
      },
      {
        "name": "Daal",
        "price": "£8.95",
        "image": "/img/sq/daal.webp",
        "description": "Yellow lentils slow-cooked and tempered with garlic, cumin and a touch of chilli."
      }
    ]
  },
  {
    "id": "m-nvcurry",
    "name": "Non-veg curries",
    "items": [
      {
        "name": "Lamb Charsi / Lahori Karahi",
        "price": "£24.95 / £39.95",
        "image": "/img/sq/lamb-charsi-karahi-full.webp",
        "description": "Half or full kilo. Lamb cooked in its own juices with fresh tomato, green chilli and black pepper."
      },
      {
        "name": "Chicken Reshmi Karahi",
        "price": "£19.95 / £29.95",
        "image": "/img/sq/chicken-reshmi-karahi.webp",
        "description": "Half or full kilo. Bone-in chicken in a velvety sauce of cream, cheese, yoghurt, green cardamom and white pepper."
      },
      {
        "name": "Chicken Charsi / Lahori Karahi",
        "price": "£19.95 / £29.95",
        "image": "/img/sq/chicken-charsi-full-kg.webp",
        "description": "Half or full kilo, cooked in a traditional wok with fresh tomato, green chilli and coarse salt."
      },
      {
        "name": "Lamb Korma",
        "price": "£13.95",
        "image": "/img/sq/lamb-korma.webp",
        "description": "Lamb in a rich, creamy sauce with cardamom, saffron, yoghurt and ground almond."
      },
      {
        "name": "Lamb Achari Handi",
        "price": "£13.95",
        "image": "/img/sq/lamb-achari-handi.webp",
        "description": "Slow-cooked lamb in a tangy, pickle-spiced gravy with mustard seed, fenugreek and chilli."
      },
      {
        "name": "Lamb Handi",
        "price": "£12.95",
        "image": "/img/stock/lamb-handi.webp",
        "description": "Lamb slow-braised in a traditional handi pot with onion, tomato and ginger."
      },
      {
        "name": "Lamb Bindi",
        "price": "£12.95",
        "image": "/img/sq/lamb-bindi.webp",
        "description": "Lamb cooked with lightly fried okra in a savoury onion and tomato gravy."
      },
      {
        "name": "Lamb Palak",
        "price": "£12.95",
        "image": "/img/sq/lamb-palak.webp",
        "description": "Lamb braised with fresh spinach, garlic and traditional spices."
      },
      {
        "name": "Fish Curry",
        "price": "£12.95",
        "image": "/img/r2/fish-curry.webp",
        "description": "White fish in a fragrant, tangy tomato-onion gravy with mustard seed and curry leaf."
      },
      {
        "name": "Chicken Korma",
        "price": "£11.95",
        "image": "/img/sq/chicken-korma.webp",
        "description": "Mild and velvety — yoghurt, cream, warm spice and ground nuts."
      },
      {
        "name": "Butter Chicken",
        "price": "£11.95",
        "image": "/img/stock/butter-chicken.webp",
        "description": "Grilled chicken in a silky tomato and butter sauce finished with cream."
      },
      {
        "name": "Chicken Achari Handi",
        "price": "£11.95",
        "image": "/img/sq/chicken-achari-handi.webp",
        "description": "Bold and tangy with pickling spices — mustard seed, fennel and nigella."
      },
      {
        "name": "Chicken Palak",
        "price": "£10.95",
        "image": "/img/stock/chicken-palak.webp",
        "description": "Chicken in a thick puree of fresh spinach, garlic and ginger."
      },
      {
        "name": "Chicken Bindi",
        "price": "£10.95",
        "image": "/img/stock/chicken-bindi.webp",
        "description": "Chicken simmered with pan-fried fresh okra in a medium-spiced masala."
      },
      {
        "name": "Chicken Handi",
        "price": "£10.95",
        "image": "/img/sq/chicken-handi.webp",
        "description": "Slow-cooked in a traditional clay pot with tomato, yoghurt and onion."
      },
      {
        "name": "Chicken Jalfrezi",
        "price": "£10.95",
        "image": "/img/sq/chicken-jalfrezi.webp",
        "description": "Chicken stir-fried with peppers, onion and green chilli in a zesty tomato base."
      }
    ]
  },
  {
    "id": "m-indo",
    "name": "Indo-Chinese",
    "items": [
      {
        "name": "Chicken Manchurian",
        "price": "£8.95",
        "image": "/img/sq/chicken-manchurian.webp",
        "description": "Crispy chicken in a tangy, spicy garlic-soy sauce with spring onion and capsicum."
      },
      {
        "name": "Chicken Black Pepper",
        "price": "£8.95",
        "image": "/img/sq/chicken-blackpepper.webp",
        "description": "Chicken stir-fried with peppers and onion in a bold black pepper sauce."
      },
      {
        "name": "Chicken Sweet and Sour",
        "price": "£8.95",
        "image": "/img/sq/chicken-sweet-and-sour.webp",
        "description": "Crispy chicken with pineapple, peppers and onion in a glossy sweet-tangy sauce."
      },
      {
        "name": "Paneer Sweet and Sour",
        "price": "£8.95",
        "image": "/img/sq/paneer-sweet-and-sour.webp",
        "description": "Crisp paneer with pineapple, peppers and onion in a glossy sauce."
      },
      {
        "name": "Chicken Noodles",
        "price": "£7.95",
        "image": "/img/sq/chicken-noodles.webp",
        "description": "Wok-tossed noodles with chicken, vegetables and savoury seasoning."
      },
      {
        "name": "Veg Noodles",
        "price": "£5.95",
        "image": "/img/stock/veg-noodles.webp",
        "description": "Thin noodles tossed over high heat with shredded vegetables, garlic, spring onion and soy."
      }
    ]
  },
  {
    "id": "m-salad",
    "name": "Salads",
    "items": [
      {
        "name": "Shirazi Salad",
        "price": "£5.95",
        "image": "/img/sq/shirazi-salad.webp",
        "description": "Cucumber, tomato and red onion in lime juice, olive oil and dried mint."
      },
      {
        "name": "Feta Cheese Salad",
        "price": "£5.95",
        "image": "/img/sq/feta-cheese-salad.webp",
        "description": "Mixed greens, cucumber, tomato and olives with feta and pomegranate dressing."
      },
      {
        "name": "Zaiqa Salad",
        "price": "£4.95",
        "image": "/img/sq/zaiqa-salad.webp",
        "description": "Cucumber, tomato, red cabbage, carrot and lettuce in a citrus-herb dressing."
      }
    ]
  },
  {
    "id": "m-chips",
    "name": "Chips",
    "items": [
      {
        "name": "Loaded Grilled Chicken Chips",
        "price": "£6.95",
        "image": "/img/stock/loaded-grilled-chicken-chips.webp",
        "description": "Chips topped with flame-grilled chicken, melted cheese and house sauces."
      },
      {
        "name": "Cheesy Chips",
        "price": "£4.95",
        "image": "/img/stock/cheesy-chips.webp",
        "description": "Golden chips under a rich melted cheese blend."
      },
      {
        "name": "Sweet Potato Chips",
        "price": "£2.95",
        "image": "/img/stock/sweet-potato-chips.webp",
        "description": "Crisp, lightly salted sweet potato fries."
      },
      {
        "name": "Peri Peri Chips",
        "price": "£2.95",
        "image": "/img/sq/peri-chips.webp",
        "description": "Golden chips tossed in a zesty peri peri blend."
      },
      {
        "name": "Plain Chips",
        "price": "£2.45",
        "image": "/img/sq/chips.webp",
        "description": "Crisp outside, fluffy inside, lightly salted."
      }
    ]
  },
  {
    "id": "m-kids",
    "name": "Kids' menu",
    "items": [
      {
        "name": "Mozzarella Sticks",
        "price": "£6.95",
        "image": "/img/sq/mozeralla-sticks.webp",
        "description": "Mozzarella in seasoned breadcrumb, fried golden."
      },
      {
        "name": "Chicken Burger",
        "price": "£6.95",
        "image": "/img/stock/chicken-burger.webp",
        "description": "Crispy chicken in a toasted bun with lettuce, tomato, ketchup and mayo."
      },
      {
        "name": "Chicken Nuggets with Fries",
        "price": "£5.95",
        "image": "/img/stock/chicken-nuggets-with-fries.webp",
        "description": "Golden chicken bites with seasoned chips."
      }
    ]
  },
  {
    "id": "m-bread",
    "name": "Naan & breads",
    "items": [
      {
        "name": "Afghani Naan",
        "price": "£2.95",
        "image": "/img/sq/afghan-naan.webp"
      },
      {
        "name": "Garlic Butter Naan",
        "price": "£2.95",
        "image": "/img/sq/garlic-naan.webp"
      },
      {
        "name": "Butter Naan",
        "price": "£2.45",
        "image": "/img/sq/butter-naan.webp"
      },
      {
        "name": "Paratha",
        "price": "£2.45",
        "image": "/img/sq/paratha.webp"
      },
      {
        "name": "Naan",
        "price": "£1.95",
        "image": "/img/sq/naan.webp"
      },
      {
        "name": "Roti",
        "price": "£1.95",
        "image": "/img/sq/roti.webp"
      }
    ]
  },
  {
    "id": "m-cold",
    "name": "Lassi, mojitos & soft drinks",
    "items": [
      {
        "name": "Mango Lassi Jug",
        "price": "£12.95",
        "image": "/img/sq/mango-lassi.webp"
      },
      {
        "name": "Sweet Lassi Jug",
        "price": "£10.95",
        "image": "/img/sq/sweet-lassi.webp"
      },
      {
        "name": "Mango Lassi",
        "price": "£4.95",
        "image": "/img/sq/mango-lassi.webp"
      },
      {
        "name": "Sweet Lassi",
        "price": "£4.45",
        "image": "/img/sq/sweet-lassi.webp"
      },
      {
        "name": "Classic Mojito",
        "price": "£4.45",
        "image": "/img/sq/classic-mojito.webp"
      },
      {
        "name": "Passion Fruit Mojito",
        "price": "£4.45",
        "image": "/img/sq/passionfruit-mojito.webp"
      },
      {
        "name": "Strawberry Mojito",
        "price": "£4.45",
        "image": "/img/sq/strawberry-mojito.webp"
      },
      {
        "name": "Red Bull Mojito",
        "price": "£4.45",
        "image": "/img/sq/redbull-mojito.webp"
      },
      {
        "name": "Coke Mojito",
        "price": "£4.45",
        "image": "/img/sq/coke-mojito.webp"
      },
      {
        "name": "Mango, apple or orange juice",
        "price": "£1.95",
        "image": "/img/sq/mango-juice.webp"
      },
      {
        "name": "Coke · Diet Coke · Sprite · Fanta · 7up · Salam Cola",
        "price": "£1.95",
        "image": "/img/sq/coke.webp"
      }
    ]
  },
  {
    "id": "m-hot",
    "name": "Hot drinks",
    "items": [
      {
        "name": "Karak Tea Pot",
        "price": "£9.95",
        "image": "/img/stock/karak-tea-pot.webp"
      },
      {
        "name": "Peshwari Tea Pot",
        "price": "£6.95",
        "image": "/img/sq/peshwari-tea.webp"
      },
      {
        "name": "Cappuccino",
        "price": "£3.45",
        "image": "/img/sq/cappuccino.webp"
      },
      {
        "name": "Latte · Flat White",
        "price": "£3.45",
        "image": "/img/sq/flat-white.webp"
      },
      {
        "name": "Americano, black or white",
        "price": "£3.45",
        "image": "/img/sq/americano-black.webp"
      },
      {
        "name": "Karak Tea",
        "price": "£2.95",
        "image": "/img/stock/karak-tea.webp"
      },
      {
        "name": "Pink Tea",
        "price": "£2.95",
        "image": "/img/stock/pink-tea.webp"
      },
      {
        "name": "Double Espresso",
        "price": "£2.95",
        "image": "/img/sq/double-espresso.webp"
      },
      {
        "name": "Fresh Mint Tea",
        "price": "£2.24",
        "image": "/img/sq/fresh-mint-tea.webp"
      },
      {
        "name": "English Breakfast Tea",
        "price": "£2.24",
        "image": "/img/sq/english-breakfast-tea.webp"
      },
      {
        "name": "Peshwari Green Tea",
        "price": "£1.95",
        "image": "/img/sq/peshwari-tea.webp"
      }
    ]
  },
  {
    "id": "m-dessert",
    "name": "Desserts",
    "items": [
      {
        "name": "Gajar Halwa",
        "price": "£5.95",
        "image": "/img/sq/gajar-halwa.webp",
        "description": "Slow-cooked carrot halwa with cardamom, ghee and pistachio."
      },
      {
        "name": "Kheer",
        "price": "£4.95",
        "image": "/img/sq/kheer.webp",
        "description": "Slow-simmered rice pudding, delicately spiced."
      },
      {
        "name": "Falooda or Shiryakh",
        "price": "£4.95",
        "image": "/img/sq/shiryakh.webp",
        "description": "Chilled, layered and fragrant."
      },
      {
        "name": "Sooji Halwa",
        "price": "£3.95",
        "image": "/img/sq/sooji-halwa.webp",
        "description": "Rich, aromatic semolina halwa."
      },
      {
        "name": "Ice cream — vanilla, strawberry or chocolate",
        "price": "£2.45",
        "image": "/img/sq/vanilla-icecream.webp"
      }
    ]
  }
];

export const TOTAL_MENU_ITEMS = MENU_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
