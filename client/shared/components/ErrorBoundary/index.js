import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      hasError: false,
      error: { message: '', stack: '' },
      info: { componentStack: '' }
     };
  }

  static propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;
  
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong.
          {' '}
          {error}
        </h1>
      );
    }

    return children; 
  }
}

export default ErrorBoundary;
