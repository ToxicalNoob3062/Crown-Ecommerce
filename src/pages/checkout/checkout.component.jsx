import React from "react";
import "./checkout.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems, selectCartTotal } from "../../redux/cart/card.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

const CheckOutPage = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">Total:{total}$</div>
      <StripeCheckoutButton price={total} />
      <div className="test-warning">
        The payment process is just a demo.To try it follow below credentials;
        <br />
        email:test@example.com <br />
        date:any future date <br />
        cvc:567
        <br />
        card:4242 4242 4242 4242
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});
export default connect(mapStateToProps)(CheckOutPage);
