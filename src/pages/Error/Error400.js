// src/pages/Error/Error400.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // 스타일링을 위해 CSS 파일을 임포트합니다.

const Error400 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-2); // 이전 페이지로 이동합니다.
  };

  return (
    <div className="container">
      <img src="/images/commons/logo.png" alt="400 Error" />
      <p>요청이 잘못되었습니다. 다시 시도해 주세요.</p>
      <button onClick={goBack}>이전으로</button>
    </div>
  );
};

export default Error400;
