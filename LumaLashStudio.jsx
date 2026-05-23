/*
 * LUMA LASH STUDIO — Single-file React component
 * ================================================
 * SWAP THESE BEFORE GOING LIVE:
 *   PHONE        → WhatsApp/phone in international format, no + no spaces (e.g. 48512345678)
 *   INSTAGRAM    → Instagram handle without @
 *   TIKTOK       → TikTok handle without @
 *   EMAIL        → Contact email address
 *   BOOKSY_URL   → Your full Booksy booking page URL
 *   DOMAIN       → Your production domain (https://yourdomain.pl)
 *   ADDRESS      → Real street address for schema and footer
 *   GEO_LAT/LON  → Exact lat/lng from Google Maps right-click "What's here?"
 *   BRAND        → Your studio name
 *   ARTIST       → Artist first name
 *   IMAGES       → Replace all Unsplash URLs with real photos of your work
 *   TEXT         → Fine-tune any copy in all four languages (PL primary)
 *   SERVICES     → Adjust prices and service descriptions
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone, MessageCircle, Instagram, Mail, ChevronDown, ChevronUp,
  X, Menu, MoveHorizontal, Heart, Star, Music2
} from 'lucide-react';

// ─── SWAP THESE ───────────────────────────────────────────────────────────────
const PHONE      = "48XXXXXXXXX";
const INSTAGRAM  = "lash_warszawa_alina";
const TIKTOK     = "lashwarszawaalina";
const EMAIL      = "hello@lashwarszawa.pl";
const BOOKSY_URL = "https://booksy.com/pl-pl/your-profile";
const DOMAIN     = "https://lashwarszawa.pl";
const ADDRESS_STREET = "ul. Marszałkowska 1";
const ADDRESS_POSTAL = "00-001";
const ADDRESS_CITY   = "Warszawa";
const GEO_LAT    = 52.2297;
const GEO_LON    = 21.0122;
const BRAND      = "LUMA LASH STUDIO";
const ARTIST     = "Alina";
// ─────────────────────────────────────────────────────────────────────────────

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&q=80&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588776814546-1ffbb172f77a?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80&auto=format&fit=crop",
  ],
  pairs: [
    {
      before: "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=800&q=80&auto=format&fit=crop",
      after:  "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&q=80&auto=format&fit=crop",
    },
    {
      before: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80&auto=format&fit=crop",
      after:  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80&auto=format&fit=crop",
    },
    {
      before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
      after:  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80&auto=format&fit=crop",
    },
  ],
};

const SERVICES = [
  { pl: "Klasyka 1:1 / Classic",              en: "Classic 1:1",                  desc_pl: "Naturalny efekt, jak tusz do rzęs",                     desc_en: "Natural effect, like mascara",            price: "180 PLN" },
  { pl: "Hybryda 1.5D / Hybrid",              en: "Hybrid 1.5D",                  desc_pl: "Mix klasyki i lekkiej objętości",                        desc_en: "Mix of classic and light volume",         price: "210 PLN" },
  { pl: "Objętość 2D-3D / Volume",            en: "Volume 2D-3D",                 desc_pl: "Miękka pełnia, fluffy",                                  desc_en: "Soft fullness, fluffy texture",           price: "240 PLN" },
  { pl: "Mega Volume 4D-6D",                  en: "Mega Volume 4D-6D",            desc_pl: "Maksymalna gęstość, dramatyczny look",                   desc_en: "Maximum density, dramatic look",          price: "280 PLN" },
  { pl: "Lifting + Botox rzęs / Lash lift",   en: "Lash Lift + Botox",            desc_pl: "Podnosi i utrwala naturalne rzęsy, 6–8 tygodni",         desc_en: "Lifts & sets natural lashes, 6–8 weeks", price: "150 PLN" },
  { pl: "Uzupełnienie (do 3 tygodni) / Refill", en: "Infill (up to 3 weeks)",     desc_pl: "Konserwacja każdego zestawu",                            desc_en: "Maintenance for any set",                price: "od 140 PLN" },
  { pl: "Zdjęcie rzęs / Removal",             en: "Removal",                      desc_pl: "Bezpieczne usunięcie",                                   desc_en: "Safe removal",                           price: "50 PLN" },
];

const TEXT = {
  pl: {
    meta_title: `Przedłużanie rzęs Warszawa | ${BRAND} — ${ARTIST}`,
    meta_desc:  "Profesjonalne przedłużanie rzęs w Warszawie Śródmieście. 6 lat doświadczenia, lekkie materiały, trwałość 4–6 tygodni. Umów wizytę przez WhatsApp lub Booksy.",
    meta_kw:    "przedłużanie rzęs Warszawa, stylizacja rzęs Warszawa, lash lift Warszawa, rzęsy objętościowe Śródmieście, lash artist Warszawa",

    nav_svc: "Usługi", nav_gal: "Galeria", nav_ba: "Metamorfozy",
    nav_test: "Opinie", nav_about: "O mnie", nav_book: "Rezerwacja", nav_cta: "Umów wizytę",

    hero_eyebrow: "WARSZAWA · WIZYTY UMAWIANE",
    hero_h1a: "Rzęsy zaprojektowane",
    hero_h1em: "pod Twoje",
    hero_h1b: "życie.",
    hero_sub: "Indywidualne mapowanie, lekkie materiały, efekt trwający 4–6 tygodni. Każdy zestaw dopasowany do kształtu oczu i rytmu Twojego dnia.",
    hero_cta_book: "Umów wizytę",
    hero_cta_wa: "WhatsApp",
    hero_trust: "★ 4.9 · 500+ stylizacji · Lash artist 6 lat · Śródmieście",

    svc_eyebrow: "OFERTA",
    svc_h2: "Stylizacje, lifting, pielęgnacja.",
    svc_note: "Konsultacja w cenie. Test alergiczny na życzenie.",
    svc_cta: "Zarezerwuj termin",

    ba_eyebrow: "EFEKT",
    ba_h2: "Zobacz różnicę.",
    ba_before: "PRZED",
    ba_after: "PO",

    gal_eyebrow: "OSTATNIE PRACE",
    gal_h2: "Najnowsze stylizacje.",
    gal_sub: `Śledź mnie na @${INSTAGRAM} →`,
    gal_quote: "Zapis na miesiąc do przodu.",

    test_eyebrow: "POLECAJĄ",
    test_h2: "Co mówią klientki.",
    testimonials: [
      { body: "Alina to prawdziwa artystka. Po raz pierwszy w życiu czuję, że rzęsy wyglądają jak moje własne — tylko piękniejsze. Efekt przetrwał pełne cztery tygodnie.", name: "Ola K., Warszawa" },
      { body: "Bardzo profesjonalne podejście i niesamowita dbałość o szczegóły. Alina doradziła mi idealny styl do kształtu moich oczu. Wracam regularnie od roku.", name: "Daria M., Warszawa" },
      { body: "Nareszcie znalazłam kogoś, kto rozumie, że mniej znaczy więcej. Klasyka 1:1 u Aliny wygląda jak perfekcyjny tusz — naturalnie i elegancko.", name: "Kasia W., Warszawa" },
      { body: "Jako Ukrainka szukałam artystki, z którą mogę rozmawiać po ukraińsku. Alina jest profesjonalna i miła, a efekty są absolutnie zachwycające.", name: "Mariia T., Warszawa" },
      { body: "Lifting rzęs zmienił moje codzienne życie — wstaję rano i od razu wyglądają idealnie. Studio jest eleganckie i klimatyczne. Polecam z całego serca.", name: "Ela S., Warszawa" },
      { body: "Mega volume 4D i nie mogę oderwać wzroku od lustra! Alina wie dokładnie, jak zbalansować dramatyczny efekt z naturalnym pięknem. Jestem zachwycona.", name: "Sofia R., Warszawa" },
    ],

    about_eyebrow: "STYLISTKA",
    about_h2: `Cześć, jestem ${ARTIST}.`,
    about_p1: "Jestem certyfikowaną lash artistką z ponad 6-letnim doświadczeniem, zdobytym w Warszawie i za granicą. Szkołę ukończyłam z wyróżnieniem w LashBox LA — uznawanej za jedną z najlepszych szkół lashowych na świecie.",
    about_p2: "Wierzę, że dobre rzęsy nie przyciągają uwagi do siebie — one uwydatniają spojrzenie, które już masz. Każdy zestaw projektuję indywidualnie: maluję mapę oczu, doradzam kształt i dostosowuję grubość włosa do kondycji Twoich naturalnych rzęs.",
    about_p3: "Przyjmuję klientki po polsku, angielsku, rosyjsku i ukraińsku. Studio mieści się w centrum Warszawy, Śródmieście. Napisz na WhatsApp i umów się na niezobowiązującą konsultację.",
    about_chips: ["LashBox LA certified", "Sky Glue", "0.03–0.10 mm", "Cruelty-free"],

    faq_eyebrow: "FAQ",
    faq_h2: "Najczęstsze pytania.",
    faqs: [
      { q: "Jak długo trzymają się przedłużone rzęsy?", a: "Przedłużone rzęsy trzymają się 4–6 tygodni, zależnie od naturalnego cyklu wzrostu i pielęgnacji. Uzupełnienie co 2–3 tygodnie pozwala utrzymać efekt na stałe. Prawidłowa pielęgnacja — brak tłustych produktów i delikatne mycie — znacząco wydłuża trwałość zestawu." },
      { q: "Czy zabieg boli?", a: "Nie — zabieg jest całkowicie bezbolesny. Leżysz z zamkniętymi oczami, a ja pracuję na naklejce ochronnej pod dolnymi rzęsami. Większość klientek zasypia podczas sesji." },
      { q: "Jak dbać o rzęsy po zabiegu?", a: "Przez pierwsze 24 godziny unikaj wody, pary i tłustych produktów. Następnie myj rzęsy codziennie łagodną pianką, szczotkuj miękką szczoteczką i unikaj olejowych kosmetyków wokół oczu. Śpij na plecach lub na poduszce do rzęs." },
      { q: "Jak często robić uzupełnienie?", a: "Zalecam uzupełnienie co 2–3 tygodnie. Im rzadziej, tym więcej rzęs trzeba uzupełnić i tym wyższy koszt. Przy regularnych wizytach co 2 tygodnie zestaw zawsze wygląda świeżo." },
      { q: "Czy można malować przedłużone rzęsy tuszem?", a: "Nie zalecam tuszu — przedłużenia same w sobie dają efekt, który tusz daje naturalnym rzęsom. Jeśli już, stosuj tusz wyłącznie na naturalne rzęsy u nasady, unikaj formuł waterproof i delikatnie zmywaj." },
      { q: "Ile trwa pierwsza wizyta?", a: "Pierwsza wizyta trwa 90–120 minut, zależnie od wybranego zestawu: Classic 1:1 ok. 90 minut, Volume 2D-3D ok. 110 minut, Mega Volume do 2 godzin. Wliczona jest wstępna konsultacja i omówienie efektu końcowego." },
    ],

    book_eyebrow: "GOTOWA?",
    book_h2: "Zaprojektujmy Twoje rzęsy.",
    book_booksy: "Rezerwuj na Booksy",
    book_wa: "WhatsApp",
    book_custom: "Zamów własny termin",

    modal_title: "Wybierz termin",
    modal_name: "Imię",
    modal_phone: "Telefon",
    modal_date: "Preferowana data",
    modal_svc: "Usługa",
    modal_msg: "Wiadomość (opcjonalnie)",
    modal_submit: "Wyślij zapytanie",
    modal_ok: "Dziękuję! Wyślij mi wiadomość e-mail, aby potwierdzić termin.",
    modal_email_cta: "Wyślij mailem",
    svc_opts: ["Klasyka 1:1", "Hybryda 1.5D", "Objętość 2D-3D", "Mega Volume 4D-6D", "Lifting + Botox rzęs", "Uzupełnienie", "Zdjęcie rzęs"],

    wa_msg: "Cześć! Chciałabym umówić się na przedłużanie rzęs.",

    alt_hero: "Makro fotografii oka z perfekcyjnie przedłużonymi rzęsami",
    alt_about: `${ARTIST} — lash artistka, portret w studio`,
    alt_g: ["Klasyczne przedłużanie rzęs 1:1", "Objętościowe rzęsy Volume 2D-3D", "Lifting rzęs efekt naturalny", "Mega Volume 4D efekt dramatyczny", "Hybrydowa stylizacja rzęs", "Studio do stylizacji rzęs Warszawa"],
    alt_b: ["Rzęsy przed zabiegiem — naturalne", "Rzęsy przed — krótkie i jasne", "Oko przed lifting rzęs"],
    alt_a: ["Rzęsy po zabiegu Classic 1:1", "Rzęsy po — Volume 2D", "Oko po lifting rzęs"],

    footer_tag: "Warszawa, Śródmieście — wizyty umawiane",
    footer_cancel: "Polityka anulowania",
    footer_copy: `© 2026 ${BRAND}. Wszelkie prawa zastrzeżone.`,

    aria_wa: "Napisz na WhatsApp",
    aria_call: "Zadzwoń",
    aria_close: "Zamknij okno",
    aria_menu: "Otwórz menu",
    aria_slider: "Suwak przed/po — użyj strzałek, aby przesuwać",
  },

  en: {
    meta_title: `Eyelash Extensions Warsaw | ${BRAND} — ${ARTIST}`,
    meta_desc:  "Professional eyelash extensions in Warsaw city centre. 6 years experience, lightweight materials, 4–6 week wear. Book via WhatsApp or Booksy.",
    meta_kw:    "eyelash extensions Warsaw, lash artist Warsaw, lash lift Warsaw, volume lashes city centre",

    nav_svc: "Services", nav_gal: "Gallery", nav_ba: "Transformations",
    nav_test: "Reviews", nav_about: "About", nav_book: "Book", nav_cta: "Book now",

    hero_eyebrow: "WARSAW · BY APPOINTMENT",
    hero_h1a: "Lashes designed",
    hero_h1em: "for the way",
    hero_h1b: "you actually live.",
    hero_sub: "Hand-mapped sets, lightweight materials, 4–6 week wear. Every set tailored to your eye shape and lifestyle.",
    hero_cta_book: "Book now",
    hero_cta_wa: "WhatsApp",
    hero_trust: "★ 4.9 · 500+ sets · 6 years experience · City Centre",

    svc_eyebrow: "SERVICES",
    svc_h2: "Extensions, lift, aftercare.",
    svc_note: "Consultation included. Allergy patch test available on request.",
    svc_cta: "Reserve your appointment",

    ba_eyebrow: "RESULTS",
    ba_h2: "See the difference.",
    ba_before: "BEFORE",
    ba_after: "AFTER",

    gal_eyebrow: "RECENT WORK",
    gal_h2: "Latest sets.",
    gal_sub: `Follow me @${INSTAGRAM} →`,
    gal_quote: "Bookings one month ahead.",

    test_eyebrow: "REVIEWS",
    test_h2: "What clients say.",
    testimonials: [
      { body: "Alina is a true artist. For the first time in my life my lashes look like my own — only more beautiful. The result lasted a full four weeks.", name: "Ola K., Warsaw" },
      { body: "Incredibly professional with amazing attention to detail. Alina advised me on the perfect style for my eye shape. I've been a regular for over a year.", name: "Daria M., Warsaw" },
      { body: "I finally found someone who understands less is more. Classic 1:1 by Alina looks like perfect mascara — natural and elegant.", name: "Kasia W., Warsaw" },
      { body: "As a Ukrainian living in Warsaw I wanted an artist I could speak with in my language. Alina is warm, professional, and the results are stunning.", name: "Mariia T., Warsaw" },
      { body: "Lash lift changed my daily life — I wake up and they already look perfect. The studio is elegant and atmospheric. Highly recommended.", name: "Ela S., Warsaw" },
      { body: "Mega volume 4D and I can't stop looking in the mirror! Alina knows how to balance a dramatic effect with natural beauty.", name: "Sofia R., Warsaw" },
    ],

    about_eyebrow: "ARTIST",
    about_h2: `Hi, I'm ${ARTIST}.`,
    about_p1: "I'm a certified lash artist with over 6 years of experience, gained in Warsaw and abroad. I graduated with distinction from LashBox LA — recognised as one of the best lash schools in the world.",
    about_p2: "I believe great lashes don't draw attention to themselves — they enhance the gaze you already have. I design every set individually: I map your eyes, advise on shape, and match the fibre thickness to the condition of your natural lashes.",
    about_p3: "I welcome clients in Polish, English, Russian and Ukrainian. The studio is in Warsaw city centre, Śródmieście. Message me on WhatsApp to arrange a no-obligation consultation.",
    about_chips: ["LashBox LA certified", "Sky Glue", "0.03–0.10 mm", "Cruelty-free"],

    faq_eyebrow: "FAQ",
    faq_h2: "Frequently asked questions.",
    faqs: [
      { q: "How long do eyelash extensions last?", a: "Extensions typically last 4–6 weeks depending on your natural lash growth cycle and aftercare. Infills every 2–3 weeks keep the set looking fresh. Proper care — no oily products, gentle cleansing — significantly extends longevity." },
      { q: "Is the procedure painful?", a: "Not at all. The treatment is completely painless — you lie with your eyes closed while I work on a protective pad under your lower lashes. Most clients fall asleep during the session." },
      { q: "How do I care for my lashes after the appointment?", a: "Avoid water, steam and oily products for the first 24 hours. Then cleanse daily with a gentle lash foam, brush with a soft spoolie, and avoid oil-based products near the eyes. Sleep on your back or on a lash pillow." },
      { q: "How often should I get an infill?", a: "I recommend infills every 2–3 weeks. The longer you leave it, the more lashes need replacing and the higher the cost. With regular visits every 2 weeks, your set always looks freshly done." },
      { q: "Can I wear mascara on extensions?", a: "I don't recommend mascara — extensions already deliver the effect mascara gives to natural lashes. If you must, apply only to the natural lashes at the root, avoid waterproof formulas, and always remove gently." },
      { q: "How long does the first appointment take?", a: "The first appointment takes 90–120 minutes depending on the set chosen. Classic 1:1 takes about 90 minutes, Volume 2D-3D about 110 minutes, Mega Volume up to 2 hours. This includes the initial consultation and discussion of the final look." },
    ],

    book_eyebrow: "READY?",
    book_h2: "Let's design your lashes.",
    book_booksy: "Book on Booksy",
    book_wa: "WhatsApp",
    book_custom: "Request a custom time",

    modal_title: "Request an appointment",
    modal_name: "First name",
    modal_phone: "Phone",
    modal_date: "Preferred date",
    modal_svc: "Service",
    modal_msg: "Message (optional)",
    modal_submit: "Send request",
    modal_ok: "Thank you! Send me an email to confirm your appointment.",
    modal_email_cta: "Send by email",
    svc_opts: ["Classic 1:1", "Hybrid 1.5D", "Volume 2D-3D", "Mega Volume 4D-6D", "Lash Lift + Botox", "Infill", "Removal"],

    wa_msg: "Hi! I'd like to book an eyelash extension appointment.",

    alt_hero: "Macro photo of an eye with perfectly extended lashes",
    alt_about: `${ARTIST} — lash artist, studio portrait`,
    alt_g: ["Classic 1:1 eyelash extensions", "Volume 2D-3D lash extensions", "Lash lift natural effect", "Mega Volume 4D dramatic effect", "Hybrid lash styling", "Lash extension studio Warsaw"],
    alt_b: ["Lashes before treatment — natural", "Lashes before — short and fair", "Eye before lash lift"],
    alt_a: ["Lashes after Classic 1:1", "Lashes after — Volume 2D", "Eye after lash lift"],

    footer_tag: "Warsaw, City Centre — by appointment",
    footer_cancel: "Cancellation policy",
    footer_copy: `© 2026 ${BRAND}. All rights reserved.`,

    aria_wa: "Message on WhatsApp",
    aria_call: "Call us",
    aria_close: "Close modal",
    aria_menu: "Open menu",
    aria_slider: "Before/after slider — use arrows to move",
  },

  ru: {
    meta_title: `Наращивание ресниц Варшава | ${BRAND} — Алина`,
    meta_desc:  "Профессиональное наращивание ресниц в центре Варшавы. 6 лет опыта, лёгкие материалы, эффект 4–6 недель. Запись через WhatsApp или Booksy.",
    meta_kw:    "наращивание ресниц Варшава, лэш мастер Варшава, ламинирование ресниц Варшава, объёмные ресницы",

    nav_svc: "Услуги", nav_gal: "Галерея", nav_ba: "Метаморфозы",
    nav_test: "Отзывы", nav_about: "Обо мне", nav_book: "Запись", nav_cta: "Записаться",

    hero_eyebrow: "ВАРШАВА · ЗАПИСЬ НА ПРИЁМ",
    hero_h1a: "Ресницы, созданные",
    hero_h1em: "под твой",
    hero_h1b: "ритм жизни.",
    hero_sub: "Индивидуальное картирование, лёгкие материалы, эффект 4–6 недель. Каждый набор подобран под форму твоих глаз.",
    hero_cta_book: "Записаться",
    hero_cta_wa: "WhatsApp",
    hero_trust: "★ 4.9 · 500+ работ · Мастер 6 лет · Центр города",

    svc_eyebrow: "УСЛУГИ",
    svc_h2: "Наращивание, ламинирование, уход.",
    svc_note: "Консультация включена. Аллергический тест по запросу.",
    svc_cta: "Выбрать дату",

    ba_eyebrow: "РЕЗУЛЬТАТ",
    ba_h2: "Почувствуй разницу.",
    ba_before: "ДО",
    ba_after: "ПОСЛЕ",

    gal_eyebrow: "ПОСЛЕДНИЕ РАБОТЫ",
    gal_h2: "Свежие стилизации.",
    gal_sub: `Следи за мной @${INSTAGRAM} →`,
    gal_quote: "Запись за месяц вперёд.",

    test_eyebrow: "ОТЗЫВЫ",
    test_h2: "Что говорят клиентки.",
    testimonials: [
      { body: "Алина — настоящий художник. Впервые в жизни я чувствую, что ресницы выглядят как мои собственные — только красивее. Эффект держался полные четыре недели.", name: "Оля К., Варшава" },
      { body: "Очень профессиональный подход и невероятное внимание к деталям. Алина посоветовала мне идеальный стиль под форму моих глаз. Хожу регулярно уже год.", name: "Дарья М., Варшава" },
      { body: "Наконец нашла мастера, который понимает: меньше — значит больше. Классика 1:1 у Алины выглядит как идеальная тушь — натурально и элегантно.", name: "Катя В., Варшава" },
      { body: "Я из Украины, искала мастера, с которым можно говорить по-украински. Алина профессиональная и тёплая, результаты просто восхитительные.", name: "Мария Т., Варшава" },
      { body: "Ламинирование ресниц изменило мою жизнь — просыпаюсь утром, и они уже выглядят идеально. Студия элегантная и атмосферная. Очень рекомендую.", name: "Эла С., Варшава" },
      { body: "Mega volume 4D — и я не могу оторваться от зеркала! Алина точно знает, как сбалансировать драматичный эффект с естественной красотой.", name: "София Р., Варшава" },
    ],

    about_eyebrow: "МАСТЕР",
    about_h2: "Привет, я Алина.",
    about_p1: "Я сертифицированный лэш-мастер с более чем 6-летним опытом, полученным в Варшаве и за рубежом. Окончила LashBox LA с отличием — школу, признанную одной из лучших в мире.",
    about_p2: "Я верю, что хорошие ресницы не привлекают внимание к себе — они подчёркивают взгляд, который у тебя уже есть. Каждый набор проектирую индивидуально: составляю карту глаз, советую форму и подбираю толщину волоска под состояние натуральных ресниц.",
    about_p3: "Принимаю клиентов на польском, английском, русском и украинском. Студия в центре Варшавы. Напиши в WhatsApp — договоримся о консультации.",
    about_chips: ["LashBox LA certified", "Sky Glue", "0.03–0.10 mm", "Cruelty-free"],

    faq_eyebrow: "FAQ",
    faq_h2: "Частые вопросы.",
    faqs: [
      { q: "Сколько держится наращивание ресниц?", a: "Наращенные ресницы держатся 4–6 недель в зависимости от естественного цикла роста и ухода. Коррекция каждые 2–3 недели позволяет поддерживать эффект постоянно. Правильный уход — без жирных продуктов и бережное очищение — значительно продлевает срок набора." },
      { q: "Больно ли делать процедуру?", a: "Нет — процедура абсолютно безболезненна. Ты лежишь с закрытыми глазами, а я работаю на защитной наклейке под нижними ресницами. Большинство клиенток засыпают во время сеанса." },
      { q: "Как ухаживать за ресницами после процедуры?", a: "Первые 24 часа избегай воды, пара и жирных продуктов. Потом ежедневно промывай мягкой пенкой, расчёсывай щёточкой и избегай масляной косметики вблизи глаз. Спи на спине или на специальной подушке." },
      { q: "Как часто нужна коррекция?", a: "Рекомендую коррекцию каждые 2–3 недели. Чем реже, тем больше ресниц нужно восстанавливать и тем выше стоимость. При регулярных визитах раз в 2 недели набор всегда выглядит свежим." },
      { q: "Можно ли красить наращенные ресницы тушью?", a: "Не рекомендую — наращивание само даёт тот эффект, который тушь даёт натуральным ресницам. Если нужно, наноси только у корней натуральных ресниц, избегай водостойких формул и снимай бережно." },
      { q: "Сколько длится первый визит?", a: "Первый визит занимает 90–120 минут в зависимости от набора: Классика 1:1 — около 90 минут, Volume 2D-3D — около 110 минут, Mega Volume — до 2 часов. Включая первичную консультацию и обсуждение результата." },
    ],

    book_eyebrow: "ГОТОВА?",
    book_h2: "Создадим твои идеальные ресницы.",
    book_booksy: "Записаться на Booksy",
    book_wa: "WhatsApp",
    book_custom: "Выбрать удобное время",

    modal_title: "Запросить время",
    modal_name: "Имя",
    modal_phone: "Телефон",
    modal_date: "Желаемая дата",
    modal_svc: "Услуга",
    modal_msg: "Сообщение (необязательно)",
    modal_submit: "Отправить запрос",
    modal_ok: "Спасибо! Напиши мне на почту, чтобы подтвердить запись.",
    modal_email_cta: "Написать на почту",
    svc_opts: ["Классика 1:1", "Гибрид 1.5D", "Объём 2D-3D", "Мега-объём 4D-6D", "Ламинирование + Ботокс", "Коррекция", "Снятие"],

    wa_msg: "Привет! Хочу записаться на наращивание ресниц.",

    alt_hero: "Макро-фотография глаза с идеально наращенными ресницами",
    alt_about: "Алина — лэш-мастер, портрет в студии",
    alt_g: ["Классическое наращивание ресниц 1:1", "Объёмные ресницы Volume 2D-3D", "Ламинирование ресниц натуральный эффект", "Mega Volume 4D драматичный эффект", "Гибридная стилизация ресниц", "Студия наращивания ресниц Варшава"],
    alt_b: ["Ресницы до процедуры — натуральные", "Ресницы до — короткие и светлые", "Глаз до ламинирования ресниц"],
    alt_a: ["Ресницы после Classic 1:1", "Ресницы после — Volume 2D", "Глаз после ламинирования ресниц"],

    footer_tag: "Варшава, Центр города — запись на приём",
    footer_cancel: "Политика отмены",
    footer_copy: `© 2026 ${BRAND}. Все права защищены.`,

    aria_wa: "Написать в WhatsApp",
    aria_call: "Позвонить",
    aria_close: "Закрыть окно",
    aria_menu: "Открыть меню",
    aria_slider: "Слайдер до/после — используй стрелки для перемещения",
  },

  uk: {
    meta_title: `Нарощування вій Варшава | ${BRAND} — Аліна`,
    meta_desc:  "Професійне нарощування вій у центрі Варшави. 6 років досвіду, легкі матеріали, ефект 4–6 тижнів. Запис через WhatsApp або Booksy.",
    meta_kw:    "нарощування вій Варшава, леш майстер Варшава, ламінування вій Варшава, об'ємні вії",

    nav_svc: "Послуги", nav_gal: "Галерея", nav_ba: "Метаморфози",
    nav_test: "Відгуки", nav_about: "Про мене", nav_book: "Запис", nav_cta: "Записатися",

    hero_eyebrow: "ВАРШАВА · ЗАПИС НА ПРИЙОМ",
    hero_h1a: "Вії, створені",
    hero_h1em: "під твій",
    hero_h1b: "ритм життя.",
    hero_sub: "Індивідуальне картування, легкі матеріали, ефект 4–6 тижнів. Кожен набір підібраний під форму твоїх очей.",
    hero_cta_book: "Записатися",
    hero_cta_wa: "WhatsApp",
    hero_trust: "★ 4.9 · 500+ робіт · Майстер 6 років · Центр міста",

    svc_eyebrow: "ПОСЛУГИ",
    svc_h2: "Нарощування, ламінування, догляд.",
    svc_note: "Консультація включена. Алергічний тест за запитом.",
    svc_cta: "Вибрати дату",

    ba_eyebrow: "РЕЗУЛЬТАТ",
    ba_h2: "Відчуй різницю.",
    ba_before: "ДО",
    ba_after: "ПІСЛЯ",

    gal_eyebrow: "ОСТАННІ РОБОТИ",
    gal_h2: "Свіжі стилізації.",
    gal_sub: `Стеж за мною @${INSTAGRAM} →`,
    gal_quote: "Запис за місяць наперед.",

    test_eyebrow: "ВІДГУКИ",
    test_h2: "Що кажуть клієнтки.",
    testimonials: [
      { body: "Аліна — справжня художниця. Вперше в житті я відчуваю, що вії виглядають як мої власні — тільки красивіші. Ефект тримався повні чотири тижні.", name: "Оля К., Варшава" },
      { body: "Дуже професійний підхід і неймовірна увага до деталей. Аліна порадила мені ідеальний стиль під форму моїх очей. Ходжу регулярно вже рік.", name: "Дарія М., Варшава" },
      { body: "Нарешті знайшла майстра, який розуміє, що менше — значить більше. Класика 1:1 у Аліни виглядає як ідеальна туш — природно й елегантно.", name: "Катя В., Варшава" },
      { body: "Я з України, шукала майстра, з яким можна говорити українською. Аліна професійна й тепла, результати просто захопливі.", name: "Марія Т., Варшава" },
      { body: "Ламінування вій змінило моє щоденне життя — прокидаюся вранці, і вони вже виглядають ідеально. Студія елегантна й атмосферна. Дуже рекомендую.", name: "Єла С., Варшава" },
      { body: "Mega volume 4D — і я не можу відвести погляд від дзеркала! Аліна точно знає, як збалансувати драматичний ефект із природною красою.", name: "Софія Р., Варшава" },
    ],

    about_eyebrow: "МАЙСТЕР",
    about_h2: "Привіт, я Аліна.",
    about_p1: "Я сертифікована леш-майстриня з понад 6-річним досвідом, набутим у Варшаві та за кордоном. Закінчила LashBox LA з відзнакою — школу, визнану однією з найкращих у світі.",
    about_p2: "Я вірю, що гарні вії не привертають уваги до себе — вони підкреслюють погляд, який у тебе вже є. Кожен набір проектую індивідуально: складаю карту очей, раджу форму і підбираю товщину волоска під стан твоїх природних вій.",
    about_p3: "Приймаю клієнток польською, англійською, російською та українською. Студія в центрі Варшави. Напиши в WhatsApp — домовимося про консультацію.",
    about_chips: ["LashBox LA certified", "Sky Glue", "0.03–0.10 mm", "Cruelty-free"],

    faq_eyebrow: "FAQ",
    faq_h2: "Часті запитання.",
    faqs: [
      { q: "Як довго тримаються нарощені вії?", a: "Нарощені вії тримаються 4–6 тижнів залежно від природного циклу росту та догляду. Корекція кожні 2–3 тижні дозволяє підтримувати ефект постійно. Правильний догляд — без жирних продуктів і ніжне очищення — значно подовжує термін набору." },
      { q: "Чи боляче робити процедуру?", a: "Ні — процедура абсолютно безболісна. Ти лежиш із заплющеними очима, а я працюю на захисній наклейці під нижніми віями. Більшість клієнток засинають під час сеансу." },
      { q: "Як доглядати за віями після процедури?", a: "Перші 24 години уникай води, пари і жирних продуктів. Потім щодня промивай м'якою пінкою, розчісуй щіточкою і уникай жирної косметики поблизу очей. Спи на спині або на спеціальній подушці для вій." },
      { q: "Як часто потрібна корекція?", a: "Рекомендую корекцію кожні 2–3 тижні. Що рідше, то більше вій треба відновлювати і тим вища вартість. При регулярних візитах раз на 2 тижні набір завжди виглядає свіжим." },
      { q: "Чи можна фарбувати нарощені вії тушшю?", a: "Не рекомендую — нарощування саме дає той ефект, який туш дає природним віям. Якщо потрібно, наноси лише біля коренів природних вій, уникай водостійких формул і знімай обережно." },
      { q: "Скільки триває перший візит?", a: "Перший візит займає 90–120 хвилин залежно від набору: Класика 1:1 — близько 90 хвилин, Volume 2D-3D — близько 110 хвилин, Mega Volume — до 2 годин. Включно з первинною консультацією та обговоренням результату." },
    ],

    book_eyebrow: "ГОТОВА?",
    book_h2: "Створимо твої ідеальні вії.",
    book_booksy: "Записатися на Booksy",
    book_wa: "WhatsApp",
    book_custom: "Вибрати зручний час",

    modal_title: "Запит на час",
    modal_name: "Ім'я",
    modal_phone: "Телефон",
    modal_date: "Бажана дата",
    modal_svc: "Послуга",
    modal_msg: "Повідомлення (необов'язково)",
    modal_submit: "Надіслати запит",
    modal_ok: "Дякую! Напиши мені на пошту, щоб підтвердити запис.",
    modal_email_cta: "Написати на пошту",
    svc_opts: ["Класика 1:1", "Гібрид 1.5D", "Об'єм 2D-3D", "Мега-об'єм 4D-6D", "Ламінування + Ботокс вій", "Корекція", "Зняття"],

    wa_msg: "Привіт! Хочу записатися на нарощування вій.",

    alt_hero: "Макро-фотографія ока з ідеально нарощеними віями",
    alt_about: "Аліна — леш-майстриня, портрет у студії",
    alt_g: ["Класичне нарощування вій 1:1", "Об'ємні вії Volume 2D-3D", "Ламінування вій природний ефект", "Mega Volume 4D драматичний ефект", "Гібридна стилізація вій", "Студія нарощування вій Варшава"],
    alt_b: ["Вії до процедури — природні", "Вії до — короткі та світлі", "Око до ламінування вій"],
    alt_a: ["Вії після Classic 1:1", "Вії після — Volume 2D", "Око після ламінування вій"],

    footer_tag: "Варшава, Центр міста — запис на прийом",
    footer_cancel: "Політика скасування",
    footer_copy: `© 2026 ${BRAND}. Всі права захищені.`,

    aria_wa: "Написати в WhatsApp",
    aria_call: "Зателефонувати",
    aria_close: "Закрити вікно",
    aria_menu: "Відкрити меню",
    aria_slider: "Слайдер до/після — використовуй стрілки для переміщення",
  },
};

// ─── BEFORE/AFTER SLIDER ──────────────────────────────────────────────────────
function BeforeAfterSlider({ before, after, beforeAlt, afterAlt, beforeLabel, afterLabel }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const clamp = (v) => Math.min(100, Math.max(0, v));

  const computePos = useCallback((clientX) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      computePos(x);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [computePos]);

  const startDrag = (e) => {
    dragging.current = true;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    computePos(x);
    e.preventDefault();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPos(p => clamp(p - 5));
    if (e.key === 'ArrowRight') setPos(p => clamp(p + 5));
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-lg select-none cursor-ew-resize"
      style={{ aspectRatio: '16/10' }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      <img
        src={before} alt={beforeAlt} width={800} height={500}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <img
        src={after} alt={afterAlt} width={800} height={500}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div
        className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
        style={{ left: `${pos}%`, backgroundColor: '#FBFAF7' }}
      />
      <button
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:ring-offset-2 pointer-events-auto"
        style={{ left: `${pos}%`, backgroundColor: '#FBFAF7', border: '2px solid #1C1A17', cursor: 'ew-resize' }}
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <MoveHorizontal size={16} style={{ color: '#1C1A17' }} />
      </button>
      <span
        className="absolute top-3 left-3 text-xs font-medium tracking-widest px-2 py-1 rounded pointer-events-none"
        style={{ backgroundColor: 'rgba(28,26,23,0.65)', color: '#FBFAF7', fontFamily: 'Inter, sans-serif' }}
      >
        {beforeLabel}
      </span>
      <span
        className="absolute top-3 right-3 text-xs font-medium tracking-widest px-2 py-1 rounded pointer-events-none"
        style={{ backgroundColor: 'rgba(28,26,23,0.65)', color: '#FBFAF7', fontFamily: 'Inter, sans-serif' }}
      >
        {afterLabel}
      </span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LumaLashStudio() {
  const [lang, setLang]         = useState('pl');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen]   = useState(false);
  const [modalDone, setModalDone]   = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', svc: '', msg: '' });
  const [openFaq, setOpenFaq]   = useState(null);
  const [pairIdx, setPairIdx]   = useState(0);
  const [hoveredGal, setHoveredGal] = useState(null);

  const t = TEXT[lang];
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(t.wa_msg)}`;

  // ── Language from / to URL hash ──────────────────────────────────────────
  useEffect(() => {
    const read = () => {
      const m = window.location.hash.match(/lang=(\w{2})/);
      if (m && TEXT[m[1]]) setLang(m[1]);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const switchLang = (l) => {
    setLang(l);
    const hash = window.location.hash.replace(/#?lang=\w{2}&?/, '').replace(/^#/, '');
    window.location.hash = hash ? `lang=${l}&${hash}` : `lang=${l}`;
    document.documentElement.lang = l;
  };

  // ── SEO head injection ───────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta_title;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setProp = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setLinkTag = (rel, href, attrs = {}) => {
      const key = `${rel}-${href}`;
      let el = document.querySelector(`link[data-seo="${key}"]`);
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); el.setAttribute('data-seo', key); document.head.appendChild(el); }
      el.setAttribute('href', href);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    const localeMap = { pl: 'pl_PL', en: 'en_US', ru: 'ru_RU', uk: 'uk_UA' };

    setMeta('description', t.meta_desc);
    setMeta('keywords', t.meta_kw);
    setMeta('author', `${ARTIST} — ${BRAND}`);
    setMeta('robots', 'index, follow, max-image-preview:large');
    setMeta('theme-color', '#F5F1EA');

    const canonicalPath = lang === 'pl' ? '' : lang;
    setLinkTag('canonical', `${DOMAIN}/${canonicalPath}`);

    Object.entries({ pl: 'pl', en: 'en', ru: 'ru', uk: 'uk' }).forEach(([l, hl]) => {
      const path = l === 'pl' ? '' : l;
      setLinkTag('alternate', `${DOMAIN}/${path}`, { hreflang: hl, 'data-seo': `alternate-${l}` });
    });
    setLinkTag('alternate', DOMAIN, { hreflang: 'x-default', 'data-seo': 'alternate-default' });

    setProp('og:type', 'website');
    setProp('og:site_name', BRAND);
    setProp('og:title', t.meta_title);
    setProp('og:description', t.meta_desc);
    setProp('og:url', `${DOMAIN}/${canonicalPath}`);
    setProp('og:image', IMAGES.hero.replace('w=1200', 'w=1200&h=630'));
    setProp('og:locale', localeMap[lang]);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', t.meta_title);
    setMeta('twitter:description', t.meta_desc);
    setMeta('twitter:image', IMAGES.hero);

    // Preload LCP hero image
    let preload = document.querySelector('link[rel="preload"][as="image"]');
    if (!preload) { preload = document.createElement('link'); preload.rel = 'preload'; preload.as = 'image'; document.head.appendChild(preload); }
    preload.href = IMAGES.hero;

    // Favicon (inline SVG monogram)
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) { favicon = document.createElement('link'); favicon.rel = 'icon'; document.head.appendChild(favicon); }
    favicon.type = 'image/svg+xml';
    favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23F5F1EA'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='16' font-weight='600' fill='%231C1A17'>LL</text></svg>`;

    // JSON-LD BeautySalon schema
    const offerList = SERVICES.map((s, i) => ({
      "@type": "Offer",
      "position": i + 1,
      "itemOffered": { "@type": "Service", "name": s.pl, "description": s.desc_pl },
      "price": s.price.replace(/[^0-9]/g, '') || "140",
      "priceCurrency": "PLN",
    }));

    const salonSchema = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": BRAND,
      "image": [IMAGES.hero],
      "url": DOMAIN,
      "telephone": `+${PHONE}`,
      "priceRange": "150–280 PLN",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": ADDRESS_STREET,
        "addressLocality": ADDRESS_CITY,
        "postalCode": ADDRESS_POSTAL,
        "addressCountry": "PL"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": GEO_LAT, "longitude": GEO_LON },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }],
      "sameAs": [
        `https://www.instagram.com/${INSTAGRAM}`,
        `https://www.tiktok.com/@${TIKTOK}`
      ],
      "founder": { "@type": "Person", "name": ARTIST, "jobTitle": "Lash Artist" },
      "areaServed": { "@type": "City", "name": ADDRESS_CITY },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Stylizacja rzęs",
        "itemListElement": offerList
      },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": TEXT.pl.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    };

    const injectJsonLd = (id, schema) => {
      let el = document.getElementById(id);
      if (!el) { el = document.createElement('script'); el.id = id; el.type = 'application/ld+json'; document.head.appendChild(el); }
      el.textContent = JSON.stringify(schema, null, 2);
    };
    injectJsonLd('schema-salon', salonSchema);
    injectJsonLd('schema-faq', faqSchema);

    // LLM crawler comment block at top of body
    const commentText = `
  BUSINESS: ${BRAND}
  ARTIST: ${ARTIST} (Lash Artist, 6+ years experience, LashBox LA certified)
  LOCATION: ${ADDRESS_STREET}, ${ADDRESS_POSTAL} ${ADDRESS_CITY}, Poland (Śródmieście district)
  SERVICES: Classic 1:1 (180 PLN), Hybrid 1.5D (210 PLN), Volume 2D-3D (240 PLN), Mega Volume 4D-6D (280 PLN), Lash Lift + Botox (150 PLN), Infill from 140 PLN, Removal 50 PLN
  LANGUAGES: Polish, English, Russian, Ukrainian
  CONTACT: WhatsApp +${PHONE} | Instagram @${INSTAGRAM} | Email ${EMAIL}
  BOOKING: ${BOOKSY_URL}
  HOURS: Mon-Sat 09:00-20:00
  RATING: 4.9/5 (127 reviews, 500+ sets completed)
`;
    let commentNode = document.body.firstChild;
    if (!commentNode || commentNode.nodeType !== 8) {
      commentNode = document.createComment(commentText);
      document.body.insertBefore(commentNode, document.body.firstChild);
    } else {
      commentNode.textContent = commentText;
    }

    // Console factual summary for LLM/developer crawl testing
    console.info(`[${BRAND}] Business: ${BRAND} | Artist: ${ARTIST} | Location: ${ADDRESS_STREET}, ${ADDRESS_CITY} | Services: Classic 180PLN, Hybrid 210PLN, Volume 240PLN, Mega Volume 280PLN, Lash Lift 150PLN | Contact: +${PHONE} | IG: @${INSTAGRAM}`);

    // TODO: load gtag('config','G-XXXXXXX')
    // TODO: gtag('event', 'conversion', { send_to: 'AW-XXXX/YYYY' }) on book button click
    // TODO: gtag('event', 'conversion', { send_to: 'AW-XXXX/ZZZZ' }) on WhatsApp click
  }, [lang, t]);

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll reveal via IntersectionObserver ───────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // ── Modal keyboard (Escape + focus trap) ────────────────────────────────
  useEffect(() => {
    if (!modalOpen) return;
    const prevFocus = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'Tab') {
        const focusable = document.querySelectorAll('[data-modal] button, [data-modal] input, [data-modal] select, [data-modal] textarea');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const firstFocusable = document.querySelector('[data-modal] button, [data-modal] input');
    if (firstFocusable) firstFocusable.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      if (prevFocus) prevFocus.focus();
    };
  }, [modalOpen]);

  // ── Mobile menu close on route-change ───────────────────────────────────
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'services',    label: t.nav_svc },
    { id: 'gallery',     label: t.nav_gal },
    { id: 'before-after',label: t.nav_ba  },
    { id: 'testimonials',label: t.nav_test },
    { id: 'about',       label: t.nav_about },
    { id: 'book',        label: t.nav_book },
  ];

  // ── Modal submit ─────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!form.name || !form.phone) return;
    setModalDone(true);
  };
  const mailtoLink = () => {
    const subject = encodeURIComponent(`${BRAND} — ${form.svc || t.svc_opts[0]}`);
    const body = encodeURIComponent(`${t.modal_name}: ${form.name}\n${t.modal_phone}: ${form.phone}\n${t.modal_date}: ${form.date}\n${t.modal_svc}: ${form.svc}\n\n${form.msg}`);
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // BRAND COLORS (inline style shortcuts)
  const C = {
    bg:      '#F5F1EA',
    surface: '#FBFAF7',
    primary: '#1C1A17',
    muted:   '#6B635A',
    accent:  '#C8B6A0',
    border:  '#E8E1D6',
    wa:      '#25D366',
  };

  // Gallery tile bento layout classes
  const galClasses = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
  ];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: C.bg, color: C.primary, fontFamily: 'Inter, sans-serif' }}>

      {/* Font loading */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        *:focus-visible { outline: 2px solid #1C1A17; outline-offset: 2px; }
        .snap-x { scroll-snap-type: x mandatory; }
        .snap-start { scroll-snap-align: start; }
      `}</style>

      {/* ── STICKY HEADER ────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? C.surface : 'rgba(251,250,247,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Wordmark */}
          <a href="#hero" onClick={e => { e.preventDefault(); scrollTo('hero'); }}
            className="font-cormorant text-xl font-semibold tracking-wider"
            style={{ color: C.primary }}>
            LUMA LASH
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`}
                onClick={e => { e.preventDefault(); scrollTo(l.id); }}
                className="text-sm font-medium transition-colors hover:opacity-60"
                style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-1">
              {['pl','en','ru','uk'].map(l => (
                <button key={l}
                  onClick={() => switchLang(l)}
                  className="text-xs font-medium px-2 py-1 rounded transition-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: lang === l ? C.primary : 'transparent',
                    color: lang === l ? C.surface : C.muted,
                    border: `1px solid ${lang === l ? C.primary : C.accent}`,
                  }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA pill */}
            <button
              onClick={() => scrollTo('book')}
              className="hidden sm:block text-xs font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ backgroundColor: C.primary, color: C.surface, fontFamily: 'Inter, sans-serif' }}>
              {t.nav_cta}
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={t.aria_menu}
              aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} style={{ color: C.primary }} /> : <Menu size={22} style={{ color: C.primary }} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{ backgroundColor: C.surface, borderColor: C.border }}>
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
              {navLinks.map(l => (
                <a key={l.id} href={`#${l.id}`}
                  onClick={e => { e.preventDefault(); scrollTo(l.id); }}
                  className="text-base font-medium py-2 border-b"
                  style={{ color: C.primary, borderColor: C.border, fontFamily: 'Inter, sans-serif' }}>
                  {l.label}
                </a>
              ))}
              {/* Mobile language switcher */}
              <div className="flex gap-2 pt-2">
                {['pl','en','ru','uk'].map(l => (
                  <button key={l}
                    onClick={() => switchLang(l)}
                    className="text-xs font-medium px-3 py-1.5 rounded"
                    style={{
                      backgroundColor: lang === l ? C.primary : 'transparent',
                      color: lang === l ? C.surface : C.muted,
                      border: `1px solid ${lang === l ? C.primary : C.accent}`,
                    }}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-end pb-20 pt-16">
          {/* Background image */}
          <img
            src={IMAGES.hero}
            alt={t.alt_hero}
            width={1200} height={800}
            className="absolute inset-0 w-full h-full object-cover"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
          {/* Overlay */}
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28,26,23,0.38)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
            {/* Eyebrow */}
            <p className="text-xs font-medium tracking-widest mb-4"
              style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
              {t.hero_eyebrow}
            </p>

            {/* H1 */}
            <h1 className="font-cormorant font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6 max-w-4xl"
              style={{ color: C.surface }}>
              {t.hero_h1a}{' '}
              <em className="italic">{t.hero_h1em}</em>{' '}
              {t.hero_h1b}
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
              style={{ color: 'rgba(251,250,247,0.85)', fontFamily: 'Inter, sans-serif' }}>
              {t.hero_sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => scrollTo('book')}
                className="px-7 py-3 rounded-full font-medium text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: C.primary, color: C.surface, fontFamily: 'Inter, sans-serif' }}>
                {t.hero_cta_book}
              </button>
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="px-7 py-3 rounded-full font-medium text-sm transition-opacity hover:opacity-80 border"
                style={{ color: C.surface, borderColor: 'rgba(251,250,247,0.5)', fontFamily: 'Inter, sans-serif' }}>
                {t.hero_cta_wa}
              </a>
            </div>

            {/* Trust strip */}
            <p className="text-xs tracking-wide"
              style={{ color: 'rgba(251,250,247,0.65)', fontFamily: 'Inter, sans-serif' }}>
              {t.hero_trust}
            </p>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <section id="services" className="py-20 sm:py-28" style={{ backgroundColor: C.surface }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6" data-reveal>
            <p className="text-xs font-medium tracking-widest mb-4"
              style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
              {t.svc_eyebrow}
            </p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal mb-12"
              style={{ color: C.primary }}>
              {t.svc_h2}
            </h2>

            <div className="divide-y" style={{ borderColor: C.border }}>
              {SERVICES.map((s, i) => (
                <div key={i} className="flex items-start justify-between py-5 gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant text-2xl font-normal mb-1"
                      style={{ color: C.primary }}>
                      {lang === 'pl' ? s.pl : s.en}
                    </p>
                    <p className="text-sm leading-relaxed"
                      style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                      {lang === 'pl' ? s.desc_pl : s.desc_en}
                    </p>
                  </div>
                  <span className="font-cormorant text-xl font-normal whitespace-nowrap pt-1 flex-shrink-0"
                    style={{ color: C.primary }}>
                    {s.price}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm mt-8 mb-8" style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
              {t.svc_note}
            </p>
            <button
              onClick={() => scrollTo('book')}
              className="px-7 py-3 rounded-full font-medium text-sm border transition-opacity hover:opacity-70"
              style={{ borderColor: C.primary, color: C.primary, fontFamily: 'Inter, sans-serif' }}>
              {t.svc_cta}
            </button>
          </div>
        </section>

        {/* ── BEFORE/AFTER ─────────────────────────────────────────────── */}
        <section id="before-after" className="py-20 sm:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6" data-reveal>
            <p className="text-xs font-medium tracking-widest mb-4"
              style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
              {t.ba_eyebrow}
            </p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal mb-10"
              style={{ color: C.primary }}>
              {t.ba_h2}
            </h2>

            <BeforeAfterSlider
              before={IMAGES.pairs[pairIdx].before}
              after={IMAGES.pairs[pairIdx].after}
              beforeAlt={t.alt_b[pairIdx]}
              afterAlt={t.alt_a[pairIdx]}
              beforeLabel={t.ba_before}
              afterLabel={t.ba_after}
            />
            <p className="text-xs mt-3 text-center" style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
              {t.aria_slider}
            </p>

            {/* Thumbnail pair selectors */}
            <div className="flex gap-3 mt-6 justify-center">
              {IMAGES.pairs.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPairIdx(i)}
                  className="rounded-md overflow-hidden transition-all"
                  style={{
                    width: 72, height: 48,
                    border: `2px solid ${pairIdx === i ? C.primary : C.border}`,
                    opacity: pairIdx === i ? 1 : 0.55,
                  }}
                  aria-label={`Pair ${i + 1}`}
                >
                  <img src={p.after} alt={t.alt_a[i]} width={72} height={48}
                    className="w-full h-full object-cover"
                    onError={e => { e.currentTarget.style.display = 'none'; }} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────────────── */}
        <section id="gallery" className="py-20 sm:py-28" style={{ backgroundColor: C.surface }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6" data-reveal>
            <p className="text-xs font-medium tracking-widest mb-4"
              style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
              {t.gal_eyebrow}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
              <h2 className="font-cormorant text-4xl sm:text-5xl font-normal" style={{ color: C.primary }}>
                {t.gal_h2}
              </h2>
              <a
                href={`https://www.instagram.com/${INSTAGRAM}`}
                target="_blank" rel="noopener noreferrer"
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                {t.gal_sub}
              </a>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-48">
              {IMAGES.gallery.map((src, i) => (
                <a
                  key={i}
                  href={`https://www.instagram.com/${INSTAGRAM}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`relative overflow-hidden rounded-md ${galClasses[i] || ''}`}
                  style={{ height: i === 0 ? 320 : 160 }}
                  onMouseEnter={() => setHoveredGal(i)}
                  onMouseLeave={() => setHoveredGal(null)}
                >
                  <img
                    src={src} alt={t.alt_g[i]} width={800} height={500}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                  {hoveredGal === i && (
                    <div className="absolute inset-0 flex items-center justify-center gap-4 transition-all"
                      style={{ backgroundColor: 'rgba(28,26,23,0.45)' }}>
                      <span className="flex items-center gap-1 text-sm font-medium"
                        style={{ color: C.surface, fontFamily: 'Inter, sans-serif' }}>
                        <Heart size={16} /> {87 + i * 31}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium"
                        style={{ color: C.surface, fontFamily: 'Inter, sans-serif' }}>
                        <MessageCircle size={16} /> {4 + i * 3}
                      </span>
                    </div>
                  )}
                </a>
              ))}

              {/* Editorial quote tile */}
              <a
                href={`#book`}
                onClick={e => { e.preventDefault(); scrollTo('book'); }}
                className="relative rounded-md flex items-center justify-center p-6 cursor-pointer col-span-1 row-span-1"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, height: 160 }}>
                <p className="font-cormorant text-2xl italic text-center leading-snug"
                  style={{ color: C.primary }}>
                  "{t.gal_quote}"
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section id="testimonials" className="py-20 sm:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6" data-reveal>
            <p className="text-xs font-medium tracking-widest mb-4"
              style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
              {t.test_eyebrow}
            </p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal mb-12"
              style={{ color: C.primary }}>
              {t.test_h2}
            </h2>

            {/* Desktop: 3-col grid; Mobile: scroll-snap row */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {t.testimonials.map((r, i) => (
                <article key={i} className="rounded-xl p-7 flex flex-col gap-4"
                  style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={13} fill={C.accent} style={{ color: C.accent }} />
                    ))}
                  </div>
                  <p className="font-cormorant italic text-xl leading-relaxed flex-1"
                    style={{ color: C.primary }}>
                    "{r.body}"
                  </p>
                  <p className="text-xs font-medium" style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                    — {r.name}
                  </p>
                </article>
              ))}
            </div>

            {/* Mobile scroll-snap */}
            <div className="md:hidden flex gap-4 overflow-x-auto snap-x pb-4 -mx-4 px-4">
              {t.testimonials.map((r, i) => (
                <article key={i}
                  className="snap-start flex-shrink-0 w-80 rounded-xl p-6 flex flex-col gap-4"
                  style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={13} fill={C.accent} style={{ color: C.accent }} />
                    ))}
                  </div>
                  <p className="font-cormorant italic text-lg leading-relaxed flex-1"
                    style={{ color: C.primary }}>
                    "{r.body}"
                  </p>
                  <p className="text-xs font-medium" style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                    — {r.name}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section id="about" className="py-20 sm:py-28" style={{ backgroundColor: C.surface }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6" data-reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Portrait */}
              <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img
                  src={IMAGES.about}
                  alt={t.alt_about}
                  width={600} height={750}
                  className="w-full h-full object-cover"
                  onError={e => { e.currentTarget.parentElement.style.backgroundColor = C.bg; e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Copy */}
              <div>
                <p className="text-xs font-medium tracking-widest mb-4"
                  style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
                  {t.about_eyebrow}
                </p>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-normal mb-6"
                  style={{ color: C.primary }}>
                  {t.about_h2}
                </h2>
                <p className="text-base leading-relaxed mb-4"
                  style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                  {t.about_p1}
                </p>
                <p className="text-base leading-relaxed mb-4"
                  style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                  {t.about_p2}
                </p>
                <p className="text-base leading-relaxed mb-8"
                  style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                  {t.about_p3}
                </p>

                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {t.about_chips.map((chip, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full border"
                      style={{ borderColor: C.accent, color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="py-20 sm:py-28" style={{ backgroundColor: C.bg }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6" data-reveal>
            <p className="text-xs font-medium tracking-widest mb-4"
              style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
              {t.faq_eyebrow}
            </p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal mb-12"
              style={{ color: C.primary }}>
              {t.faq_h2}
            </h2>

            <div className="divide-y" style={{ borderColor: C.border }}>
              {t.faqs.map((f, i) => (
                <details
                  key={i}
                  open={openFaq === i}
                  className="group py-5"
                  onToggle={e => {
                    if (e.currentTarget.open) setOpenFaq(i);
                    else if (openFaq === i) setOpenFaq(null);
                  }}
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    <h3 className="text-base font-medium leading-snug" style={{ color: C.primary }}>
                      {f.q}
                    </h3>
                    <span className="flex-shrink-0">
                      {openFaq === i
                        ? <ChevronUp size={18} style={{ color: C.muted }} />
                        : <ChevronDown size={18} style={{ color: C.muted }} />}
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-relaxed"
                    style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING ──────────────────────────────────────────────────── */}
        <section id="book" className="py-24 sm:py-32" style={{ backgroundColor: C.primary }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center" data-reveal>
            <p className="text-xs font-medium tracking-widest mb-4"
              style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
              {t.book_eyebrow}
            </p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal mb-12"
              style={{ color: C.surface }}>
              {t.book_h2}
            </h2>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {/* Booksy */}
              <a
                href={BOOKSY_URL}
                target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-medium text-sm border transition-opacity hover:opacity-75"
                style={{ borderColor: C.surface, color: C.surface, fontFamily: 'Inter, sans-serif' }}>
                {t.book_booksy}
              </a>

              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-medium text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: C.wa, color: '#fff', fontFamily: 'Inter, sans-serif' }}>
                {t.book_wa}
              </a>

              {/* Custom appointment */}
              <button
                onClick={() => { setModalOpen(true); setModalDone(false); setForm({ name:'', phone:'', date:'', svc:'', msg:'' }); }}
                className="px-8 py-4 rounded-full font-medium text-sm border transition-opacity hover:opacity-75"
                style={{ borderColor: C.accent, color: C.accent, fontFamily: 'Inter, sans-serif' }}>
                {t.book_custom}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: C.surface, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Left */}
            <div>
              <p className="font-cormorant text-xl font-semibold tracking-wider mb-2"
                style={{ color: C.primary }}>
                {BRAND}
              </p>
              <p className="text-sm mb-3" style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                {t.footer_tag}
              </p>
              <address className="text-sm not-italic" style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                {ADDRESS_STREET}, {ADDRESS_POSTAL} {ADDRESS_CITY}
              </address>
            </div>

            {/* Middle */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2">
                {navLinks.map(l => (
                  <li key={l.id}>
                    <a href={`#${l.id}`}
                      onClick={e => { e.preventDefault(); scrollTo(l.id); }}
                      className="text-sm transition-opacity hover:opacity-60"
                      style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#policy" className="text-sm transition-opacity hover:opacity-60"
                    style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
                    {t.footer_cancel}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Right */}
            <div>
              <p className="text-xs font-medium tracking-widest mb-4"
                style={{ color: C.accent, fontFamily: 'Inter, sans-serif' }}>
                SOCIAL
              </p>
              <div className="flex gap-4">
                <a href={`https://www.instagram.com/${INSTAGRAM}`}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram" className="transition-opacity hover:opacity-60">
                  <Instagram size={22} style={{ color: C.muted }} />
                </a>
                <a href={`https://www.tiktok.com/@${TIKTOK}`}
                  target="_blank" rel="noopener noreferrer"
                  aria-label="TikTok" className="transition-opacity hover:opacity-60">
                  <Music2 size={22} style={{ color: C.muted }} />
                </a>
                <a href={`mailto:${EMAIL}`}
                  aria-label="Email" className="transition-opacity hover:opacity-60">
                  <Mail size={22} style={{ color: C.muted }} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t" style={{ borderColor: C.border }}>
            <p className="text-xs text-center" style={{ color: C.muted, fontFamily: 'Inter, sans-serif' }}>
              {t.footer_copy}
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP ─────────────────────────────────────────────── */}
      <a
        href={waUrl}
        target="_blank" rel="noopener noreferrer"
        aria-label={t.aria_wa}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 md:bottom-6"
        style={{ width: 56, height: 56, backgroundColor: C.wa }}>
        <MessageCircle size={26} color="#fff" />
      </a>

      {/* ── FLOATING CALL (mobile only) ───────────────────────────────────── */}
      <a
        href={`tel:+${PHONE}`}
        aria-label={t.aria_call}
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 md:hidden"
        style={{ width: 56, height: 56, backgroundColor: C.primary }}>
        <Phone size={24} color={C.surface} />
      </a>

      {/* ── MODAL ─────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label={t.modal_title}
          data-modal
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-8 shadow-2xl"
            style={{ backgroundColor: C.surface }}>
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full transition-opacity hover:opacity-60"
              aria-label={t.aria_close}>
              <X size={20} style={{ color: C.muted }} />
            </button>

            <h3 className="font-cormorant text-2xl font-normal mb-6" style={{ color: C.primary }}>
              {t.modal_title}
            </h3>

            {!modalDone ? (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder={t.modal_name}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  autoComplete="given-name"
                  className="w-full px-4 py-3 rounded-lg text-sm border focus:outline-none focus:ring-1"
                  style={{
                    borderColor: C.border,
                    backgroundColor: C.bg,
                    color: C.primary,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder={t.modal_phone}
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  autoComplete="tel"
                  className="w-full px-4 py-3 rounded-lg text-sm border focus:outline-none focus:ring-1"
                  style={{
                    borderColor: C.border,
                    backgroundColor: C.bg,
                    color: C.primary,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <input
                  type="date"
                  placeholder={t.modal_date}
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg text-sm border focus:outline-none focus:ring-1"
                  style={{
                    borderColor: C.border,
                    backgroundColor: C.bg,
                    color: C.primary,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <select
                  value={form.svc}
                  onChange={e => setForm(f => ({ ...f, svc: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg text-sm border focus:outline-none focus:ring-1"
                  style={{
                    borderColor: C.border,
                    backgroundColor: C.bg,
                    color: form.svc ? C.primary : C.muted,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <option value="">{t.modal_svc}</option>
                  {t.svc_opts.map((o, i) => <option key={i} value={o}>{o}</option>)}
                </select>
                <textarea
                  rows={3}
                  placeholder={t.modal_msg}
                  value={form.msg}
                  onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg text-sm border focus:outline-none focus:ring-1 resize-none"
                  style={{
                    borderColor: C.border,
                    backgroundColor: C.bg,
                    color: C.primary,
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.phone}
                  className="w-full py-3 rounded-full font-medium text-sm mt-2 transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: C.primary, color: C.surface, fontFamily: 'Inter, sans-serif' }}>
                  {t.modal_submit}
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="font-cormorant text-xl mb-6" style={{ color: C.primary }}>
                  {t.modal_ok}
                </p>
                <a
                  href={mailtoLink()}
                  className="px-7 py-3 rounded-full font-medium text-sm inline-block border transition-opacity hover:opacity-70"
                  style={{ borderColor: C.primary, color: C.primary, fontFamily: 'Inter, sans-serif' }}>
                  {t.modal_email_cta}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
