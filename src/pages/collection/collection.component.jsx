import React from "react";
import "./collection.styles.scss";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";
import SearchBar from "../../components/search-bar/search-bar.component";
import { useState } from "react";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  const [customCollection, setCustomCollection] = useState(items);
  const eventListener = (event) => {
    const { value } = event.target;
    setCustomCollection(
      value.length
        ? items.filter((customItem) => {
            const filteredCollection = customItem["name"].toLowerCase().includes(value.toLowerCase());
            return filteredCollection ? customItem : null;
          })
        : items
    );
  };
  return (
    <div className="collection-page">
      <SearchBar placeHolder={`Search Your Favourite in ${title}`} onHandleChange={eventListener} />
      <h2 className="title">{title}</h2>
      <div className="items">
        {customCollection.map((item) => {
          return <CollectionItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.catagoryId)(state),
});
export default connect(mapStateToProps)(CollectionPage);
