import React from "react";
import "./cart-item.styles.scss";
import { connect } from "react-redux";
import { addItem, removeItem } from "../../redux/cart/cart.action";

const CartItem = ({ item, addItem, removeItem }) => {
  const { imageUrl, price, name, quantity } = item;
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          <div className="arr" onClick={() => addItem(item)}>
            &#10094;
          </div>
          <span className="quantity">{quantity}</span>x{price}$={parseInt(quantity) * parseInt(price)}$
          <div className="arr" onClick={() => removeItem(item)}>
            &#10095;
          </div>
        </span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (cartItem) => dispatch(addItem(cartItem)),
  removeItem: (cartItem) => dispatch(removeItem(cartItem)),
});
export default connect(null, mapDispatchToProps)(CartItem);
