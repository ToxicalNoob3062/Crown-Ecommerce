import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import HomePage from "./pages/hompage/hompage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignPage from "./pages/sign/sign.component";
import CheckOutPage from "./pages/checkout/checkout.component";
import React from "react";
import { setCurrentUser } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
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
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(authUser);
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
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignPage />)} />
          <Route exact path="/checkout" component={CheckOutPage} />
        </Switch>
      </div>
    );
  }
}

//#extracts reducer state properties from the root state and returns a new object
//of required props from different reducer states!!
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
// It lets you provide action dispatching functions as props as a new Object which fullfills all your actions function demand
//#extracts actions functions as props and returns a new object of action functions
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
//we have to use connect to connect our component to main root state
//this takes two function where the 2nd one is optional and return a function
//we give the component as input to that function we want to connect to!
//# the two functions adds their functionality to connnected Component this.props
export default connect(mapStateToProps, mapDispatchToProps)(App);
