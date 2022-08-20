import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import WithSpinner from "../../components/spinner/spinner.component";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { createStructuredSelector } from "reselect";
import { selectIsSelectionsLoaded } from "../../redux/shop/shop.selector";
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  render() {
    const { match, isCollectionLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner isLoading={!isCollectionLoaded} {...props} />}
        />
        <Route
          path={`${match.path}/:catagoryId`}
          render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: selectIsSelectionsLoaded,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
