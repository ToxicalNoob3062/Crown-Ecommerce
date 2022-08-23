import React from "react";
import "./cart-dropdown.styles.scss";
import "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { selectCartItems } from "../../redux/cart/card.selector";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => <CartItem key={cartItem.id} item={cartItem}></CartItem>)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      {cartItems.length ? ( //
        <CustomButton
          onClick={() => {
            dispatch(toggleCartHidden());
            history.push("/checkout");
          }}
        >
          Go TO CHECKOUT
        </CustomButton>
      ) : (
        <p className="extras">Welcome to CrownClothing</p>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default withRouter(connect(mapStateToProps)(CartDropdown));
