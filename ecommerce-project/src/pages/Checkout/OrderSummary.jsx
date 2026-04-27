import React from "react";
import DeliveryOption from "./DeliveryOption";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

const OrderSummary = ({deliveryOptions , cart,loadCart}) => {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          

          return (
            <div key={cartItem.productId} className="cart-item-container">
              
              <DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem}/>

              <div className="cart-item-details-grid">
                
                <CartItemDetails cartItem={cartItem} loadCart={loadCart}/>

                <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}/>

              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderSummary;
