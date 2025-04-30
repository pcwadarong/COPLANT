# 🌿 Coplant

> 식물에 대해 몰라도 괜찮아요.\
> 초보자도 기르기 쉬운 식물을 쉽고 직관적으로 찾고, 추천받고, 알아가는 경험.\
> **Coplant**는 식물 입문자를 위한 식물 큐레이팅 서비스입니다.

## 🌟 About

**Coplant**는 식물 키우기에 익숙하지 않은 사람들을 위해\
간편한 퀴즈, 필터, 설명 중심의 UI를 통해\
자신에게 맞는 식물을 추천받고 구매로 이어지는 웹 서비스입니다.

- 🧩 퀴즈/선호 기반 필터링 추천
- 📝 접근성 있는 상품 설명
- 🛒 장바구니 담기 및 주문 유도
- 📱 반응형 UI 디자인

## ⚙️ 주요 기능

### 🌱 상품 리스트 페이지

- 이름 또는 조건(광, 온도, 습도, 물주기 등) 기반 검색
- 태그 기반 필터링 (`#초보추천`, `#빛이 적어도 되는` 등)
- 검색 결과 기반 동적 필터 적용

### 🌼 상품 상세 페이지

- 식물 설명, 학명, 난이도, 이미지 정보 제공
- 장바구니에 수량 조정 후 담기
- 반응형 및 시각적으로 풍부한 레이아웃

### 📩 인증 기능

- Firebase Auth 및 Firebase Admin SDK 연동
- 로그인, 회원가입, 로그아웃, 비밀번호 재설정 가능

### 🧪 테스트 기반 추천

- 응답자의 선호도에 따라 가장 적합한 식물을 추천
- 직관적인 선택지와 사용자 친화적 인터페이스 제공

### 🛠️ 관리자 페이지

- Firebase Custom Claim을 통해 권한이 부여된 관리자만 접근 가능
- 상품 추가 및 수정 기능 포함

## 💪 기술 스택

### 📆 Framework & Libraries

- Next.js
- React
- Firebase / Firebase Admin SDK
- Framer Motion (인터렉션, 모션)
- Zod (유효성 검증)
- Tailwind CSS (스타일링)

### 🔧 Dev Tools

- TypeScript
- Flat + ESlint-only (Stylistic)
- Vercel (배포)
- Git, GitHub

## 📁 주요 폴더 구조 예시

```bash
/src
  /actions                 # 서버 액션 모음 (Firebase 인증 및 상품 처리 등)
    auth.ts
    create-product.ts
    get-product.ts
    update-product.ts
  /api/revalidate
    route.ts               # revalidate용 API 라우트
  /app                     # 페이지 라우팅 구조 (App Router 기반)
    /admin                 # 관리자 전용 페이지
      /product             # 상품 등록/수정 관련 페이지
        /new               # 신규 상품 등록
          page.tsx
          add-product-button.tsx
          admin-product.tsx
        /[id]/edit         # 기존 상품 수정
          edit-form.tsx
          page.tsx
    /product               # 사용자 상품 관련 페이지
      /[id]                # 상품 상세 페이지
        cart-action.tsx
        floating-image.tsx
        info-block.tsx
        main-section.tsx   # 클라이언트 UI 렌더링
        page.tsx           # 서버 데이터 페칭
      filter.tsx           # 필터 컴포넌트
      list-item.tsx        # 상품 카드
      page.tsx             # 상품 리스트
    /sign                  # 인증 관련 페이지
      /find-password       # 비밀번호 재설정
        page.tsx
      sign-in-form.tsx     # 로그인 폼
      sign-up-form.tsx     # 회원가입 폼
      layout.tsx           # 네비/푸터 포함 레이아웃
      moving-leaf.tsx      # 메인 페이지 배경 모션
      page.tsx             # 메인 페이지 진입점
      template.tsx         # 로딩 애니메이션 템플릿
    /test                  # 테스트 기반 추천 페이지
      /result              # 테스트 결과 페이지
        page.tsx           # 서버 데이터
        product.tsx
        result-client.tsx  # 클라이언트 UI 렌더링
      page.tsx
    /constants             # 고정 상수 모음
      filter-options.ts    # 필터 옵션
      preset-tags.ts       # 태그 프리셋
      product-init.ts      # 상품 초기값
      questions.ts         # 테스트 질문/선지
  /components
    /common                # 공통 UI 컴포넌트 (버튼, 인풋 등)
      button.tsx
      checkbox.tsx
      counter.tsx
      file-input.tsx
      go-to-top.tsx
      label-input.tsx
      radio.tsx
      searchBar.tsx
    /admin                 # 관리자 UI 컴포넌트
      filter-selector.tsx  # 필터 항목 선택
      form-field.tsx       # 텍스트 필드 섹션
      image-uploader.tsx   # 이미지 업로드
      tag-selector.tsx     # 태그 선택 필드
    /nav                   # 내비게이션 컴포넌트
      cart.tsx
      drawer.tsx
      hamburger.tsx
      nav-auth.tsx         # 인증 상태별 메뉴
      navigation.tsx
  /contexts
    AuthContext.tsx        # 인증 상태 관리 컨텍스트
  /hooks
    useAddProductForm.ts   # 상품 등록 커스텀 훅
    useEditProductForm.ts  # 상품 수정 커스텀 훅
    useLockBodyScroll.ts   # drawer 열림 시 스크롤 잠금
  /lib
    /firebase              # Firebase 관련 설정 및 함수들
      product/
        create.ts          # 상품 등록
        delete.ts          # 상품 삭제
        get.ts             # 상품 불러오기
        update.ts          # 상품 수정
      auth.ts              # 로그인/회원가입 등
      firebaseAdminConfig.ts # 서버 전용 설정
      firebaseConfig.ts      # 클라이언트 전용 설정
    /utils
      filters.ts           # 필터 유틸 함수
      get-matched-product.ts # 테스트 결과 매칭 로직
    /validation
      product-schema.ts    # 상품 유효성 스키마
      sign-schema.ts       # 인증 유효성 스키마
  types.ts                 # 전역 타입 정의
```

## ⏳ 개발 기간

- **2021.06.21** : 디자인 및 기획, html 기반 초안 구현
- **2025.03.26 ~ 2025.04.22** : Next.js, TS로 리팩토링

## 📸 Demo

> 추후 이미지 또는 배포 링크 삽입 예정

## 🔮 향후 계획

- 🧠 사용자 맞춤 추천 퀴즈 강화
- 🌍 i18n 다국어 적용 고려
- 🔎 고급 필터 조건 도입 (예: 공간 유형, 키우는 난이도 등)
- 🧾 실제 주문 기능 연동
- 📦 주문 내역 및 배송 조회 기능
- 💬 사용자 리뷰 및 별점 시스템

