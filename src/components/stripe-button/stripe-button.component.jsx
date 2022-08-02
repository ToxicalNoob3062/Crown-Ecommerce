import React from "react";
import StripeCheckout from "react-stripe-checkout";
import "./stripe-button.styles.scss";
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51LSJRRJxhIXjnJlujtC3ZN3sH7C5lsTPpVkkUQGolK9Iz3ZTliS5zAC7c1kysQhB8v6cGBrD865JbsPMvBqXtzZD00DBUVXB04";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successfull");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      image="https://svgsilh.com/svg/1157725.svg"
      description={`Your total  is ${price}$`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
