import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './Map.css';

function Map() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [map, setMap] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '600px'
  };

  const center = {
    lat: 37.5665,
    lng: 126.9780
  };

  // Google Maps API 키 (실제 사용시에는 환경변수로 설정해야 합니다)
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

  useEffect(() => {
    // 맛집 데이터 (위치 정보 포함)
    const restaurantData = [
      {
        id: 1,
        name: "맛있는 한식당",
        category: "한식",
        rating: 4.8,
        address: "서울시 강남구 테헤란로 123",
        description: "전통 한식의 맛을 현대적으로 재해석한 프리미엄 한식당입니다.",
        price: "2만원~4만원",
        location: { lat: 37.5665, lng: 126.9780 },
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "이탈리안 키친",
        category: "양식",
        rating: 4.6,
        address: "서울시 서초구 서초대로 456",
        description: "정통 이탈리아 요리를 선보이는 럭셔리 레스토랑입니다.",
        price: "3만원~6만원",
        location: { lat: 37.5013, lng: 127.0396 },
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "스시 마스터",
        category: "일식",
        rating: 4.9,
        address: "서울시 마포구 홍대로 789",
        description: "신선한 재료로 만드는 정통 스시와 사시미를 즐길 수 있습니다.",
        price: "4만원~8만원",
        location: { lat: 37.5519, lng: 126.9251 },
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        name: "중국요리 전문점",
        category: "중식",
        rating: 4.5,
        address: "서울시 종로구 종로 321",
        description: "다양한 중국 지역의 요리를 맛볼 수 있는 전문점입니다.",
        price: "1.5만원~3만원",
        location: { lat: 37.5735, lng: 126.9789 },
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        name: "베트남 포",
        category: "동남아식",
        rating: 4.3,
        address: "서울시 용산구 이태원로 654",
        description: "신선한 허브와 향신료로 만드는 정통 베트남 요리입니다.",
        price: "1만원~2.5만원",
        location: { lat: 37.5344, lng: 126.9942 },
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      },
      {
        id: 6,
        name: "디저트 카페",
        category: "카페",
        rating: 4.7,
        address: "서울시 강남구 압구정로 987",
        description: "수제 케이크와 커피를 즐길 수 있는 아늑한 카페입니다.",
        price: "5천원~1.5만원",
        location: { lat: 37.5270, lng: 127.0276 },
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
      }
    ];

    setRestaurants(restaurantData);
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      '한식': '🍚',
      '양식': '🍝',
      '일식': '🍣',
      '중식': '🥢',
      '동남아식': '🍜',
      '카페': '☕'
    };
    return icons[category] || '🍽️';
  };

  const getCategoryColor = (category) => {
    const colors = {
      '한식': '#FF6B6B',
      '양식': '#4ECDC4',
      '일식': '#45B7D1',
      '중식': '#96CEB4',
      '동남아식': '#FFEAA7',
      '카페': '#DDA0DD'
    };
    return colors[category] || '#667eea';
  };

  // API 키가 설정되지 않은 경우 안내 메시지 표시
  if (GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <div className="map-container">
        <div className="map-header">
          <h2>🗺️ 맛집 지도</h2>
          <p>지도에서 맛집 위치를 확인하고 클릭하여 상세 정보를 보세요!</p>
        </div>
        <div className="map-wrapper">
          <div className="api-key-notice">
            <h3>Google Maps API 키가 필요합니다</h3>
            <p>지도를 사용하려면 Google Maps API 키를 설정해야 합니다.</p>
            <ol>
              <li>Google Cloud Console에서 Maps JavaScript API를 활성화하세요</li>
              <li>API 키를 생성하세요</li>
              <li>src/pages/Map.js 파일의 GOOGLE_MAPS_API_KEY 변수에 API 키를 입력하세요</li>
            </ol>
            <p><strong>참고:</strong> 실제 프로덕션에서는 환경변수를 사용하는 것이 좋습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <h2>🗺️ 맛집 지도</h2>
        <p>지도에서 맛집 위치를 확인하고 클릭하여 상세 정보를 보세요!</p>
      </div>

      <div className="map-wrapper">
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
          >
            {restaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                position={restaurant.location}
                onClick={() => setSelectedRestaurant(restaurant)}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="18" fill="${getCategoryColor(restaurant.category)}" stroke="white" stroke-width="2"/>
                      <text x="20" y="25" text-anchor="middle" font-size="16" fill="white" font-family="Arial">${getCategoryIcon(restaurant.category)}</text>
                    </svg>
                  `)}`,
                  scaledSize: { width: 40, height: 40 }
                }}
              />
            ))}

            {selectedRestaurant && (
              <InfoWindow
                position={selectedRestaurant.location}
                onCloseClick={() => setSelectedRestaurant(null)}
              >
                <div className="info-window">
                  <div className="info-window-image">
                    <img src={selectedRestaurant.image} alt={selectedRestaurant.name} />
                    <div className="category-badge">{selectedRestaurant.category}</div>
                  </div>
                  <div className="info-window-content">
                    <h3>{selectedRestaurant.name}</h3>
                    <div className="rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-number">{selectedRestaurant.rating}</span>
                    </div>
                    <p className="description">{selectedRestaurant.description}</p>
                    <div className="details">
                      <p className="address">📍 {selectedRestaurant.address}</p>
                      <p className="price">💰 {selectedRestaurant.price}</p>
                    </div>
                    <button className="reserve-btn">예약하기</button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="map-legend">
        <h3>범례</h3>
        <div className="legend-items">
          {['한식', '양식', '일식', '중식', '동남아식', '카페'].map(category => (
            <div key={category} className="legend-item">
              <span 
                className="legend-icon" 
                style={{ backgroundColor: getCategoryColor(category) }}
              >
                {getCategoryIcon(category)}
              </span>
              <span className="legend-text">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Map; 