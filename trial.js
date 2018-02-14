
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
    if (tabs.length === 0)
      return;
    var tab = tabs[0];
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
var play = "playControl sc-ir playControls__control playControls__play";
var like = "sc-button-like playbackSoundBadge__like";
var shuffle = "shuffleControl sc-ir m-shuffling";
var repeatclass = "repeatControl sc-ir";
var repeatnone = "repeatControl sc-ir m-none";
var repeatone = "repeatControl sc-ir m-one";
var repeatall = "repeatControl sc-ir m-all";
var codefwd = 'document.getElementsByClassName("' + fwd + '")[0].click();';
var codeback = 'document.getElementsByClassName("' + back + '")[0].click();';
var codepause = 'document.getElementsByClassName("' + pause + '")[0].click();';
var codeplay = 'document.getElementsByClassName("' + play + '")[0].click();';
var coderepeat = 'document.getElementsByClassName("' + repeatclass + '")[0].click();';
var codelike = 'document.getElementsByClassName("' + like + '")[0].title';
var countshuffle = 'document.getElementsByClassName("' + shuffle + '").length;';
var countrepeatnone = 'document.getElementsByClassName("' + repeatnone + '").length;';
var countrepeatone = 'document.getElementsByClassName("' + repeatone + '").length;';
var countrepeatall = 'document.getElementsByClassName("' + repeatall + '").length;';
var codeshuffle = 'document.getElementsByClassName("shuffleControl sc-ir")[0].click();';
var likeclick = 'document.getElementsByClassName("' + like + '")[0].click();';
var artist = 'document.getElementsByClassName("playbackSoundBadge__lightLink sc-link-light sc-truncate")[0].title';
var song = 'document.getElementsByClassName("playbackSoundBadge__titleLink sc-truncate")[0].title';

document.addEventListener('DOMContentLoaded', function () {
  
  getSoundCloudTabUrl((title, id, audible) => {
    console.log("hello")
    chrome.tabs.executeScript(parseInt(id), {code : artist}, function(x){
      if(x.length != 0){
        $('h2').text(x[0]);
      }
    });
    chrome.tabs.executeScript(parseInt(id), {code : song}, function(x){
      if(x.length != 0){
        $('h3').text(x[0]);
      }
    });
    if (title.indexOf('SoundCloud') >= 0){
      $('.play-btn').removeClass("fa-pause");
      $('.play-btn').addClass("fa-play");
    } else {
      $('.play-btn').removeClass("fa-play");
      $('.play-btn').addClass("fa-pause");
    }
    chrome.tabs.executeScript(parseInt(id), {code : codelike}, function(x){
      if(x[0] == 'Unlike'){
        if ( $('.like').hasClass("active") ) {
          console.log("nothing")
        } else {
          $('.like').addClass("active");
        }
      } else {
        if ( $('.like').hasClass("active") ) {
          $('.like').removeClass("active");
        }
      }
    });
    chrome.tabs.executeScript(parseInt(id), {code : countshuffle}, function(x){
      console.log(x);
      if(x[0] === 1){
        if ( $('.shuffle').hasClass("active") ) {
          console.log("nothing");
        } else {
          console.log("something");
          $('.shuffle').addClass("active");
        }
      } else {
        if ( $('.shuffle').hasClass("active") ) {
          $('.shuffle').removeClass("active");
        }
      }
    });
    chrome.tabs.executeScript(parseInt(id), {code : countrepeatnone}, function(x){
      console.log(x  + "1ii");
      if(x[0] === 0){
        chrome.tabs.executeScript(parseInt(id), {code : countrepeatone}, function(x){
          console.log(x  + "2ii");
          if (x[0] === 0) {
            console.log(x  + "3ii");
            if ( $('.repeat').hasClass("active") ) {
              console.log("nothing");
            } else {
              $('.repeat').addClass("active");
            }
            if ( $('.cond-repeat').hasClass("fa-repeat") ) {
              $('.cond-repeat').removeClass("fa-repeat");
              $('.cond-repeat').addClass("fa-refresh");
            }
          } else {
            if ( $('.repeat').hasClass("active") ) {
              console.log("nothing");
            } else {
              console.log("something");
              $('.repeat').addClass("active");
            }
            if ( $('.cond-repeat').hasClass("fa-refresh") ) {
              $('.cond-repeat').removeClass("fa-refresh");
              $('.cond-repeat').addClass("fa-repeat");
            }
          }
        });
      } else {
        if ( $('.repeat').hasClass("active") ) {
          $('.repeat').removeClass("active");
        }
        if ( $('.cond-repeat').hasClass("fa-refresh") ) {
          $('.cond-repeat').removeClass("fa-refresh");
          $('.cond-repeat').addClass("fa-repeat");
        }
      }
    });
    document.getElementsByClassName('cond-repeat')[0].addEventListener('click', function () {
      chrome.tabs.executeScript(parseInt(id), {code : coderepeat});
      setTimeout(window.location.reload(), 1000);
    });
    document.getElementsByClassName('fa-random')[0].addEventListener('click', function () {
      chrome.tabs.executeScript(parseInt(id), {code : codeshuffle});
      setTimeout(window.location.reload(), 1000);
    });
    document.getElementsByClassName('fa-heart')[0].addEventListener('click', function () {
      chrome.tabs.executeScript(parseInt(id), {code : likeclick});
      setTimeout(window.location.reload(), 1000);
    });
    document.getElementsByClassName('fa-step-forward')[0].addEventListener('click', function () {
      chrome.tabs.executeScript(parseInt(id), {code : codefwd});
      setTimeout(window.location.reload(), 1000);
    });
    document.getElementsByClassName('fa-step-backward')[0].addEventListener('click', function () {
      chrome.tabs.executeScript(parseInt(id), {code : codeback});
      setTimeout(window.location.reload(), 1000);
    });
    if (title.indexOf('SoundCloud') >= 0){
      document.getElementsByClassName('play-btn')[0].addEventListener('click', function () {
        chrome.tabs.executeScript(parseInt(id), {code : codeplay});
        setTimeout(window.location.reload(), 1000);
      });
    } else {
      document.getElementsByClassName('play-btn')[0].addEventListener('click', function () {
        chrome.tabs.executeScript(parseInt(id), {code : codepause});
        setTimeout(window.location.reload(), 1000);
      });
    }
  });
});