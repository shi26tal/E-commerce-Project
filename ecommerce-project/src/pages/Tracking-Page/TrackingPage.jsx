import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router";
import "./TrackingPage.css";
import Header from "../../Components/Header";

const TrackingPage = ({cart}) => {

  const {orderId , productId } = useParams();
  const [order,setOrder] = useState(null);

  useEffect(()=>{
    const getTrackingData = async ()=>{
      const response = await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data);
    }

    getTrackingData();
  },[orderId])

  if(!order){
    return null;
  }

  //One order can have multiple products.This finds the specific product being tracked
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

//   totalDeliveryTimeMs → total delivery duration
// timePassedMs → how much time has passed so far

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if(deliveryPercent > 100){
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33 ;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;


  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'}
             {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}</div>

          <div className="product-info">
           {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"style={{
              width: `${deliveryPercent}%`
            }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPage;
