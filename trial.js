// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var queryInfoAudible = {
  audible: true,
  currentWindow: true,
  url: 'https://soundcloud.com/*'
};

var queryInfoMuted = {
  audible: false,
  currentWindow: true,
  url: 'https://soundcloud.com/*'
};

function getSoundCloudTabUrl(callback) {

  chrome.tabs.query(queryInfoAudible, (tabs) => {
    var url, id;
    console.log(tabs);
    if (tabs.length){
      var tab = tabs[0];
      var url = tab.url;
      var id = tab.id;
      console.log(url + " " + id);
      callback(url, id);
    } else {
      callback(undefined, undefined);
    }
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
    getSoundCloudTabUrl((url, id) => {
      if (url){
        document.getElementsByClassName('fa-step-forward')[0].addEventListener('click', function () {
          chrome.tabs.executeScript(parseInt(id), {code : codefwd});
        });
        document.getElementsByClassName('fa-play')[0].addEventListener('click', function () {
          chrome.tabs.executeScript(parseInt(id), {code : codepause});
        });
        document.getElementsByClassName('fa-step-backward')[0].addEventListener('click', function () {
          chrome.tabs.executeScript(parseInt(id), {code : codeback});
        });
      } else {
        document.getElementsByClassName('fa-play')[0].addEventListener('click', function () {
          chrome.tabs.query(queryInfoMuted, (tabs) => {
            var tab = tabs[0];
            if (tab){
              var url = tab.url;
              var id = tab.id;
              console.log(url + " " + id);
            } 
            chrome.tabs.executeScript(parseInt(id), {code : codeplay});
          });
        });
      }
    });
});