import React from "react";
import "./sign.styles.scss";
import SignIn from "./../../components/signin/signin.component";
import SignUp from "../../components/sign-up/sign-up.component";
const SignPage = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignPage;
