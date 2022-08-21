const { initializeApp } = require("firebase/app");
const {
  getAuth,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { getFirestore, doc, getDoc, setDoc, collection, writeBatch } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyAtqUTsNmBsSKWtTPS3jMJF2ayL5ywS9kw",
  authDomain: "crown-db-65cb1.firebaseapp.com",
  projectId: "crown-db-65cb1",
  storageBucket: "crown-db-65cb1.appspot.com",
  messagingSenderId: "383205962459",
  appId: "1:383205962459:web:d0ce6809e789aff25bd2fe",
  measurementId: "G-C5ZHX9CT7X",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

async function Disconnect() {
  try {
    await signOut(auth);
    console.log("successfully signed out");
  } catch (err) {
    console.log("sngout");
  }
}

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = doc(firestore, `user/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  return userRef;
};
const createManually = async (email, password, displayName, component) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfileDocument(user, { displayName });
    component.setState({
      displayName: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
  } catch (err) {
    console.log("manual prof", err.message);
  }
};
const SignInManually = async (email, password, comp) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    comp.setState({ email: "", password: "" });
  } catch (err) {
    console.log("sign in manual:", err.message);
  }
};
const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  const batch = writeBatch(firestore);
  objectsToAdd.forEach((obj) => {
    const collectionDocRef = doc(collectionRef, obj.title);
    batch.set(collectionDocRef, obj);
  });
  await batch.commit();
};
const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  const transformedCollections = collectionsSnapshot.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollections.reduce((accum, collection) => {
    accum[collection.title.toLowerCase()] = collection;
    return accum;
  }, {});
};

module.exports.googleProvider = googleProvider;
module.exports.addCollectionAndDocuments = addCollectionAndDocuments;
module.exports.auth = auth;
module.exports.signOut = Disconnect;
module.exports.userProf = createUserProfileDocument;
module.exports.userProfM = createManually;
module.exports.userSignM = SignInManually;
module.exports.firestore = firestore;
module.exports.remakeShopData = convertCollectionsSnapshotToMap;
