$(function($) {
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
