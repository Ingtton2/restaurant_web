# 🍽️ 인슐랭 맛집 가이드

맛집을 소개하고 사용자들이 평점을 남길 수 있는 React 웹 애플리케이션입니다.

## ✨ 주요 기능

- **회원가입/로그인**: 사용자 인증 시스템
- **맛집 목록**: 카테고리별 필터링 (한식, 양식, 일식, 중식, 동남아식, 카페)
- **지도 서비스**: Google Maps를 통한 맛집 위치 표시
- **별점 시스템**: 사용자가 직접 평점을 남길 수 있는 기능

## 🚀 시작하기

### 필수 요구사항
- Node.js (v14 이상)
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/your-username/restaurant-ui.git
cd restaurant-ui
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

4. 브라우저에서 확인
```
http://localhost:3000
```

## 🔧 환경 설정

### Google Maps API 설정
지도 기능을 사용하려면 Google Maps API 키가 필요합니다:

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Maps JavaScript API 활성화
3. API 키 생성
4. `src/pages/Map.js` 파일의 `GOOGLE_MAPS_API_KEY` 변수에 API 키 입력

```javascript
const GOOGLE_MAPS_API_KEY = 'your-api-key-here';
```

## 📱 사용법

### 테스트 계정
- 이메일: `test@test.com`
- 비밀번호: `123456`

### 주요 페이지
- **홈**: 웹사이트 소개 및 주요 기능 안내
- **맛집 목록**: 카테고리별 맛집 필터링 및 별점 시스템
- **지도**: 맛집 위치 확인 및 상세 정보 보기

## 🛠️ 기술 스택

- **Frontend**: React 19.1.0
- **Routing**: React Router DOM
- **Maps**: Google Maps API
- **Styling**: CSS3 with Flexbox/Grid
- **State Management**: React Context API

## 📁 프로젝트 구조

```
restaurant-ui/
├── public/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── Navigation.js
│   │   └── Navigation.css
│   ├── context/            # React Context
│   │   └── AuthContext.js
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── RestaurantList.js
│   │   ├── Map.js
│   │   └── *.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.
