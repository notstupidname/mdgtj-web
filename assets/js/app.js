"use strict"

const body = document.querySelector('body');

// Transition effect
let transition = function(e) {
    let href = this.getAttribute('href');
    let target = this.getAttribute('target');
    if (!href || href.indexOf('#') != -1 || href.indexOf('tel') != -1 || href.indexOf('wa.me') != -1 || href.indexOf('mailto') != -1 || target == '_blank')
        return;
    e.preventDefault();
    e.stopPropagation();
    body.classList.add('transition');
    window.setTimeout(function() {
        window.location.href = href;
    }, 50);
}

body.addEventListener('click', function(e) {
    for (let target = e.target; target && target != this; target = target.parentNode) {
        if (target.matches('a')) {
            transition.call(target, e);
            break;
        }
    }
}, false);

// Remove transition if page loaded from bfcache
window.addEventListener('pageshow', function(event) {
    if (event.persisted === true) {
        body.classList.remove('transition');
    }
}, false);

// Loading animation
window.addEventListener('load', function() {
    body.classList.remove('is-loading');
    body.classList.remove('transition');
});

const form = document.querySelector('#form');
const container = document.querySelector('#container');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const url = 'http://orc2.notstupid.name:6969/create';

    let text = this.elements["text"].value;
    text = text.replaceAll("\n", "");
    // console.log(text);

    const payload = {
        title: 'Test title',
        text: text
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    fetch(url, options)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => container.innerHTML = text)
      .catch((error) => console.log(`Could not fetch: ${error}`));
});
