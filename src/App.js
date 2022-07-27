import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import HomePage from "./pages/hompage/hompage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignPage from "./pages/sign/sign.component";
import React from "react";
import { setCurrentUser } from "./redux/user/user.action";
const { auth, userProf } = require("./firebase/firebase.utils.js");
const { onSnapshot } = require("firebase/firestore");
class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = await userProf(authUser);
        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser({ currentUser: authUser });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignPage />)} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
