import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";
import WithSpinner from "../spinner/spinner.component";

//these two components will be wrapped by same container
import CollectionsOverview from "./collections-overview.component";
import CollectionPage from "../../pages/collection/collection.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

export const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview);
export const CollectionPageContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionPage);
