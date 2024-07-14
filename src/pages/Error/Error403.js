// src/pages/Error/Error403.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // 스타일링을 위해 CSS 파일을 임포트합니다.

const Error403 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-2); // 이전 페이지로 이동합니다.
  };

  return (
    <div className="container">
      <img src="/images/commons/logo.png" alt="403 Error" />
      <p>접근이 금지되었습니다. 권한이 있는지 확인해 주세요.</p>
      <button onClick={goBack}>이전으로</button>
    </div>
  );
};

export default Error403;
