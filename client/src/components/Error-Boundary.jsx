import React from "react";

export class ErrorBounday extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    if (this.state.hasError === true) {
      return React.cloneElement(this.props.element, this.state.error);
    }

    return this.props.children;
  }
}
