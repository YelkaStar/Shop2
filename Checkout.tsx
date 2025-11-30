// Checkout.tsx
import type { FC, FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const Checkout: FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  const total = getTotalPrice();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("Новый заказ:", {
      name,
      phone,
      email,
      paymentMethod,
      items,
      total,
    });

    clearCart();
    navigate("/order-success");
  };

  if (!items.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Оформление заказа</h1>
        <p>Ваша корзина пуста.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Оформление заказа</h1>

      {/* Товары */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Ваш заказ</h2>
        <div className="border rounded-lg divide-y">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex justify-between items-center px-4 py-2 text-sm"
            >
              <div>
                <div className="font-medium">{product.title}</div>
                <div className="text-gray-500">
                  {quantity} шт × {product.price} ₴
                </div>
              </div>
              <div className="font-semibold">
                {product.price * quantity} ₴
              </div>
            </div>
          ))}
          <div className="flex justify-between px-4 py-3 font-semibold">
            <span>Итого</span>
            <span>{total} ₴</span>
          </div>
        </div>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">
              Имя и фамилия
            </label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Телефон</label>
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">
              E-mail (для чека)
            </label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Способ оплаты */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Способ оплаты</h2>
            <label className="flex items-center gap-2 text-sm mb-2">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span>Банковская карта онлайн</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Оплата при получении (как заглушка)</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700"
          >
            Подтвердить заказ
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
