import $ from "jquery";
import style from "./_modules/_style";
import header from "./_modules/_header";

style();
header();

// ✅ 元スライド数取得
const originalSlides = document.querySelectorAll('.mySwiper .swiper-slide');
const originalSlideCount = originalSlides.length;

// ✅ スライド複製（for .swiper-thumbs 用）
function duplicateSlides(selector, repeat = 10) {
  const wrapper = document.querySelector(selector);
  if (!wrapper) return;

  const originalSlides = Array.from(wrapper.children);
  for (let r = 1; r < repeat; r++) {
    originalSlides.forEach((slide, index) => {
      const clone = slide.cloneNode(true);
      clone.setAttribute("data-swiper-original-index", index);
      wrapper.appendChild(clone);
    });
  }
}
const repeatFactor = (originalSlideCount === 2 || originalSlideCount === 3) ? 40 : 30;
duplicateSlides('.swiper-thumbs .swiper-wrapper', repeatFactor);

// ✅ サムネイル用 Swiper（非操作）
const swiperThumbs = new Swiper('.swiper-thumbs', {
  loop: false,
  slidesPerView: 'auto',
  centeredSlides: true,
  allowTouchMove: false,
  spaceBetween: window.innerWidth >= 919 ? 32 : 14,
  speed: 1000
});

// ✅ アクティブバレットにSVGを追加（描画アニメ付き）
const svgMarkup = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="active-svg">
  <circle class="svg-elem-1" opacity="1" cx="11.9799" cy="11.9799" r="10.9799" stroke="#A1E4F6" stroke-width="2" />
</svg>
`;

function updatePaginationSVG() {
  // 全バレットのSVG削除
  document.querySelectorAll('.my-swiper-pagination .swiper-pagination-bullet .active-svg')
    .forEach(el => el.remove());

  // アクティブなバレットにSVG挿入＋.activeでアニメ
  const activeBullet = document.querySelector('.my-swiper-pagination .swiper-pagination-bullet-active');
  if (activeBullet) {
    activeBullet.insertAdjacentHTML('beforeend', svgMarkup);
    setTimeout(() => {
      const svg = activeBullet.querySelector('svg');
      if (svg) svg.classList.add('active');
    }, 30);
  }
}

// ✅ スライド位置の表示更新
function updateFraction(swiper) {
  const currentEl = document.querySelector('.custom-fraction .current');
  const totalEl = document.querySelector('.custom-fraction .total');
  if (currentEl && totalEl) {
    currentEl.textContent = swiper.realIndex + 1;
    totalEl.textContent = swiper.slides.length - swiper.loopedSlides * 2;
  }
}

// ✅ AのrealIndexに最も近いスライドをBで中央表示
function slideToClosestMatchingThumb(swiperThumbs, targetIndex) {
  const currentThumbIndex = swiperThumbs.activeIndex;
  const allThumbSlides = swiperThumbs.slides;

  let bestMatchIndex = -1;
  let minDistance = Infinity;

  allThumbSlides.forEach((slide, i) => {
    const orig = slide.dataset.swiperOriginalIndex;
    if (parseInt(orig) === targetIndex) {
      const distance = Math.abs(i - currentThumbIndex);
      if (distance < minDistance) {
        minDistance = distance;
        bestMatchIndex = i;
      }
    }
  });

  if (bestMatchIndex >= 0) {
    swiperThumbs.slideTo(bestMatchIndex, 1000);
  }
}

// ✅ メインスライダー Swiper（mySwiper）
const swiper = new Swiper('.mySwiper', {
  loop: true,
  loopedSlides: originalSlideCount,
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.my-swiper-pagination',
    clickable: true
  },
  on: {
    init: function () {
      updateFraction(this);
      updatePaginationSVG(); // ← SVG追加
    },
    slideChange: function () {
      updateFraction(this);
      slideToClosestMatchingThumb(swiperThumbs, this.realIndex);
      updatePaginationSVG(); // ← SVG更新
    },
    paginationUpdate: function () {
      updatePaginationSVG(); // ← 念のため
    }
  }
});

// ✅ 横スライド用 Swiper（lineup-swiper）
const lineupSwiper = new Swiper(".lineup-swiper", {
  loop: true,
  spaceBetween: window.innerWidth >= 919 ? 15 : 7,
  slidesPerView: window.innerWidth >= 919 ? 4 : 1.3,
  speed: 6000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
  },
});