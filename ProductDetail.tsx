import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { catalogData } from "./Catalog";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const productId = id ? parseInt(id) : null;
  
  let product = null;
  for (const block of catalogData) {
    product = block.products.find((p) => p.id === productId);
    if (product) break;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h1>
          <button
            onClick={() => navigate("/catalog")}
            className="text-blue-600 hover:text-blue-700"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product!);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate("/catalog")}
          className="text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Назад к каталогу
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Изображение */}
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Информация */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="mb-6">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price} ₴
                  </span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.oldPrice} ₴
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-green-500 text-white rounded px-2 py-1 text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:translate-y-px mb-6"
              >
                Добавить в корзину
              </button>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Описание</h2>
                <p className="text-gray-600">
                  {product.title} - качественный товар по выгодной цене.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

