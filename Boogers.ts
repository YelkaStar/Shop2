export type Lang = "ru" | "ua" | "en";

export const tr: Record<Lang, Record<string, string>> = {
  ru: {
    "top.about": "Про нас",
    "top.delivery": "Доставка и оплата",
    "top.return": "Обмен и возврат",
    "top.contacts": "Контакты",
    "top.account": "Личный кабинет",
  },
  ua: {
    "top.about": "Про нас",
    "top.delivery": "Доставка та оплата",
    "top.return": "Обмін і повернення",
    "top.contacts": "Контакти",
    "top.account": "Особистий кабінет",
  },
  en: {
    "top.about": "About",
    "top.delivery": "Delivery & Payment",
    "top.return": "Exchange & Returns",
    "top.contacts": "Contacts",
    "top.account": "Account",
  },
};
