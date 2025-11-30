import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { tr, type Lang } from "./Language/Boogers";
import { CartProvider } from "../contexts/CartContext";

import Starting from "../pages/Starting";
import AboutUs from "../pages/AboutUs";
import DeliveryAndPayment from "../pages/DeliveryAndPayment";
import ExchangeAndReturn from "../pages/ExchangeAndReturn";
import Contacts from "../pages/Contacts";
import PersonalAccount from "../pages/PersonalAccount";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import CartModal from "../components/CartModal";
import Checkout from "../pages/Checkout";
export default function App() {
  const [lang, setLang] = useState<Lang>("ru");
  const t = (key: string) => tr[lang][key] || key;

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  function handleAccountClick() {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/account");
    } else {
      setShowLogin(true);
    }
  }

  function handleLoginSuccess() {
    setShowLogin(false);
    navigate("/account");
  }

  function handleRegisterSuccess() {
    setShowRegister(false);
    setShowLogin(true);
  }

  return (
    <CartProvider>
      <Starting
        t={t}
        lang={lang}
        onLangChange={setLang}
        onAccountClick={handleAccountClick}
        onCartClick={() => setShowCart(true)}
      />

      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/delivery" element={<DeliveryAndPayment />} />
        <Route path="/exchange" element={<ExchangeAndReturn />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/account" element={<PersonalAccount />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
          onShowRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSuccess={handleRegisterSuccess}
          onShowLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showCart && <CartModal onClose={() => setShowCart(false)} />}
    </CartProvider>
  );
}
