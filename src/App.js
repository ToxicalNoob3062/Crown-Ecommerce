import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/hompage/hompage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignPage from "./pages/sign/sign.component";
import React from "react";
const { auth, userProf } = require("./firebase/firebase.utils.js");
const { onSnapshot } = require("firebase/firestore");
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = await userProf(authUser);
        onSnapshot(userRef, (snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: authUser });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
