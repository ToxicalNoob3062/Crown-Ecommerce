import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoading, ...others }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...others} />
    );
  };

export default WithSpinner;
