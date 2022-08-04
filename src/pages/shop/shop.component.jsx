import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import WithSpinner from "../../components/spinner/spinner.component";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
const { onSnapshot, collection } = require("firebase/firestore");
const { firestore, remakeShopData } = require("../../firebase/firebase.utils");
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, "collections");
    this.unsubscribeFromSnapshot = onSnapshot(collectionRef, async (snapshot) => {
      updateCollections(remakeShopData(snapshot));
      this.setState({ loading: false });
    });
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
        />
        <Route
          path={`${match.path}/:catagoryId`}
          render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (shopData) => dispatch(updateCollections(shopData)),
  };
};
export default connect(null, mapDispatchToProps)(ShopPage);
