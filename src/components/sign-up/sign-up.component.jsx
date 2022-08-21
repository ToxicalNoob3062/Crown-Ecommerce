import React, { useState } from "react";
import "./sign-up.styles.scss";
import FormInput from "./../form-input/form-input.component";
import CustomButton from "./../custom-button/custom-button.component";
import { signUpStart } from "../../redux/user/user.action";
import { connect } from "react-redux";
const SignUp = ({ signUpStart }) => {
  const [checkList, setCheckList] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword, displayName } = checkList;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords MissMatched");
      return;
    }
    signUpStart({ email, password, displayName });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCheckList({ ...checkList, [name]: value });
  };
  return (
    <div className="sign-up">
      <h2 className="title">I do not have a Account!</h2>
      <span>Sign up with your Email and Password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          required
          label="Display Name"
          name="displayName"
          type="text"
          value={displayName}
          onChange={handleChange}
        />
        <FormInput required label="Email" name="email" type="text" value={email} onChange={handleChange} />
        <FormInput
          required
          label="Password"
          name="password"
          type="password"
          value={password}
          autoComplete="true"
          onChange={handleChange}
        />
        <FormInput
          required
          autoComplete="true"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCred) => dispatch(signUpStart(userCred)),
});
export default connect(null, mapDispatchToProps)(SignUp);
