import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: '🍽️',
      title: '다양한 맛집',
      description: '한식, 양식, 일식, 중식 등 다양한 종류의 맛집을 소개합니다.'
    },
    {
      icon: '⭐',
      title: '실시간 평점',
      description: '사용자들이 직접 남긴 평점으로 신뢰할 수 있는 맛집 정보를 제공합니다.'
    },
    {
      icon: '🗺️',
      title: '지도 서비스',
      description: '지도에서 맛집 위치를 한눈에 확인하고 편리하게 찾아갈 수 있습니다.'
    },
    {
      icon: '🔍',
      title: '카테고리별 검색',
      description: '음식 종류별로 필터링하여 원하는 맛집을 쉽게 찾을 수 있습니다.'
    }
  ];

  const popularRestaurants = [
    {
      id: 1,
      name: "맛있는 한식당",
      category: "한식",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "이탈리안 키친",
      category: "양식",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "스시 마스터",
      category: "일식",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🍽️ 맛집 탐방기에 오신 것을 환영합니다!</h1>
          <p>최고의 맛집들을 발견하고, 평점을 남기고, 지도에서 위치를 확인하세요.</p>
          {!currentUser ? (
            <div className="hero-buttons">
              <Link to="/signup" className="cta-button primary">회원가입</Link>
              <Link to="/login" className="cta-button secondary">로그인</Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to="/restaurants" className="cta-button primary">맛집 둘러보기</Link>
              <Link to="/map" className="cta-button secondary">지도 보기</Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>주요 기능</h2>
          <p>맛집 탐방기만의 특별한 기능들을 만나보세요</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Restaurants Section */}
      <section className="popular-restaurants">
        <div className="section-header">
          <h2>인기 맛집</h2>
          <p>사용자들이 가장 많이 찾는 맛집들입니다</p>
        </div>
        <div className="restaurants-grid">
          {popularRestaurants.map(restaurant => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-image">
                <img src={restaurant.image} alt={restaurant.name} />
                <div className="category-badge">{restaurant.category}</div>
              </div>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-number">{restaurant.rating}</span>
                </div>
                <Link to="/restaurants" className="view-more-btn">자세히 보기</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/restaurants" className="view-all-btn">모든 맛집 보기</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>지금 바로 시작하세요!</h2>
          <p>맛집 탐방기와 함께 새로운 맛집을 발견하고 경험을 공유해보세요.</p>
          {!currentUser ? (
            <Link to="/signup" className="cta-button primary">무료로 가입하기</Link>
          ) : (
            <Link to="/restaurants" className="cta-button primary">맛집 둘러보기</Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home; 