import React, { Component } from 'react';
import axios from 'axios';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false }; // 리디렉션 여부 상태 추가
    this.setupGlobalErrorHandlers();
    this.setupAxiosInterceptors();
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);

    let errorCode = 500; // Default to internal server error

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorCode = error.response.status;
      } else if (error.request) {
        errorCode = 503; // Service Unavailable
      } else {
        errorCode = 400; // Bad Request
      }
    } else if (error && error.response && error.response.status) {
      errorCode = error.response.status;
    }

    console.log("componentDidCatch errorCode:", errorCode);
    this.handleError(errorCode);
  }

  setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
      config => config,
      error => {
        this.handleAxiosError(error);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => response,
      error => {
        this.handleAxiosError(error);
        return Promise.reject(error);
      }
    );
  };

  handleAxiosError = (error) => {
    let errorCode = 500; // Default to internal server error

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorCode = error.response.status;
      } else if (error.request) {
        errorCode = 503; // Service Unavailable
      } else {
        errorCode = 400; // Bad Request
      }
    }

    console.log("handleAxiosError errorCode:", errorCode);
    this.handleError(errorCode);
  };

  setupGlobalErrorHandlers = () => {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Global error caught:", error);
      this.handleError(500);
      return true;
    };

    window.onunhandledrejection = (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      let errorCode = 500;
      const error = event.reason;

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorCode = error.response.status;
        } else if (error.request) {
          errorCode = 503; // Service Unavailable
        } else {
          errorCode = 400; // Bad Request
        }
      }

      this.handleError(errorCode);
    };
  };

  handleError = (errorCode) => {
    console.log("Handling error with code:", errorCode);
    if (!this.state.shouldRedirect) { // 리디렉션 여부를 확인
      this.setState({ shouldRedirect: true }, () => {
        this.redirectToErrorPage(errorCode);
      });
    }
  };

  redirectToErrorPage = (errorCode) => {
    console.log("Redirecting to error page with code:", errorCode);
    if (errorCode === 503) {
      window.location.href = `http://localhost:8080/error`;
    } else {
      window.location.href = `http://localhost:8080/error/${errorCode}`;
    }
  };

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
