// Site script. Source of truth for /assets/main.js — rebuild with:
//   npx -p typescript tsc -p tsconfig.json

interface PageInfo {
  title: string;
  path: string;
}

function getPageInfo(): PageInfo {
  return {
    title: document.title,
    path: window.location.pathname,
  };
}

function renderFooterNote(): void {
  const el = document.getElementById("footer-note");
  if (el === null) {
    return;
  }
  const year: number = new Date().getFullYear();
  el.textContent = `© ${year} Gorgy Sun · built with HTML + TypeScript`;
}

function logVisit(info: PageInfo): void {
  console.log(`Viewing "${info.title}" at ${info.path}`);
}

/* ---- Prompt list (prompt/prompt.html) ---- */

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
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
    } catch {
      copied = false;
    }
    helper.remove();
    return copied;
  }
}

function flashCopyButton(button: HTMLButtonElement, copied: boolean): void {
  const originalLabel = button.textContent;
  button.textContent = copied ? "Copied!" : "Copy failed";
  button.disabled = true;
  window.setTimeout(() => {
    button.textContent = originalLabel;
    button.disabled = false;
  }, 1200);
}

function setUpPromptItem(item: HTMLElement): void {
  const titleButton = item.querySelector<HTMLButtonElement>(".prompt-title");
  const copyButton = item.querySelector<HTMLButtonElement>(".copy-btn");
  const body = item.querySelector<HTMLElement>(".prompt-body");
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

function setUpPromptList(): void {
  document.querySelectorAll<HTMLElement>(".prompt-item").forEach(setUpPromptItem);
}

renderFooterNote();
logVisit(getPageInfo());
setUpPromptList();
