import React from "react";
import "./signin.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { userSignM } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { googleSignInStart } from "../../redux/user/user.action";
class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    await userSignM(email, password, this);
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign In with your Email and Password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="email"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            required
          />
          <FormInput
            label="password"
            name="password"
            type="password"
            autoComplete="on"
            handleChange={this.handleChange}
            value={this.state.password}
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});
export default connect(null, mapDispatchToProps)(SignIn);
