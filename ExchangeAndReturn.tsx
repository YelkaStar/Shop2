// src/pages/ExchangeAndReturn.tsx

export default function ExchangeAndReturn() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto">
        {/* карточка с контентом */}
        <div className="bg-white rounded-xl border border-gray-200 px-10 py-8 shadow-sm">
          <h1 className="text-2xl font-semibold mb-6">
            Обмен и возврат
          </h1>

          <ul className="list-disc pl-6 space-y-3 text-gray-800 leading-relaxed">
            <li>
              В соответствии с законодательством о защите прав потребителей возврат
              цифровых товаров надлежащего и ненадлежащего качества не предусмотрен.
            </li>
            <li>
              Услуги в электронной среде и нематериальные товары / продукты цифрового
              контента (игры, CD-ключи, предоплаченные подарочные карты и т.п.)
              не подлежат отмене и возврату после оплаты.
            </li>
            <li>
              Совершая покупку на нашем сайте, пользователь соглашается с данными
              условиями.
            </li>
            <li>
              Цифровые товары не подлежат возврату или обмену. После покупки нет права
              требовать возврат средств или обмен на другой товар.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
