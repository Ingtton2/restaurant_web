import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">
            <h1>🍽️ 인슐랭 맛집 가이드</h1>
          </Link>
        </div>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">홈</Link>
          <Link to="/restaurants" className="nav-link">맛집 목록</Link>
          <Link to="/map" className="nav-link">지도</Link>
        </div>

        <div className="nav-auth">
          {currentUser ? (
            <div className="user-menu">
              <span className="username">안녕하세요, {currentUser.username}님!</span>
              <button onClick={handleLogout} className="logout-btn">
                로그아웃
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">로그인</Link>
              <Link to="/signup" className="signup-btn">회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 