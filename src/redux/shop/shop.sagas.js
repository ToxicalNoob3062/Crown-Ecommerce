import { takeLatest, call, put } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import { fetchCollectionsSuccess, fetchCollectionsFailure } from "../shop/shop.actions";
const { collection, getDocs } = require("firebase/firestore");
const { firestore, remakeShopData } = require("../../firebase/firebase.utils");

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = collection(firestore, "collections");
    const snapShot = yield getDocs(collectionRef);
    const collectionsMap = yield call(remakeShopData, snapShot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionsFailure(err.message));
  }
}
export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
