"use strict";
// Site script. Source of truth for /assets/main.js — rebuild with:
//   npx -p typescript tsc -p tsconfig.json
function getPageInfo() {
    return {
        title: document.title,
        path: window.location.pathname,
    };
}
function renderFooterNote() {
    const el = document.getElementById("footer-note");
    if (el === null) {
        return;
    }
    const year = new Date().getFullYear();
    el.textContent = `© ${year} Gorgy Sun · built with HTML + TypeScript`;
}
function logVisit(info) {
    console.log(`Viewing "${info.title}" at ${info.path}`);
}
renderFooterNote();
logVisit(getPageInfo());
