import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
const globe3 = "https://via.placeholder.com/200";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number; // % скидки
};

type CategoryBlock = {
  name: string;
  products: Product[];
};

// Все новые разделы добавляй в КОНЕЦ массива catalogData
const catalogData: CategoryBlock[] = [
  {
    name: "Roblox",
    products: [
      {
        id: 1,
        title: "800 Robux Roblox Gift Card",
        image: "/images/robux-800.jpg",
        price: 499,
        oldPrice: 799,
        discount: 38,
      },
      {
        id: 2,
        title: "1000 Robux Roblox Gift Card",
        image: "/images/robux-1000.jpg",
        price: 549,
        oldPrice: 899,
        discount: 45,
      },
      {
        id: 3,
        title: "1500 Robux Roblox Gift Card",
        image: "/images/robux-1000.jpg",
        price: 549,
        oldPrice: 899,
        discount: 45,
      },
      {
        id: 4,
        title: "2000 Robux Roblox Gift Card",
        image: "/images/robux-1000.jpg",
        price: 549,
        oldPrice: 899,
        discount: 45,
      },
      {
        id: 5,
        title: "5000 Robux Roblox Gift Card",
        image: "/images/robux-1000.jpg",
        price: 549,
        oldPrice: 899,
        discount: 45,
      },
    ],
  },
  {
    name: "Steam",
    products: [
      {
        id: 10,
        title: "Игра Project Zomboid (Steam ключ)",
        image: "/images/zomboid.jpg",
        price: 299,
        oldPrice: 415,
        discount: 28,
      },
      {
        id: 11,
        title: "Игра Rust (Steam ключ)",
        image: "/images/squad.jpg",
        price: 499,
        oldPrice: 959,
        discount: 48,
      },
      {
        id: 12,
        title: "Игра Squad (Steam ключ)",
        image: "/images/squad.jpg",
        price: 499,
        oldPrice: 959,
        discount: 48,
      },
      {
        id: 13,
        title: "Игра DayZ (Steam ключ)",
        image: "/images/squad.jpg",
        price: 499,
        oldPrice: 959,
        discount: 48,
      },
      {
        id: 14,
        title: "Игра Arma 3 (Steam ключ)",
        image: "/images/squad.jpg",
        price: 499,
        oldPrice: 959,
        discount: 48,
      },
    ],
  },
  {
    name: "PlayStation",
    products: [
      {
        id: 20,
        title: "PlayStation Store Card 20 USD",
        image: globe3,
        price: 599,
        oldPrice: 799,
        discount: 25,
      },
      {
        id: 21,
        title: "PlayStation Store Card 20 USD",
        image: globe3,
        price: 599,
        oldPrice: 799,
        discount: 25,
      },
      {
        id: 22,
        title: "PlayStation Store Card 20 USD",
        image: globe3,
        price: 599,
        oldPrice: 799,
        discount: 25,
      },
      {
        id: 23,
        title: "PlayStation Store Card 20 USD",
        image: globe3,
        price: 599,
        oldPrice: 799,
        discount: 25,
      },
      {
        id: 24,
        title: "PlayStation Store Card 20 USD",
        image: globe3,
        price: 599,
        oldPrice: 799,
        discount: 25,
      },
    ],
  },
  // 👇 новые разделы добавляешь сюда
];

const Catalog: FC = () => {
  // читаем ?search= из URL
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").toLowerCase().trim();

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {catalogData.map((block) => {
          // фильтруем товары в категории
          const filteredProducts = block.products.filter((p) => {
            if (!searchQuery) return true; // если поиска нет, показываем всё
            return p.title.toLowerCase().includes(searchQuery);
          });

          // если ни одного товара в этой категории не подходит под поиск — пропускаем секцию
          if (filteredProducts.length === 0) return null;

          return (
            <section key={block.name}>
              {/* Заголовок категории */}
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {block.name}
              </h2>
              <div className="h-[2px] w-16 bg-blue-500 mb-6" />

              {/* Сетка: максимум 5 карточек в строке */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((p) => (
                  <article
                    key={p.id}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
                  >
                    {/* Картинка товара */}
                    <div className="relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-52 object-cover"
                      />
                    </div>

                    {/* Описание + цена */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-3">
                        {p.title}
                      </h3>

                      <div className="mt-auto">
                        <div className="flex items-end gap-2">
                          <span className="text-lg font-semibold text-gray-900">
                            {p.price} ₴
                          </span>

                          {p.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {p.oldPrice} ₴
                            </span>
                          )}

                          {p.discount && (
                            <span className="text-xs bg-green-500 text-white rounded px-1.5 py-0.5">
                              -{p.discount}%
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            console.log("Добавить в корзину", p.id)
                          }
                          className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg
                                   bg-blue-600 text-white text-sm font-medium py-2
                                   hover:bg-blue-700 active:translate-y-[1px]"
                        >
                          В корзину
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
