import React from "react";
import "./cart-dropdown.styles.scss";
import "../custom-button/custom-button.component";
import CustomButton from "../custom-button/custom-button.component";
const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <CustomButton>Go TO CHECKOUT</CustomButton>
    </div>
  );
};
export default CartDropdown;
