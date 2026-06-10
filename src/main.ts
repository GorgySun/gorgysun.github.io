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

renderFooterNote();
logVisit(getPageInfo());
