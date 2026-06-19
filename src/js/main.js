// Client-side JavaScript entrypoint
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Vite + Nunjucks + Sass template successfully initialized!');
  console.log('✍️ Pretendard GOV CDN font successfully loaded.');
  console.log('⚡ GSAP & ScrollTrigger plugins loaded successfully.');

  // Header scroll interaction
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.backgroundColor = 'rgba(11, 15, 25, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(11, 15, 25, 0.8)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // Hamburger Menu Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNavPanel = document.querySelector('.mobile-nav-panel');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      const isActive = hamburgerBtn.classList.toggle('is-active');
      mobileNavPanel.classList.toggle('is-active');

      if (isActive) {
        // Stagger fade-in links when opening
        gsap.fromTo(mobileNavLinks,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
        );
      } else {
        // Reset link opacity on close
        gsap.to(mobileNavLinks, { opacity: 0, duration: 0.2 });
      }
    });

    // Close menu when clicking link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('is-active');
        mobileNavPanel.classList.remove('is-active');
      });
    });

    // Close menu on resize to desktop view
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        hamburgerBtn.classList.remove('is-active');
        mobileNavPanel.classList.remove('is-active');
        gsap.set(mobileNavLinks, { clearProps: 'all' });
      }
    });
  }

  // Hero Section Load Animations
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero .badge', {
    y: -30,
    opacity: 0,
    duration: 0.8,
  })
    .from('.hero-title', {
      y: 40,
      opacity: 0,
      duration: 1,
    }, '-=0.5')
    .from('.hero-desc', {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.6')
    .from('.hero-actions .btn', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
    }, '-=0.5');

  // Features Grid ScrollTrigger Animation
  gsap.from('.feature-card', {
    scrollTrigger: {
      trigger: '.features',
      start: 'top 80%', // Animates when top of features section reaches 80% viewport height
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
  });

  // Swiper Slider91 Initialization
  const sliderElement = document.querySelector('#slider91');
  if (sliderElement) {
    sliderElement.classList.add('swiper');

    // Count slides and update display
    const slides = sliderElement.querySelectorAll('.swiper-slide');
    const slideCount = slides.length;

    // 팝업존 슬라이드 카운트 표시 (하단 상태표시)
    const countDisplay = document.querySelector('.wrap-pop .pop-state em');
    if (countDisplay) countDisplay.textContent = slideCount;

    const hiddenCountDisplay = document.querySelector('.wrap-pop h2.hidden b');
    if (hiddenCountDisplay) hiddenCountDisplay.textContent = slideCount;

    // 헤더 POPUP 버튼 숫자 업데이트
    const headerPopBtn = document.querySelector('#btnOpenPop');
    const headerPopNum = headerPopBtn && headerPopBtn.querySelector('.num');
    if (headerPopNum) headerPopNum.textContent = slideCount;
    // 팝업이 없으면 버튼 자체를 숨김
    if (headerPopBtn && slideCount === 0) headerPopBtn.style.display = 'none';

    // ─── 슬라이드 개수별 동작 결정 ───────────────────────────
    // 3개 이상 : 2개씩 표시 + 1개씩 자동슬라이딩
    // 2개       : 2개 동시 표시 + 자동슬라이딩 없음
    // 1개       : 1개 표시     + 자동슬라이딩 없음
    let perView, useAutoplay, useLoop;

    if (slideCount >= 3) {
      perView = 2;
      useAutoplay = true;
      useLoop = true;
    } else if (slideCount === 2) {
      perView = 2;
      useAutoplay = false;
      useLoop = false;
    } else {
      perView = 1;
      useAutoplay = false;
      useLoop = false;
    }

    const popSlider = new Swiper('#slider91', {
      modules: [Navigation, Autoplay],
      loop: useLoop,
      slidesPerView: perView,
      spaceBetween: 24,
      autoplay: useAutoplay
        ? { delay: 3000, disableOnInteraction: false }
        : false,
      navigation: {
        nextEl: '.wrap-pop .control .next',
        prevEl: '.wrap-pop .control .prev',
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 16 },
        768: { slidesPerView: perView, spaceBetween: 20 },
      },
    });

    // 플레이 / 정지 버튼 연동
    const popPlayWrap = document.querySelector('.wrap-pop .pop-play');
    if (popPlayWrap) {
      const stopBtn = popPlayWrap.querySelector('.stop');
      const playBtn = popPlayWrap.querySelector('.play');

      if (!useAutoplay) {
        // 자동슬라이딩 없으면 버튼 숨김 (CSS 기본값이 none이므로 그대로 유지)
        popPlayWrap.style.display = 'none';
      } else {
        // 3개 이상 → 버튼 표시
        popPlayWrap.style.display = 'inline-block';

        // 정지 버튼 → autoplay 중단
        stopBtn && stopBtn.addEventListener('click', () => {
          popSlider.autoplay.stop();
          stopBtn.classList.remove('on');
          playBtn && playBtn.classList.add('on');
        });
        // 재생 버튼 → autoplay 재개
        playBtn && playBtn.addEventListener('click', () => {
          popSlider.autoplay.start();
          playBtn.classList.remove('on');
          stopBtn && stopBtn.classList.add('on');
        });
      }
    }
  }

  // Popup Close & Today Hide LocalStorage Handler
  const popupWrap = document.querySelector('.wrap-pop');
  if (popupWrap) {
    const popupId = popupWrap.id;
    const hideKey = `hide_popup_${popupId}`;

    // Check if user set "today hide"
    const hideExpiry = localStorage.getItem(hideKey);
    const now = new Date().getTime();
    if (hideExpiry && now < parseInt(hideExpiry)) {
      popupWrap.classList.remove('on');
    }

    const popCloseBtn = popupWrap.querySelector('.btn-close');
    const todayCheckbox = popupWrap.querySelector('.pop-today input[type="checkbox"]');

    if (popCloseBtn) {
      popCloseBtn.addEventListener('click', () => {
        if (todayCheckbox && todayCheckbox.checked) {
          // Set expiry to 24 hours from now
          const expiryTime = now + 24 * 60 * 60 * 1000;
          localStorage.setItem(hideKey, expiryTime.toString());
        }
        popupWrap.classList.remove('on');
      });
    }

    // Allow clicking on the "오늘하루 열지않기" text area to toggle checkbox
    const todayText = popupWrap.querySelector('.pop-today');
    if (todayText && todayCheckbox) {
      todayText.addEventListener('click', (e) => {
        if (e.target !== todayCheckbox) {
          todayCheckbox.checked = !todayCheckbox.checked;
        }
      });
    }

    // 헤더 POPUP 버튼 클릭 → 팝업 재오픈
    const openPopBtn = document.querySelector('#btnOpenPop');
    if (openPopBtn) {
      openPopBtn.addEventListener('click', () => {
        // localStorage 숨김 상태 초기화 후 팝업 표시
        localStorage.removeItem(hideKey);
        popupWrap.classList.add('on');
      });
    }
  }
});
