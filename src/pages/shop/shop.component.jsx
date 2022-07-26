import React from "react";
import SHOP_DATA from "./shop.data.js";
import CollectionPreview from "../../components/preview-collection/preview-collection.component.jsx";
class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map(({ id, ...others }) => {
          return <CollectionPreview key={id} {...others} />;
        })}
      </div>
    );
  }
}

export default ShopPage;
