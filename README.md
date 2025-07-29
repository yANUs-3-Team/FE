# 몽글몽글 상상나래 (MGMG-FRONT)

## 1. 프로젝트 개요

본 프로젝트는 React 기반의 사용자 참여형 동화 생성 플랫폼입니다. 사용자는 단계별 UI를 통해 동화의 핵심 요소를 직접 설정하고, 이를 기반으로 동화를 생성, 저장, 공유할 수 있습니다.

## 2. 기술 스택 및 주요 라이브러리

- **Core:** React.js (v19.1.0)
- **Routing:** React Router DOM (v6.30.1) - SPA(Single Page Application)의 동적 라우팅 관리
- **HTTP Client:** Axios (v1.10.0) - 백엔드 API 서버와의 비동기 통신
- **UI/UX:** Ant Design (v5.26.2), React-Pageflip (v2.0.3) - UI 컴포넌트 및 동화책 넘김 효과 구현
- **Testing:** React Testing Library - 컴포넌트 단위 테스트
- **Build Tool:** Create React App (react-scripts v5.0.1)

## 3. 프로젝트 아키텍처 및 구조

### 3.1. 디렉토리 구조

```
/src
├───component/      # 재사용 가능한 UI 컴포넌트 (Header, Footer 등)
│   ├───create/     # 동화 생성 단계별 컴포넌트
│   └───Css/        # 컴포넌트/페이지별 CSS 스타일시트
├───images/         # 정적 이미지 에셋
├───pages/          # 라우팅의 단위가 되는 페이지 레벨 컴포넌트
├───App.js          # 최상위 컴포넌트, 라우팅 설정
└───index.js        # 애플리케이션 진입점
```

### 3.2. 컴포넌트 기반 아키텍처

- **페이지 컴포넌트 (`/pages`):** 각 URL 경로에 해당하는 메인 뷰를 구성합니다. (예: `Create.js`, `MyGallery.js`)
- **재사용 컴포넌트 (`/component`):** Header, Footer와 같이 여러 페이지에서 공통으로 사용되는 UI 요소를 모듈화했습니다.
- **기능별 컴포넌트 (`/component/create`):** 동화 생성(`Create`) 페이지처럼 복잡한 기능을 가진 페이지는 내부적으로 여러 하위 컴포넌트로 분리하여 관리의 용이성과 재사용성을 높였습니다. (예: `NameInputPage`, `GenreSelectPage`)

### 3.3. 상태 관리

- React Hooks (`useState`)를 사용하여 컴포넌트의 지역 상태를 관리합니다.
- `Create.js` 컴포넌트에서는 동화 생성에 필요한 모든 사용자 입력(이름, 성격, 장르 등)을 `useState`로 관리하며, `pageIndex` 상태를 통해 단계별 UI를 동적으로 렌더링하는 Wizard 패턴을 사용합니다.

### 3.4. 라우팅

- `react-router-dom`을 사용하여 SPA를 구현했습니다.
- `App.js`에서 모든 라우트(`'/'`, `'/join'`, `'/create'` 등)를 정의하고, 각 경로에 해당하는 페이지 컴포넌트를 매핑합니다.
- 페이지 간 이동은 `useNavigate` 훅을 사용하여 프로그래밍 방식으로 처리합니다.

## 4. 주요 기능 및 데이터 흐름

### 4.1. 동화 생성 (`Create.js`)

1.  **사용자 입력:** `pageIndex` 상태에 따라 7단계의 입력 컴포넌트가 순차적으로 렌더링됩니다. 각 단계에서 사용자가 입력한 값은 상위 `Create` 컴포넌트의 상태(`name`, `personality` 등)에 저장됩니다.
2.  **데이터 취합:** 마지막 `SummaryPage` 단계에서 모든 상태 값을 취합하여 사용자에게 보여줍니다.
3.  **API 요청:** '동화 만들기' 버튼 클릭 시, `handleStorySubmit` 함수가 실행됩니다. 이 함수는 `axios.post`를 사용하여 백엔드 서버의 `http://localhost:3000/api/story` 엔드포인트로 동화 설정 데이터를 전송합니다.
4.  **결과 처리:** API 요청 성공 시, 응답으로 받은 `storyId`를 `loading` 페이지로 전달하며, 사용자는 로딩 화면으로 이동합니다.

### 4.2. 갤러리 (`MyGallery.js`, `OpenGallery.js`)

1.  **데이터 로딩 (현재 Mock):** 현재는 `Array.from`을 사용하여 Mock 데이터를 생성하고 있습니다. 실제 구현 시에는 백엔드 API를 통해 사용자별/공개 동화 목록 데이터를 비동기적으로 가져와야 합니다.
2.  **페이지네이션:** 대량의 데이터를 효율적으로 보여주기 위해 클라이언트 사이드 페이지네이션 로직이 구현되어 있습니다. `currentPage` 상태를 기반으로 현재 페이지에 표시할 아이템들을 계산하여 렌더링합니다.
3.  **상세 보기:** 각 동화책의 '읽기' 버튼 클릭 시, `useNavigate`를 통해 해당 동화의 `story-viewer` 페이지로 이동합니다.

## 5. 로컬 개발 환경 설정

### 5.1. 사전 요구사항

- Node.js (v18.x 이상 권장)
- npm (v9.x 이상 권장)

### 5.2. 설치 및 실행

```bash
# 1. 프로젝트 클론
# git clone [repository_url]

# 2. 프로젝트 루트 디렉토리로 이동
cd FE

# 3. 의존성 패키지 설치
npm install

# 4. 개발 서버 실행
npm start
```

애플리케이션은 `http://localhost:3000`에서 실행됩니다.

## 6. 보안 고려사항

- **API 엔드포인트:** 현재 소스 코드에 `http://localhost:3000`이 하드코딩되어 있습니다. 실제 배포 시에는 `.env` 파일을 사용하여 환경 변수로 관리해야 합니다. (`REACT_APP_API_URL`)
- **인증/인가:** 현재 사용자 인증(로그인) 및 인가(페이지 접근 제어) 기능이 구현되어 있지 않습니다. '나의 갤러리'와 같은 개인화된 기능을 위해서는 JWT(JSON Web Token) 등을 이용한 인증 시스템 도입이 필요합니다.
- **입력 값 검증:** 악의적인 스크립트 입력을 방지하기 위해 사용자 입력 값에 대한 클라이언트 및 서버 사이드의 엄격한 검증(Validation) 로직이 추가되어야 합니다.