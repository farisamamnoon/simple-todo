import React from "react";
import { Error } from "./error";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super();
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    console.log("Inside getderived state", error);
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Inside component did catch", error);
  }

  render() {
    if (this.state.hasError) {
      return <Error error={this.state.error} />;
    }

    return this.props.children;
  }
}
