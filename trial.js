
// $('.play-btn').click(function() {
//   if ( $(this).hasClass("fa-play") ) {
//     $(this).removeClass("fa-play");
//     $(this).addClass("fa-pause");
//   } else {
//     $(this).removeClass("fa-pause");
//     $(this).addClass("fa-play");
//   }
// });

$('.column').click(function() {
  $(this).toggleClass("active");
})

var queryInfo = {
  currentWindow: true,
  url: 'https://soundcloud.com/*'
};

function getSoundCloudTabUrl(callback) {

  chrome.tabs.query(queryInfo, (tabs) => {
    var url, id, audible;
    var tab = tabs[0];
    console.log(tabs);
    title = tab.title;
    id = tab.id;
    audible = tab.audible;
    console.log(title + " " + id + " " + audible);
    callback(title, id, audible);
  });
}

var fwd = "skipControl sc-ir playControls__control playControls__next skipControl__next";
var back = "skipControl sc-ir playControls__control playControls__prev skipControl__previous";
var pause = "playControl sc-ir playControls__control playControls__play playing";
var play = "playControl sc-ir playControls__control playControls__play"
var codefwd = 'document.getElementsByClassName("' + fwd + '")[0].click();';
var codeback = 'document.getElementsByClassName("' + back + '")[0].click();';
var codepause = 'document.getElementsByClassName("' + pause + '")[0].click();';
var codeplay = 'document.getElementsByClassName("' + play + '")[0].click();';

document.addEventListener('DOMContentLoaded', function () {
  
  getSoundCloudTabUrl((title, id, audible) => {
    console.log("hello")
    if (title.indexOf('SoundCloud') >= 0){
      $('.play-btn').removeClass("fa-pause");
      $('.play-btn').addClass("fa-play");
    } else {
      var rest = title.substring(0, title.lastIndexOf("by")).trim();
      var last = title.substring(title.lastIndexOf("by") + 2, title.length).trim();
      $('h2').text(last);
      $('h3').text(rest);
      $('.play-btn').removeClass("fa-play");
      $('.play-btn').addClass("fa-pause");
    }
    document.getElementsByClassName('fa-step-forward')[0].addEventListener('click', function () {
      chrome.tabs.executeScript(parseInt(id), {code : codefwd});
      window.location.reload();
    });
    document.getElementsByClassName('fa-step-backward')[0].addEventListener('click', function () {
      chrome.tabs.executeScript(parseInt(id), {code : codeback});
      window.location.reload();
    });
    if (title.indexOf('SoundCloud') >= 0){
      document.getElementsByClassName('play-btn')[0].addEventListener('click', function () {
        chrome.tabs.executeScript(parseInt(id), {code : codeplay});
        window.location.reload();
      });
    } else {
      document.getElementsByClassName('play-btn')[0].addEventListener('click', function () {
        chrome.tabs.executeScript(parseInt(id), {code : codepause});
        window.location.reload();
      });
    }
  });
});