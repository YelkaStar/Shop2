// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 
                      grid gap-8 md:grid-cols-4 text-sm text-gray-700">
        {/* 1. Подписка на новости */}
        <div>
          <h3 className="font-semibold mb-3">Подписывайтесь на новости</h3>
          {/* здесь input, кнопка, чекбокс — сделаешь как тебе нужно */}
        </div>

        {/* 2. Время работы */}
        <div>
          <h3 className="font-semibold mb-3">Время работы</h3>
          {/* текст про Пн–Пт, Сб–Вс и т.п. */}
        </div>

        {/* 3. Популярное */}
        <div>
          <h3 className="font-semibold mb-3">Популярное</h3>
          {/* список ссылок Steam, EA и т.д. */}
        </div>

        {/* 4. Информация */}
        <div>
          <h3 className="font-semibold mb-3">Информация</h3>
          {/* ссылки "О нас", "Оплата и доставка" и т.п. */}
        </div>
      </div>

      {/* нижняя полоска с копирайтом */}
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        Gamazey.com.ua — Интернет-магазин лицензионных игр © 2025
      </div>
    </footer>
  );
}
