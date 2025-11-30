import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { key: "cabinet",   label: "Личный кабинет",          color: "bg-purple-500", icon: "📋" },
  { key: "profile",   label: "Изменить профиль",        color: "bg-gray-700",   icon: "✏️" },
  { key: "password",  label: "Пароль",                  color: "bg-green-500",  icon: "🔒" },
  { key: "notify",    label: "Уведомить о наличии",     color: "bg-green-500",  icon: "🛒" },
  { key: "fav",       label: "Закладки",                color: "bg-red-500",    icon: "❤" },
  { key: "history",   label: "История покупок",         color: "bg-green-500",  icon: "🛍" },
  { key: "bonus",     label: "Бонусные баллы",          color: "bg-purple-500", icon: "🎁" },
  { key: "payments",  label: "Транзакции",              color: "bg-orange-500", icon: "💳" },
  { key: "partner",   label: "Партнёрская программа",   color: "bg-gray-700",   icon: "💲" },
  { key: "logout",    label: "Выход",                   color: "bg-black",      icon: "⏻" },
] as const;

type MenuKey = (typeof menuItems)[number]["key"];

type Profile = {
  fullName: string;
  email: string;
  phone: string;
};

type Order = {
  id: string;
  date: string;
  total: number;
  itemsCount: number;
  status: string;
};

export default function PersonalAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MenuKey>("cabinet");

  // Профиль — храним в localStorage, чтобы не пропадал при обновлении страницы
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      try {
        return JSON.parse(saved) as Profile;
      } catch {
        // игнорируем
      }
    }
    return {
      fullName: "",
      email: "",
      phone: "",
    };
  });

  // История заказов — тоже берём из localStorage (можно писать туда из Checkout)
  const [orders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    if (saved) {
      try {
        return JSON.parse(saved) as Order[];
      } catch {
        // игнорируем
      }
    }
    return [];
  });

  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  // Если нет токена — выкидываем с /account на главную
// проверка при входе в кабинет
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/", { replace: true });
  }
}, [navigate]);

// выход из кабинета
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/", { replace: true });
};


  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    setProfileMessage("Изменения сохранены (локально в браузере).");
    setTimeout(() => setProfileMessage(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const oldPass = (form.elements.namedItem("oldPassword") as HTMLInputElement)?.value;
    const newPass = (form.elements.namedItem("newPassword") as HTMLInputElement)?.value;
    const repeat = (form.elements.namedItem("repeatPassword") as HTMLInputElement)?.value;

    if (!oldPass || !newPass || !repeat) {
      setPasswordMessage("Заполните все поля.");
      return;
    }
    if (newPass !== repeat) {
      setPasswordMessage("Новый пароль и повтор не совпадают.");
      return;
    }

    // Сюда потом повесишь запрос к своему бэку /auth/change-password
    setPasswordMessage("Пароль успешно изменён (демо).");
    setTimeout(() => setPasswordMessage(null), 3000);
    form.reset();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "cabinet":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Личный кабинет</h2>
            <p className="text-gray-700">
              Добро пожаловать в ваш личный кабинет. Здесь вы можете
              управлять профилем, смотреть историю заказов, бонусы
              и настраивать уведомления.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Заказов</div>
                <div className="text-2xl font-semibold">{orders.length}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Бонусные баллы</div>
                <div className="text-2xl font-semibold">0</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500">Закладки</div>
                <div className="text-2xl font-semibold">0</div>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Изменить профиль</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Имя и фамилия
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, fullName: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Телефон
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700"
              >
                Сохранить
              </button>
              {profileMessage && (
                <p className="mt-2 text-sm text-green-600">{profileMessage}</p>
              )}
            </form>
          </div>
        );

      case "password":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Изменить пароль</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Текущий пароль
                </label>
                <input
                  name="oldPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Новый пароль
                </label>
                <input
                  name="newPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Повторите новый пароль
                </label>
                <input
                  name="repeatPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700"
              >
                Обновить пароль
              </button>
              {passwordMessage && (
                <p className="mt-2 text-sm text-green-600">{passwordMessage}</p>
              )}
            </form>
          </div>
        );

      case "notify":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Уведомить о наличии</h2>
            <p className="text-gray-700">
              Здесь будут отображаться товары, на которые вы подписались,
              чтобы получить уведомление при появлении в наличии.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Сейчас список пуст. Добавление подписок можно будет сделать,
              когда подключим эту функцию к карточкам товара.
            </p>
          </div>
        );

      case "fav":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Закладки</h2>
            <p className="text-gray-700">
              Вы пока не добавили ни одного товара в закладки.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              В будущем здесь можно будет хранить избранные игры.
            </p>
          </div>
        );

      case "history":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">История покупок</h2>
            {orders.length === 0 ? (
              <p className="text-gray-700">
                У вас пока нет заказов.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-3 py-2 text-left">№ заказа</th>
                      <th className="border px-3 py-2 text-left">Дата</th>
                      <th className="border px-3 py-2 text-left">Статус</th>
                      <th className="border px-3 py-2 text-right">Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="border px-3 py-2">{order.id}</td>
                        <td className="border px-3 py-2">{order.date}</td>
                        <td className="border px-3 py-2">{order.status}</td>
                        <td className="border px-3 py-2 text-right">
                          {order.total} ₴
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "bonus":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Бонусные баллы</h2>
            <p className="text-gray-700">
              На вашем бонусном счёте сейчас{" "}
              <span className="font-semibold">0 баллов</span>.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Когда подключим реальную систему бонусов, здесь будет отображаться
              баланс и история начислений.
            </p>
          </div>
        );

      case "payments":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Транзакции</h2>
            <p className="text-gray-700">
              Здесь будет отображаться история платежей по заказам.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              После интеграции оплаты (LiqPay / Fondy / Stripe) можно будет
              подгружать реальные транзакции из бэкенда.
            </p>
          </div>
        );

      case "partner":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Партнёрская программа</h2>
            <p className="text-gray-700 mb-2">
              В будущем здесь может быть ваша реферальная ссылка и статистика
              приведённых друзей.
            </p>
            <p className="text-sm text-gray-500">
              Сейчас этот раздел подготовлен визуально, чтобы потом
              просто подключить логику.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse gap-6">


        {/* Левая колонка — меню */}
        <aside className="w-full md:w-64">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h1 className="text-lg font-semibold">Личный кабинет</h1>
              <p className="text-xs text-gray-500">
                Управление профилем и заказами
              </p>
            </div>
            <nav className="divide-y">
              {menuItems.map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      if (item.key === "logout") {
                        handleLogout();
                      } else {
                        setActiveTab(item.key);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
                      isActive ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-50 transition`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${item.color} text-white text-lg`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-gray-800">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Правая колонка — контент выбранного пункта */}
        <main className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
