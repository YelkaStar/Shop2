// src/components/LoginModal.tsx
import { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onShowRegister: () => void; // для переключения на регистрацию
}

export default function LoginModal({ onClose, onSuccess, onShowRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? "Неверный email или пароль");
      }

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Авторизация</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Введите e-mail"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Пароль</label>
            <input
              type="password"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Вход..." : "Войти"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Нет аккаунта?{" "}
            <button
              type="button"
              onClick={onShowRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
