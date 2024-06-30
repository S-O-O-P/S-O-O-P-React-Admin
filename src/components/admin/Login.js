import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const onNaverLogin = () => {
  window.location.href = "http://localhost:8081/oauth2/authorization/naver";
}

const onKakaoLogin = () => {
  window.location.href = "http://localhost:8081/oauth2/authorization/kakao";
}

const onGoogleLogin = () => {
  window.location.href = "http://localhost:8081/oauth2/authorization/google";
}

function Login({ setUser }) {
  const [nickname, setNickname] = useState('');
  const [userCode, setUserCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 입력 필드 유효성 검사
    if (!nickname && !userCode) {
      setModalMessage('닉네임과 유저코드를 입력해주세요.');
      setShowModal(true);
      return;
    } else if (!nickname) {
      setModalMessage('닉네임을 입력해주세요.');
      setShowModal(true);
      return;
    } else if (!userCode) {
      setModalMessage('유저코드를 입력해주세요.');
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/', {
        nickname,
        userCode,
      });

      console.log(response.data); // 응답 데이터 확인

      if (response.data.userRole === 'ADMIN') {
        console.log('Admin login successful');
        const userData = {
          nickname: response.data.nickname,
          userRole: response.data.userRole,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/home');
      } else {
        setModalMessage('관리자 아이디 및 비밀번호가 아닙니다. 관리자 계정으로 로그인 해주세요.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setModalMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <main>
        <div className="login-container">
          <div className='logo-content'>
            <img className='midle-logo' src="images/commons/logo.png" alt="LOGO"/>
          </div>
          <div className="login-box">
            <p className='text'>관리자 로그인</p>
            <div className="input-group">
              <input 
                type="text" 
                id="nickname" 
                name="nickname" 
                placeholder="닉네임을 입력하세요" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input 
                type="text" 
                id="userCode" 
                name="userCode" 
                placeholder="유저코드를 입력하세요" 
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
              />
            </div>
            <button className="login-button" onClick={handleLogin}>로그인</button>
            <button onClick={onNaverLogin} className="naver-login">네이버 로그인</button>
            <button onClick={onKakaoLogin} className="kakao-login">카카오 로그인</button>
            <button onClick={onGoogleLogin} className="google-login">Google 로그인</button>
          </div>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>{modalMessage}</p>
              <button className="close-button" onClick={closeModal}>닫기</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Login;
