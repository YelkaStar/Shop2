import { useState } from "react";
import LanguageMenu from "../Languagemenu/LanguageMenu";
import type { Lang } from "../Languagemenu/Language/Boogers";
import { Link, useNavigate } from "react-router-dom";
import globe from "../assets/3211274.png";
import globe2 from "../assets/KARTINTA.png";
import CartWidget from "../components/CartWidget";

type Props = {
  t: (k: string) => string;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onAccountClick: () => void;
  onCartClick: () => void;
};

export default function Starting({
  t,
  lang,
  onLangChange,
  onAccountClick,
  onCartClick,
}: Props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) return;
    navigate(`/catalog?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="bg-gray-100 ">
      <div className="max-w-8xl mx-auto h-14 px-6 flex items-center gap-6 text-[15px] text-gray-600">
        <Link className="hover:text-black" to="/about">
          {t("top.about")}
        </Link>
        <Link className="hover:text-black" to="/delivery">
          {t("top.delivery")}
        </Link>
        <Link className="hover:text-black" to="/exchange">
          {t("top.return")}
        </Link>
        <Link className="hover:text-black" to="/contacts">
          {t("top.contacts")}
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <LanguageMenu lang={lang} onChange={onLangChange} />
          <button
            type="button"
            className="hover:text-black"
            onClick={onAccountClick}
          >
            {t("top.account")}
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-50">
        {/* полоса на всю ширину */}
        <div className="max-w-5xl mx-auto h-18 px-20 flex items-center gap-6 bg-gray-50">
          <Link to="/catalog">
            <img src={globe} alt="Каталог" className="h-12 w-12" />
          </Link>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg
             bg-blue-600 text-white font-semibold shadow-sm
             hover:bg-blue-700 focus:outline-none
             focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
             active:translate-y-px"
          >
            <img
              src={globe2}
              alt=""
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
            />
            Каталог товаров
          </Link>

          {/* ПОИСК */}
          <form
            role="search"
            className="w-[420px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <label htmlFor="q" className="sr-only">
              Поиск
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="q"
                type="search"
                placeholder="Найдите свои товары здесь"
                className="h-10 w-full rounded-xl border border-gray-300 bg-white
                 pl-10 pr-3 text-sm placeholder:text-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </form>

          <CartWidget onOpen={onCartClick} />
        </div>
      </div>
    </div>
  );
}
