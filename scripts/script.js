// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        
        newPost.addEventListener('click', () => {
          let entryNum = entries.indexOf(entry) + 1;
          let entryPage = document.querySelector('body');
          entryPage.setAttribute("class", "single-entry"); 

          setState(`Entry${entryNum}`);
        })
      });
    });

  // document.querySelector('journal-entry').addEventListener('click', () => {
  //   let single = document.querySelector('body');
  //   single.setAttribute("class", "single-entry");

  //   let header = document.querySelector('h1');
  //   header.textContent = "Entry";

  //   setState("single-entry");
  // });
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


// window.addEventListener("") {


