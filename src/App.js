import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import HomePage from "./pages/hompage/hompage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignPage from "./pages/sign/sign.component";
import CheckOutPage from "./pages/checkout/checkout.component";
import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.action";

const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/signin" render={() => (currentUser ? <Redirect to="/" /> : <SignPage />)} />
        <Route exact path="/checkout" component={CheckOutPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
