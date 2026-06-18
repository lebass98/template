# Vite + Nunjucks + Sass (SCSS) 정적 페이지 템플릿 보일러플레이트

본 프로젝트는 초고속 빌드 도구인 **Vite**, 강력한 템플릿 상속 및 컴포넌트화를 지원하는 **Nunjucks**, 그리고 체계적인 스타일 시트 설계를 지원하는 **Sass(SCSS)**를 결합하여 설계된 웹 퍼블리싱 및 정적 페이지 개발용 보일러플레이트입니다. 

대한민국 공공 표준 가이드라인에 맞춘 **Pretendard GOV(정부 표준 서체)**가 기본으로 적용되어 있습니다.

---

## 📂 프로젝트 폴더 구조 (Restructured)

사용자의 요청에 맞추어 최적화된 웹 표준 디렉토리 아키텍처로 리팩토링되어 있습니다.

```text
my-project/
├── index.html              # 메인 HTML 템플릿 파일 (Nunjucks 컴파일 대상)
├── package.json            # 의존성 패키지 및 NPM 실행 스크립트
├── vite.config.js          # Vite 및 Nunjucks, Sass 현대적 빌드 구성 파일
├── dist/                   # npm run build 시 최종 결과물이 컴파일되어 저장되는 폴더
│   ├── index.html          # 최종 컴파일된 메인 HTML
│   ├── css/
│   │   └── main.css        # SCSS 파일이 최종 병합 및 압축되어 생성되는 CSS (해시 없음)
│   └── js/
│       └── index-*.js      # 압축된 최종 클라이언트 자바스크립트
└── src/                    # 개발 전용 원본 소스 폴더
    ├── js/
    │   └── main.js         # 메인 스크립트 파일 (인터랙션 및 콘솔 로그 확인)
    ├── njk/                # Nunjucks 템플릿 전용 폴더
    │   ├── base.njk        # 전체 페이지의 뼈대가 되는 베이스 레이아웃 (Pretendard GOV 로드)
    │   └── components/     # HTML 컴포넌트 폴더
    │       └── card.njk    # Nunjucks 매크로 기반 카드 컴포넌트
    └── scss/               # 스타일 시트 (Sass) 폴더
        ├── main.scss       # 모든 SCSS 파일을 모아서 빌드하는 메인 파일 (CSS 엔트리)
        ├── _config.scss    # 전역 변수(Variables), 믹스인(Mixins) 관리
        ├── _reset.scss     # 브라우저 기본 스타일 초기화(Reset CSS)
        ├── base/           # 공통 기본 스타일 (기본 태그, 바디 폰트 등)
        │   └── _base.scss
        ├── components/     # 재사용 가능한 UI 컴포넌트 스타일
        │   ├── _buttons.scss # 버튼 컴포넌트 스타일
        │   └── _card.scss    # 카드 컴포넌트 스타일
        └── layouts/        # 대형 레이아웃 및 뼈대 구조 스타일
            ├── _header.scss  # 헤더 영역 스타일
            ├── _footer.scss  # 푸터 영역 스타일
            └── _grid.scss    # 그리드, 컨테이너, 애니메이션 키프레임 및 미디어 쿼리
```

---

## 🛠️ 기술 스택 및 핵심 설정 사항

### 1. Vite (v5.x) & 빌드 구성 (`vite.config.js`)
* **해시 없는 CSS 출력**: 기본적으로 Vite는 브라우저 캐시 방지를 위해 빌드 파일 이름 뒤에 해시값(`[name]-[hash].css`)을 붙입니다. 본 프로젝트에서는 배포 및 관리가 용이하도록 **`dist/css/main.css`** 형태로 해시 없이 깔끔하게 빌드되도록 설정을 튜닝했습니다.
* **JS 번들 분리**: 자바스크립트 빌드 파일은 `dist/js/` 경로 밑으로 저장됩니다.

### 2. Nunjucks 템플릿 엔진 (`vite-plugin-nunjucks`)
* **템플릿 컴파일 범위**: 루트 경로의 `index.html`을 포함한 HTML 템플릿 소스 내의 Nunjucks 문법을 컴파일하여 최종 빌드 폴더(`dist/`)에 순수 HTML로 내보냅니다.
* **레이아웃 상속 및 모듈화**: `index.html`은 `src/njk/base.njk` 레이아웃을 확장(`extends`)하며, 공통 마크업 수정이 필요할 경우 base 파일 하나만 수정하면 일괄 반영됩니다.
* **HTML 컴포넌트화 (매크로)**: 
  * `src/njk/components/card.njk`에 매크로 컴포넌트를 구현하여 `index.html`에서 함수처럼 간결하게 호출합니다.
  * 중복 마크업을 완전히 제거하고 속성(`title`, `desc`, `svg`)만 인자로 전달하여 템플릿의 생산성을 극대화했습니다.

### 3. Sass / SCSS 전처리기 (`sass` / `sass-embedded`)
* **현대적 컴파일러 API**: Vite 환경에서 Sass의 최신 규격인 `modern-compiler` API를 사용하도록 선언하여 컴파일 속도를 크게 개선했습니다.
* **경고 메시지 비활성화**: Dart Sass 3.0에서 제거될 예정인 `@import` 문법에 대한 감지 경고 메시지를 `silenceDeprecations: ['import']` 설정을 통해 무시 처리하여, 빌드 및 개발 콘솔을 깨끗하게 유지해 줍니다.
* **체계적인 스타일 분할**: ITCSS/7-1 패턴을 축소 적용하여 설정, 리셋, 기본, 컴포넌트, 레이아웃을 파일 단위로 쪼개어 가독성과 유지보수성이 뛰어납니다.

### 4. Pretendard GOV 서체 (CDN 적용)
* 공공 서비스 환경(KRDS 가이드라인 등)에 유연하게 대응하고 식별성을 보장하기 위해 기존 Pretendard의 가독성 및 위변조 방지 기능이 강화된 공공용 글꼴인 **Pretendard GOV**가 기본 로드되어 있습니다.
* `src/njk/base.njk` 헤더 영역에서 jsDelivr CDN을 통해 로드되며, `src/scss/_config.scss` 변수 설정을 통해 프로젝트 전체 글꼴로 연동되어 작동합니다.

---

## 🚀 실행 및 빌드 명령어

프로젝트 설치 완료 후, 아래의 터미널 명령어들을 활용해 즉각적으로 개발 및 배포를 수행할 수 있습니다.

### 1. 패키지 설치
처음 개발을 시작할 때 최초 1회 의존성 모듈을 설치합니다.
```bash
npm install
```

### 2. 로컬 개발 서버 실행 (HMR 지원)
수정 사항이 실시간으로 브라우저에 반영되는 개발 모드를 켭니다.
```bash
npm run dev
```
* 기본 포트는 `5173`이며, 이미 사용 중일 경우 자동으로 `5174` 등으로 전환되어 실행됩니다.

### 3. 배포용 빌드 (압축 및 번들링)
운영 및 배포 환경에 올리기 위한 최종 최적화 정적 파일을 생성합니다.
```bash
npm run build
```
* 빌드 완료 후 루트에 생성되는 `dist/` 폴더 안의 파일들(`index.html`, `css/main.css`, `js/`)을 서버에 업로드하시면 서비스가 바로 배포됩니다.

### 4. 빌드 결과물 미리보기
빌드된 `dist/` 파일을 기준으로 정적 서버를 열어 최종 배포물이 잘 동작하는지 실시간 검증합니다.
```bash
npm run preview
```
