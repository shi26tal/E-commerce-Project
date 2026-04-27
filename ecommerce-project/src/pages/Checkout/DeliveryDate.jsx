import React from "react";
import dayjs from "dayjs";

const DeliveryDate = ({ deliveryOptions ,cartItem}) => {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
        "dddd, MMMM D",
      )}
    </div>
  );
};

export default DeliveryDate;
