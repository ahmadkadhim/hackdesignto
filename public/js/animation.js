
$('h1, header h2, #signup h2, #why-signup, #form-wrapper, #social').removeClass('animated');

$('h1, header h2').addClass('fadeInDown');
$('#why-signup, #signup h2').addClass('fadeInLeft');
$('#form-wrapper').addClass('fadeInRight');
$('#social').addClass('fadeInUp');


// // Adapted slightly from Sam Dutton
// // Set name of hidden property and visibility change event
// // since some browsers only offer vendor-prefixed support
// var hidden, state, visibilityChange; 
// if (typeof document.hidden !== "undefined") {
//  hidden = "hidden";
//  visibilityChange = "visibilitychange";
//  state = "visibilityState";
// } else if (typeof document.mozHidden !== "undefined") {
//  hidden = "mozHidden";
//  visibilityChange = "mozvisibilitychange";
//  state = "mozVisibilityState";
// } else if (typeof document.msHidden !== "undefined") {
//  hidden = "msHidden";
//  visibilityChange = "msvisibilitychange";
//  state = "msVisibilityState";
// } else if (typeof document.webkitHidden !== "undefined") {
//  hidden = "webkitHidden";
//  visibilityChange = "webkitvisibilitychange";
//  state = "webkitVisibilityState";
// }