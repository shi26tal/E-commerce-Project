import axios from "axios";
import { useState, useEffect ,Fragment } from "react";
import Header from "../../Components/Header";
import "./OrdersPage.css";
import OrdersGrid from "./OrdersGrid";

const OrdersPage = ({ cart ,loadCart}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async ()=>{
      const response = await axios.get("/api/orders?expand=products")
      setOrders(response.data);
    }

  getOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart}/>

      </div>
    </>
  );
};

export default OrdersPage;
