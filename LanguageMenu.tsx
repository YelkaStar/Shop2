import { useState } from "react";
import type { Lang } from "./Boogers"; // путь проверь

type Props = {
  lang: Lang;                    // текущий язык
  onChange: (l: Lang) => void;   // функция смены языка
};

export default function LanguageMenu({ lang, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
      >
        <span className="uppercase">{lang}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-40 rounded border bg-white shadow p-1">
          <button className="block w-full text-left px-2 py-1" onClick={() => { onChange("ua"); setOpen(false); }}>Українська</button>
          <button className="block w-full text-left px-2 py-1" onClick={() => { onChange("ru"); setOpen(false); }}>Русский</button>
          <button className="block w-full text-left px-2 py-1" onClick={() => { onChange("en"); setOpen(false); }}>English</button>
        </div>
      )}
    </div>
  );
}
