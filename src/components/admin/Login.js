import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import style from "../../pages/Inquiry/InquiryAnswer.module.css"

function Login({ setUser }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 입력 필드 유효성 검사
    if (!id && !password) {
      setModalMessage('아이디와 비밀번호를 입력해주세요.');
      setShowModal(true);
      return;
    } else if (!id) {
      setModalMessage('아이디를 입력해주세요.');
      setShowModal(true);
      return;
    } else if (!password) {
      setModalMessage('비밀번호를 입력해주세요.');
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/', {
        id,
        password,
      });

      console.log(response.data); // 응답 데이터 확인

      if (response.data.userRole === 'ADMIN') {
        console.log('Admin login successful');
        const userData = {
          id: response.data.id,
          userRole: response.data.userRole,
          nickname: response.data.nickname
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/home');
      } else {
        setModalMessage('관리자 아이디 및 비밀번호가 아닙니다.\n 관리자 계정으로 로그인 해주세요.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setModalMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      setShowModal(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const closeBtn = () => {
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
                id="id" 
                name="id" 
                placeholder="아이디를 입력하세요" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="비밀번호를 입력하세요" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button className="login-button" onClick={handleLogin}>로그인</button>
          </div>
        </div>
        {showModal && (
          <div className={style.back}>
            <div className={style.modal}>
            <img src='/images/commons/icon_alert.png' alt='경고' width={45} />
              <p style={{ whiteSpace: 'pre-wrap' }}>{modalMessage}</p>
              <button className={style.modalButton} onClick={closeBtn}>닫기</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Login;