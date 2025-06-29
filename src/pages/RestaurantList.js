import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './RestaurantList.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userRatings, setUserRatings] = useState({});
  const { currentUser } = useAuth();

  const categories = ['all', '한식', '양식', '일식', '중식', '동남아식', '카페'];

  useEffect(() => {
    // 초기 맛집 데이터
    const initialRestaurants = [
      {
        id: 1,
        name: "맛있는 한식당",
        category: "한식",
        rating: 4.8,
        address: "서울시 강남구 테헤란로 123",
        description: "전통 한식의 맛을 현대적으로 재해석한 프리미엄 한식당입니다.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        price: "2만원~4만원",
        location: { lat: 37.5665, lng: 126.9780 },
        totalRatings: 156,
        userRatings: {}
      },
      {
        id: 2,
        name: "이탈리안 키친",
        category: "양식",
        rating: 4.6,
        address: "서울시 서초구 서초대로 456",
        description: "정통 이탈리아 요리를 선보이는 럭셔리 레스토랑입니다.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
        price: "3만원~6만원",
        location: { lat: 37.5013, lng: 127.0396 },
        totalRatings: 89,
        userRatings: {}
      },
      {
        id: 3,
        name: "스시 마스터",
        category: "일식",
        rating: 4.9,
        address: "서울시 마포구 홍대로 789",
        description: "신선한 재료로 만드는 정통 스시와 사시미를 즐길 수 있습니다.",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
        price: "4만원~8만원",
        location: { lat: 37.5519, lng: 126.9251 },
        totalRatings: 234,
        userRatings: {}
      },
      {
        id: 4,
        name: "중국요리 전문점",
        category: "중식",
        rating: 4.5,
        address: "서울시 종로구 종로 321",
        description: "다양한 중국 지역의 요리를 맛볼 수 있는 전문점입니다.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        price: "1.5만원~3만원",
        location: { lat: 37.5735, lng: 126.9789 },
        totalRatings: 67,
        userRatings: {}
      },
      {
        id: 5,
        name: "베트남 포",
        category: "동남아식",
        rating: 4.3,
        address: "서울시 용산구 이태원로 654",
        description: "신선한 허브와 향신료로 만드는 정통 베트남 요리입니다.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        price: "1만원~2.5만원",
        location: { lat: 37.5344, lng: 126.9942 },
        totalRatings: 45,
        userRatings: {}
      },
      {
        id: 6,
        name: "디저트 카페",
        category: "카페",
        rating: 4.7,
        address: "서울시 강남구 압구정로 987",
        description: "수제 케이크와 커피를 즐길 수 있는 아늑한 카페입니다.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        price: "5천원~1.5만원",
        location: { lat: 37.5270, lng: 127.0276 },
        totalRatings: 123,
        userRatings: {}
      }
    ];

    // 로컬 스토리지에서 사용자 평점 불러오기
    const savedRatings = localStorage.getItem('userRatings');
    if (savedRatings) {
      setUserRatings(JSON.parse(savedRatings));
    }

    setRestaurants(initialRestaurants);
  }, []);

  const handleRating = (restaurantId, rating) => {
    if (!currentUser) {
      alert('평점을 남기려면 로그인이 필요합니다.');
      return;
    }

    const newUserRatings = {
      ...userRatings,
      [restaurantId]: {
        ...userRatings[restaurantId],
        [currentUser.id]: rating
      }
    };

    setUserRatings(newUserRatings);
    localStorage.setItem('userRatings', JSON.stringify(newUserRatings));

    // 맛집의 평균 평점 업데이트
    setRestaurants(prev => prev.map(restaurant => {
      if (restaurant.id === restaurantId) {
        const allRatings = Object.values(newUserRatings[restaurantId] || {});
        const averageRating = allRatings.length > 0 
          ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length 
          : restaurant.rating;
        
        return {
          ...restaurant,
          rating: Math.round(averageRating * 10) / 10,
          totalRatings: allRatings.length
        };
      }
      return restaurant;
    }));
  };

  const filteredRestaurants = selectedCategory === 'all' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.category === selectedCategory);

  const getUserRating = (restaurantId) => {
    if (!currentUser || !userRatings[restaurantId]) return 0;
    return userRatings[restaurantId][currentUser.id] || 0;
  };

  return (
    <div className="restaurant-list-container">
      <div className="category-nav">
        <div className="category-container">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? '전체' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="restaurant-grid">
        {filteredRestaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="category-badge">{restaurant.category}</div>
            </div>
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <div className="rating-section">
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-number">{restaurant.rating}</span>
                  <span className="total-ratings">({restaurant.totalRatings}명)</span>
                </div>
                {currentUser && (
                  <div className="user-rating">
                    <p>내 평점:</p>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          className={`star-btn ${getUserRating(restaurant.id) >= star ? 'filled' : ''}`}
                          onClick={() => handleRating(restaurant.id, star)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="description">{restaurant.description}</p>
              <div className="details">
                <p className="address">📍 {restaurant.address}</p>
                <p className="price">💰 {restaurant.price}</p>
              </div>
              <button className="reserve-btn">예약하기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList; 