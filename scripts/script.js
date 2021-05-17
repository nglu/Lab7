// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        // this is where 'click' on entry happens ------------------------
        newPost.addEventListener('click', () => {
          let entryNum = entries.indexOf(entry) + 1;
          let entryPage = document.querySelector('body');
          entryPage.setAttribute("class", "single-entry"); 

          let header = document.querySelector('h1');
          header.textContent = `Entry ${entryNum}`;

          document.querySelector('entry-page').remove();
          let singleEntry = document.createElement('entry-page');
          singleEntry.entry = entry;
          document.querySelector('body').appendChild(singleEntry);

          setState(`entry${entryNum}`);
        })
        // ----------------------------------------------------------------
      });
    });
});

document.querySelector("img[src='settings.svg']").addEventListener('click', () => {
  let settings = document.querySelector('body');
  settings.setAttribute("class", "settings");
  
  let header = document.querySelector('h1');
  header.textContent = "Settings";

  setState("settings");
});

document.querySelector("h1").addEventListener('click', () => {
  let page = document.querySelector('body');
  page.removeAttribute("class");
  
  let header = document.querySelector('h1');
  header.textContent = "Journal Entries";

  setState("tittle");
});

window.onpopstate = function(event){
  alert(event);
};


