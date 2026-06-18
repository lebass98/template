# 개발 규칙 및 가이드라인 (CLAUDE.md / 규칙.md)

본 파일은 AI 어시스턴트가 프로젝트 소스 코드를 편집하고 개발을 수행할 때 반드시 준수해야 하는 규칙과 가이드라인입니다.

---

## 🛠️ 실행 및 빌드 명령 (Build & Dev Commands)

- **의존성 설치**: `npm install`
- **로컬 개발 실행**: `npm run dev`
- **프로덕션 빌드**: `npm run build`
- **로컬 서버 미리보기**: `npm run preview`

---

## 📂 프로젝트 폴더 구조 규칙

모든 신규 파일 추가 및 스타일, 컴포넌트 추가 시 아래의 정해진 구조 규칙을 지켜야 합니다.

- **HTML 엔트리**: 메인 `index.html`은 반드시 프로젝트 **루트(Root)**에 위치시킵니다.
- **Nunjucks 템플릿**:
  - 레이아웃 파일은 `src/njk/` 내에 생성합니다. (기본 레이아웃: `src/njk/base.njk`)
  - 재사용 컴포넌트는 `src/njk/components/` 폴더 내에 **매크로(Macro)** 형태로 작성합니다. (예: `card.njk`)
- **Sass (SCSS)**:
  - 스타일 시트 구조는 `src/scss/` 아래에 다음 구조를 준수하여 세분화합니다:
    - `_config.scss`: 전역 변수 및 믹스인 정의
    - `_reset.scss`: 기본 초기화 스타일
    - `base/_base.scss`: 기본 태그 스타일
    - `components/`: 개별 UI 컴포넌트 스타일 (`_buttons.scss`, `_card.scss` 등)
    - `layouts/`: 주요 레이아웃 스타일 (`_header.scss`, `_footer.scss`, `_grid.scss` 등)
  - 모든 파일은 `src/scss/main.scss`에서 통합 관리되어 일괄 `@import` 및 컴파일되어야 합니다.
- **자바스크립트**: `src/js/` 폴더를 사용합니다. (엔트리: `main.js`)

---

## 🎨 코드 스타일 및 구현 제약 사항

### 1. Nunjucks 컴포넌트 개발 규칙
- 중복되는 요소가 발생할 경우 HTML을 하드코딩하지 말고, 반드시 `src/njk/components/` 경로에 Nunjucks 매크로(`.njk`) 컴포넌트를 정의하고 `index.html` 등에서 호출하여 사용해야 합니다.
- 컴포넌트 호출 경로 작성 시 Nunjucks 템플릿 루트(`src/`)를 기준으로 작성해야 하므로, 반드시 `"src/njk/components/..."` 형태로 경로를 선언합니다.

### 2. Sass (SCSS) 개발 규칙
- 변수 사용 시 개별 파일에 선언하지 말고 `src/scss/_config.scss`에 집중 정의한 후 이를 활용합니다.
- `@import` 사용 시 발생하는 Dart Sass의 감지 경고는 `vite.config.js`의 `silenceDeprecations: ['import']`로 제어하므로 안심하고 `@import` 문법을 사용합니다.
- 컴포넌트나 레이아웃 스타일 변경 시, 반드시 각 분류에 맞는 partial 파일(예: `_card.scss`, `_header.scss` 등)을 수정한 다음 `main.scss`에서 올바르게 불러와야 합니다.

### 3. Pretendard GOV 서체 의무화
- 프로젝트 전체의 기본 폰트 패밀리는 **Pretendard GOV**를 최우선 순위로 사용합니다.
- CSS 상에서 다음 규칙을 준수하여 상속합니다:
  ```css
  font-family: "Pretendard GOV", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  ```

### 4. ⚠️ KRDS 클래스 사용 금지 제약 (필수)
- 한국건강가정진흥원(FCES) 프로젝트 등 정부 가이드라인 작업 시, 사용자의 명시적인 승인/요청이 없는 한 **KRDS 관련 프레임워크 클래스(예: `krds-radio` 등)를 절대로 사용하지 않습니다**.
- UI 컴포넌트를 구현할 때는 커스텀 CSS 및 커스텀 클래스를 사용하여 독립적으로 마크업해야 합니다.
