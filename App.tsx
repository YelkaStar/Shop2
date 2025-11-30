import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { tr, type Lang } from "./Boogers";
import { CartProvider } from "./CartContext";

import Starting from "./Starting";
import AboutUs from "./AboutUs";
import DeliveryAndPayment from "./DeliveryAndPayment";
import ExchangeAndReturn from "./ExchangeAndReturn";
import Contacts from "./Contacts";
import PersonalAccount from "./PersonalAccount";
import Catalog from "./Catalog";
import ProductDetail from "./ProductDetail";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import CartModal from "./CartModal";
import Checkout from "./Checkout";
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
