import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
};

export default function CartModal({ onClose }: Props) {
  const { items, removeFromCart, updateQuantity, getTotalCount, getTotalPrice } = useCart();
  const totalCount = getTotalCount();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    onClose();              // закрываем модалку
    navigate("/checkout");  // переходим на страницу оформления
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">КОРЗИНА</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Сводка */}
        <div className="p-6 text-center border-b bg-gray-50">
          <p className="text-gray-600 mb-1">
            В корзине {totalCount}{" "}
            {totalCount === 1
              ? "товар"
              : totalCount < 5
              ? "товара"
              : "товаров"}
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            на сумму {totalPrice} ₴
          </p>
          {/* Пока кнопка "Перейти в корзину" ничего не делает.
              Можно потом тоже вести на /checkout или на отдельную страницу /cart */}
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Перейти в корзину
          </button>
        </div>

        {/* Список товаров */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Корзина пуста</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  {/* Изображение */}
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Информация о товаре */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      {item.product.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.product.price} ₴
                    </p>
                  </div>

                  {/* Счетчик количества */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-600"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        updateQuantity(item.product.id, val);
                      }}
                      className="w-12 h-8 text-center border border-gray-300 rounded"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center text-gray-600"
                    >
                      +
                    </button>
                  </div>

                  {/* Кнопка удаления */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    aria-label="Удалить"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Кнопки внизу */}
        {items.length > 0 && (
          <div className="p-6 border-t flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300"
            >
              Продолжить покупки
            </button>
            <button
              type="button"
              onClick={handleCheckoutClick}
              className="flex-1 py-3 px-4 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900"
            >
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
