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
/* ---- Prompt list (prompt/prompt.html) ---- */
async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    }
    catch {
        // Fallback for browsers that block the Clipboard API.
        const helper = document.createElement("textarea");
        helper.value = text;
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        let copied = false;
        try {
            copied = document.execCommand("copy");
        }
        catch {
            copied = false;
        }
        helper.remove();
        return copied;
    }
}
function flashCopyButton(button, copied) {
    const originalLabel = button.textContent;
    button.textContent = copied ? "Copied!" : "Copy failed";
    button.disabled = true;
    window.setTimeout(() => {
        button.textContent = originalLabel;
        button.disabled = false;
    }, 1200);
}
function setUpPromptItem(item) {
    const titleButton = item.querySelector(".prompt-title");
    const copyButton = item.querySelector(".copy-btn");
    const body = item.querySelector(".prompt-body");
    if (titleButton === null || copyButton === null || body === null) {
        return;
    }
    // Clicking the title shows/hides the full prompt wording.
    titleButton.addEventListener("click", () => {
        body.hidden = !body.hidden;
        item.classList.toggle("open", !body.hidden);
        titleButton.setAttribute("aria-expanded", String(!body.hidden));
    });
    // The copy button copies the whole prompt, expanded or not.
    copyButton.addEventListener("click", () => {
        const source = body.querySelector("pre") ?? body;
        const text = (source.textContent ?? "").trim();
        void copyTextToClipboard(text).then((copied) => {
            flashCopyButton(copyButton, copied);
        });
    });
}
function setUpPromptList() {
    document.querySelectorAll(".prompt-item").forEach(setUpPromptItem);
}
renderFooterNote();
logVisit(getPageInfo());
setUpPromptList();
