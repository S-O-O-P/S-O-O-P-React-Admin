// src/pages/Error/Error500.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // 스타일링을 위해 CSS 파일을 임포트합니다.

const Error500 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동합니다.
  };

  return (
    <div className="container">
      <img src="/images/commons/logo.png" alt="500 Error" />
      <p>서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
      <button onClick={goBack}>이전으로</button>
    </div>
  );
};

export default Error500;
