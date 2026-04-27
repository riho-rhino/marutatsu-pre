import $ from "jquery";

export default () => {

  opning();
  function tick(time) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve()
      }, time)
    })
  }

  async function opning() {
    await tick(100);
    $('.hello-marutatsu-top').addClass('move');
    await tick(1100);
    $('.hello-marutatsu-top__title').addClass('show');
    await tick(1100);
    $('.side-pagination,.mySwiper,.my-swiper-pagination,.top-swiper__tag-title,.top-swiper__thumbnail').addClass('show');
    $('.common-header__menu-btn,.common-header__inner').addClass('show');
  };



  function select(selector) {
      return document.querySelector(selector);
  }
  function selectAll(selector) {
      return document.querySelectorAll(selector);
  }
  const accordion = selectAll('.question');

  accordion.forEach((item) => {
      item.addEventListener('click', function() {
          this.classList.toggle('open');
          const accordionContent = this.nextElementSibling;
          if (accordionContent.style.maxHeight) {
          accordionContent.style.maxHeight = null;
          accordionContent.style.overflow = "hidden";
          } else {
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          accordionContent.style.overflow = "auto";
          }
      });
  });
  $(function () {
  const $tabs = $(".ranking-tab");
  const $contents = $(".ranking-content");
  const $tabBg = $(".tab-bg");

  $tabs.on("click", function () {
    $tabs.removeClass("active");
    $(this).addClass("active");

    const index = $tabs.index(this);
    $contents.removeClass("show").eq(index).addClass("show");

    // transformで位置変更
    if ($(this).hasClass("ranking-tab-first")) {
      $tabBg.css("transform", "translate(0, -50%)");
    } else if ($(this).hasClass("ranking-tab-second")) {
      $tabBg.css("transform", "translate(100%, -50%)");
    }
  });

  // 初期状態（リロード時）の位置調整
  if ($(".ranking-tab-first").hasClass("active")) {
    $tabBg.css("transform", "translate(0, -50%)");
  } else if ($(".ranking-tab-second").hasClass("active")) {
    $tabBg.css("transform", "translate(100%, -50%)");
  }
});





// 文字数制限 TOP
function toptruncateResponsiveText(selector) {
  const maxLength = window.innerWidth <= 919 ? 32 : 43;
  $(selector).each(function () {
    const $el = $(this);
    if (!$el.data('original-text')) {
      $el.data('original-text', $el.text().trim());
    }
    const originalText = $el.data('original-text');
    if (originalText.length > maxLength) {
      const toptruncated = originalText.slice(0, maxLength - 1) + '…';
      $el.text(toptruncated);
    } else {
      $el.text(originalText); 
    }
  });
}
toptruncateResponsiveText('.toptruncate');
$(window).on('resize', function () {
  toptruncateResponsiveText('.toptruncate');
});

// 文字数制限 pickup main
function truncateResponsiveText(selector, pcLength, spLength) {
  const maxLength = window.innerWidth <= 919 ? spLength : pcLength;

  $(selector).each(function () {
    const $el = $(this);

    if (!$el.data('original-text')) {
      $el.data('original-text', $el.text().trim());
    }

    const originalText = $el.data('original-text');

    if (originalText.length > maxLength) {
      const truncated = originalText.slice(0, maxLength - 1) + '…';
      $el.text(truncated);
    } else {
      $el.text(originalText);
    }
  });
}
truncateResponsiveText('.truncate', 43, 26);
truncateResponsiveText('.pickupmain-truncate', 61, 41);
$(window).on('resize', function () {
  truncateResponsiveText('.truncate', 43, 26);
  truncateResponsiveText('.pickupmain-truncate', 61, 41);
});

// 文字数制限 pickup
function pickuptruncateResponsiveText(selector) {
  const maxLength = window.innerWidth <= 919 ? 26 : 36;
  $(selector).each(function () {
    const $el = $(this);
    if (!$el.data('original-text')) {
      $el.data('original-text', $el.text().trim());
    }
    const originalText = $el.data('original-text');
    if (originalText.length > maxLength) {
      const pickuptruncated = originalText.slice(0, maxLength - 1) + '…';
      $el.text(pickuptruncated);
    } else {
      $el.text(originalText); 
    }
  });
}

pickuptruncateResponsiveText('.pickuptruncate');
$(window).on('resize', function () {
  pickuptruncateResponsiveText('.pickuptruncate');
});

// 文字数制限 ranking
function rankingtruncateResponsiveText(selector) {
  const maxLength = window.innerWidth <= 919 ? 26 : 43;
  $(selector).each(function () {
    const $el = $(this);
    if (!$el.data('original-text')) {
      $el.data('original-text', $el.text().trim());
    }
    const originalText = $el.data('original-text');
    if (originalText.length > maxLength) {
      const rankingtruncated = originalText.slice(0, maxLength - 1) + '…';
      $el.text(rankingtruncated);
    } else {
      $el.text(originalText); 
    }
  });
}

rankingtruncateResponsiveText('.rankingtruncate');

$(window).on('resize', function () {
  rankingtruncateResponsiveText('.rankingtruncate');
});

$('.common-header__menu-btn').on('click', function(){
  $('.sp-common-header').toggleClass('show');
  $('.common-header__menu-btn').toggleClass('close');
});


$('.sp-common-header a').on('click', function () {
    $('.sp-common-header').removeClass('show');
    $('.common-header__menu-btn').removeClass('close');
});

function scrollFadeIn() {
  $('.fadein').each(function () {
    var elementTop = $(this).offset().top;
    var viewportBottom = $(window).scrollTop() + $(window).height() * 0.7;
    if (elementTop < viewportBottom) {
      $(this).addClass('in');
    }
  });
};
        

function scrollSection() {
$('.top-section').each(function () {
  var elementTop = $(this).offset().top;
  var viewportBottom = $(window).scrollTop() + $(window).height() * 0.7;
  if (elementTop < viewportBottom) {
    $(this).addClass('in');
  }
});
};


$(function () {
  $(window).on({
    'scroll': function () {
      scrollFadeIn();
      scrollSection();
    },
  });
});

}

