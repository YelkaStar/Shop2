import { useCart } from "../contexts/CartContext";

type Props = {
  onOpen: () => void;
};

export default function CartWidget({ onOpen }: Props) {
  const { getTotalCount, getTotalPrice } = useCart();
  const count = getTotalCount();
  const total = getTotalPrice();

  return (
    <button
      onClick={onOpen}
      aria-label="Корзина"
      className="inline-flex items-center justify-center
                 rounded-2xl bg-gray-50 px-4 py-4 text-center
                 shadow-sm hover:shadow transition-shadow"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h3l2.6 12.3a2 2 0 0 0 2 1.7h9.8a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          {count > 0 && (
            <span
              className="absolute -right-2 -top-2
                         h-5 w-5 rounded-full bg-blue-600
                         text-white text-xs font-semibold
                         flex items-center justify-center"
            >
              {count}
            </span>
          )}
        </div>
        <div className="mt-0 text-sm font-semibold text-black">
          {total} ₴
        </div>
      </div>
    </button>
  );
}