import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router";
import HomePage from "./pages/Home/HomePage";
import "./App.css";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/Order-Page/OrdersPage";
import TrackingPage from "./pages/Tracking-Page/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";

//window.axios=axios;

// This makes axios available in the Console.
// - Then, you can try running axios.post('/api/reset') in the Console.

function App() {
  const [cart, setCart] = useState([]);

   const loadCart = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart}/>} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>} />
      <Route path="*" element={<NotFoundPage cart={cart}/>} />
    </Routes>
  );
}

export default App;


//automated testing : Jest and Vitest