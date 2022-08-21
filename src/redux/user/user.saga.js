import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import { googleSignInSuccess, googleSignInFailure } from "../user/user.action";
const { getDoc } = require("firebase/firestore");
const { signInWithPopup } = require("firebase/auth");
const { auth, googleProvider, userProf } = require("../../firebase/firebase.utils");

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    const userRef = yield call(userProf, user);
    const snapShot = yield getDoc(userRef);
    yield put(googleSignInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (err) {
    yield put(googleSignInFailure(err));
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
