import ShopActionTypes from "./shop.types";
const { collection, getDocs } = require("firebase/firestore");
const { firestore, remakeShopData } = require("../../firebase/firebase.utils");

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errMessage,
});
export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(firestore, "collections");
    dispatch(fetchCollectionsStart());
    getDocs(collectionRef)
      .then((snapshot) => {
        const collectionsMap = remakeShopData(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((err) => {
        dispatch(fetchCollectionsFailure(err.message));
      });
  };
};
