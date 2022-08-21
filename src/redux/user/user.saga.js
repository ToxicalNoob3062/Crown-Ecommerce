import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import { signInSuccess, signInFailure } from "../user/user.action";
const { getDoc } = require("firebase/firestore");
const { signInWithPopup, signInWithEmailAndPassword } = require("firebase/auth");
const { auth, googleProvider, userProf } = require("../../firebase/firebase.utils");

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(userProf, userAuth);
    const snapShot = yield getDoc(userRef);
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (err) {
    yield put(signInFailure(err));
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
