/* eslint-disable no-unused-vars */
import React from "react";

class ErrorHandlerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    //window.location.href = `${PATH.FINAL_ERROR_PAGE}`
  }

  render() {
    if (this.state.hasError) {
      //can not handle error in here
    }
    return this.props.children;
  }
}

export default ErrorHandlerComponent;
