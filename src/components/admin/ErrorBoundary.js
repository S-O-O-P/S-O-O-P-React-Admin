// src/components/admin/ErrorBoundary.js
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidMount() {
    const { navigate } = this.props;
    
    // axios 인터셉터 설정
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const status = error.response.status;
          if (status === 404) {
            navigate('/error/404');
          } else if (status === 500) {
            navigate('/error/500');
          } else if (status === 400) {
            navigate('/error/400');
          } else if (status === 403) {
            navigate('/error/403');
          } else {
            navigate('/error/500');
          }
        }
        return Promise.reject(error);
      }
    );
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    const { navigate } = this.props;

    // 여기서 에러 타입에 따라 다른 경로로 리디렉션할 수 있습니다.
    navigate('/error/500');
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const ErrorBoundaryWithNavigate = (props) => {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
};

export default ErrorBoundaryWithNavigate;
