import React, { Component } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Error404 from '../../pages/Error/Error404';
import Error500 from '../../pages/Error/Error500';
import Error400 from '../../pages/Error/Error400';
import Error403 from '../../pages/Error/Error403';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorStatus: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidMount() {
    // axios interceptor 설정
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const status = error.response.status;
          this.setState({ hasError: true, errorStatus: status });
        }
        return Promise.reject(error);
      }
    );
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    if (error.message.includes("Not found")) {
      this.setState({ hasError: true, errorStatus: 404 });
    } else if (error.message.includes("Bad request")) {
      this.setState({ hasError: true, errorStatus: 400 });
    } else if (error.message.includes("Forbidden")) {
      this.setState({ hasError: true, errorStatus: 403 });
    } else {
      this.setState({ hasError: true, errorStatus: 500 });
    }
  }

  async checkPageExists(url) {
    try {
      await axios.head(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  async componentDidUpdate(prevProps) {
    const { location, navigate } = this.props;

    if (
      location !== prevProps.location &&
      (location.pathname.startsWith('/notice/') || location.pathname.startsWith('/events/'))
    ) {
      if (!location.state || location.state.type === null) {
        const pageExists = await this.checkPageExists(location.pathname);
        if (!pageExists) {
          if (!location.state || !location.state.redirected) {
            navigate(location.pathname, { state: { redirected: true } });
            this.setState({ hasError: true, errorStatus: 404 });
          }
        } else {
          this.setState({ hasError: false, errorStatus: null });
        }
      }
    }
  }

  render() {
    if (this.state.hasError) {
      const { errorStatus } = this.state;
      switch (errorStatus) {
        case 404:
          return <Error404 />;
        case 500:
          return <Error500 />;
        case 400:
          return <Error400 />;
        case 403:
          return <Error403 />;
        default:
          return <Error500 />;
      }
    }

    const { location, navigate } = this.props;

    if (location.pathname.startsWith('/notice/') || location.pathname.startsWith('/events/')) {
      if (!location.state || location.state.type === null) {
        if (!location.state || !location.state.redirected) {
          navigate(location.pathname, { state: { redirected: true } });
          return <Error404 />; // Change this to whichever error page you want for null type
        }
      }
    }

    return this.props.children;
  }
}

const ErrorBoundaryWithNavigate = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return <ErrorBoundary {...props} navigate={navigate} location={location} />;
};

export default ErrorBoundaryWithNavigate;
