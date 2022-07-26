import React from "react";
import "./sign-up.styles.scss";
import FormInput from "./../form-input/form-input.component";
import CustomButton from "./../custom-button/custom-button.component";
const { userProfM } = require("../../firebase/firebase.utils");

export class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword, displayName } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords MissMatched");
      return;
    }
    await userProfM(email, password, displayName, this);
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email, password, confirmPassword, displayName } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a Account!</h2>
        <span>Sign up with your Email and Password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            required
            label="Display Name"
            name="displayName"
            type="text"
            value={displayName}
            onChange={this.handleChange}
          />
          <FormInput required label="Email" name="email" type="text" value={email} onChange={this.handleChange} />
          <FormInput
            required
            label="Password"
            name="password"
            type="password"
            value={password}
            autoComplete="true"
            onChange={this.handleChange}
          />
          <FormInput
            required
            autoComplete="true"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={this.handleChange}
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
