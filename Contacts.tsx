export default function Contacts() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Верхний блок с контактами и временем работы */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-sm text-gray-700">
          <div className="font-semibold mb-2">
            Gamazey.com.ua — Интернет-магазин лицензионных игр
          </div>

          <div className="space-y-1">
            <div>
              <span className="font-semibold">Email: </span>
              <a href="mailto:support@gamazey.com.ua" className="text-blue-600">
                support@gamazey.com.ua
              </a>
            </div>
            <div>
              <span className="font-semibold">Telegram: </span>
              <a href="https://t.me/gamazey" className="text-blue-600">
                @gamazey
              </a>
            </div>
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-1">Время работы</div>
            <div>Пн–пт: 10:00 – 18:00</div>
            <div>Сб–вс: выходной</div>
          </div>
        </div>

        {/* Карточка с формой обратной связи */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-xl mx-auto">
          <h2 className="text-center text-sm font-semibold mb-6">
            Если у вас есть вопрос, заполните форму обратной связи:
          </h2>

          <form className="space-y-4">
            {/* Имя */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                * Ваше имя
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ваше имя"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                * Адрес эл. почты
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Адрес эл. почты"
              />
            </div>

            {/* Запрос */}
            <div>
              <label className="block text-xs font-semibold mb-1">
                * Запрос
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                           h-32 resize-none
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Опишите ваш вопрос"
              />
            </div>

            {/* Заглушка под reCAPTCHA */}
            <div>
              <div className="text-xs font-semibold mb-1">Я не робот</div>
              <div className="h-16 w-full border border-gray-300 rounded bg-gray-50
                              flex items-center justify-center text-xs text-gray-400">
                Здесь будет reCAPTCHA
              </div>
            </div>

            {/* Чекбокс с правилами */}
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <input type="checkbox" className="mt-0.5" />
              <span>
                Я прочитал <a href="#" className="text-blue-600">Правила и условия</a> и согласен с ними
              </span>
            </div>

            {/* Кнопка отправки */}
            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold
                           rounded hover:bg-blue-700 transition-colors"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}