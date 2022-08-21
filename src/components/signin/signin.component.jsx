import React, { useState } from "react";
import "./signin.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.action";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCred;

  const handleSubmit = async (event) => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCred({ ...userCred, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign In with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="email" name="email" type="email" handleChange={handleChange} value={email} required />
        <FormInput
          label="password"
          name="password"
          type="password"
          autoComplete="on"
          handleChange={handleChange}
          value={password}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
