// avoid blinking content
document.body.classList.add('mm-hidden');

// emergency open content
setTimeout(function() {
  document.body.classList.remove('mm-hidden');
}, 1E3);
/***
 * Watch when object is changed. ie11 compatibility
 * @param key {string}
 * @param context {Object}
 * @param callback {Function}
 */
const watch = function(key, context = window, callback) {
  let savedValue;
  Object.defineProperty(context, key, {
    configurable: true,
    get: function() {
      return savedValue;
    },
    set: function(value) {
      savedValue = value;
      callback(value);
    },
  });
};

/***
 * Add async script
 * @param src {string}
 */
const addScript = function(src) {
  const script = document.createElement('script');
  script.setAttribute('src', src);
  document.body.appendChild(script);
};

addScript('./jquery.min.js');

// wait when jq will be loaded. The logic can be changed when we use AMD model or client have jq on site above our script
watch('$', window, function($) {
  $('body')
    .append('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
    // show content after dom manipulation
    .removeClass('mm-hidden');

  const $mainSectionChildren = $('body > header + section:first')
    .addClass('main-section')
    .find('>section');

  $mainSectionChildren.eq(0)
    .addClass('homepage-poster')
    .find('>section:first')
    .addClass('homepage-poster__content');

  $mainSectionChildren.eq(1).addClass('member-experiences-section');
  $mainSectionChildren.eq(2).addClass('member-benefit-section');

  $('.member-experiences-section, .member-benefit-section').find('> div > div').addClass('section-content');

  $('.member-benefit-section span[href]').each(function() {
    const html = $(this).html();
    const href = $(this).attr('href');
    $(`<a class="member-benefit-section__card" href="${href}">${html}</a>`).replaceAll(this);
  });

  $('.member-benefit-section__card')
    .parent()
    .addClass('member-benefit-section__card-list');

  $('.member-experiences-section a:has(h3)')
    .addClass('member-experiences-section__card')
    .parent()
    .addClass('member-experiences-section__card-list');


  // normalize logo
  $('footer div > img[src$="logo.png"]')
    .wrap('<div><a href="#"></a></div>')
    .parent();

  // add class for logo element
  $('div:has(> a > img[src$="logo.png"])').addClass('logo');

  // add classes for group of list in footer
  const $footerContent = $('footer div:has(>h4)')
    .parent().addClass('footer-content')
    .find('>div');

  $footerContent.eq(0).addClass('logo-wrapper');
  $footerContent.eq(1).addClass('resources-list');
  $footerContent.eq(2).addClass('trip-inspiration-list');


  // convert footer links to list
  $('.resources-list, .trip-inspiration-list')
    .find('h4:has(>a)').each(function() {
    const $list = $('<ul class="footer-links"></ul>');
    $(this).find('a')
      .wrap('<li></li>').closest('li')
      .appendTo($list);
    $list.replaceAll(this);
  });

  // Sticky header
  $(window).scroll(function() {
    const $header = $('body > header');
    if ($(this).scrollTop() > $header.height()) {
      $header.addClass('header--sticky');
    } else {
      $header.removeClass('header--sticky');
    }
  });
});
