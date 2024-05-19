export function getChunks(fontFamily: string, fontSize: number, spacing: number) {
  let sourceDiv = document.getElementById("source");
  const contentDiv = document.getElementById("root_container");
  let renderDiv = document.getElementById("render");

  contentDiv.innerHTML = "";
  renderDiv.innerHTML = "";

  const viewportHeight = window.innerHeight - 140;
  const viewportWidth = window.innerWidth;

  renderDiv.style.width = `calc(${viewportWidth / 2}px - 10% - 50px)`;
  sourceDiv.style.width = `calc(${viewportWidth / 2}px - 10% - 50px)`;

  renderDiv.style.height = `calc(${viewportHeight}px - 140px)`;
  //sourceDiv.style.height = `calc(${viewportHeight}px - 140px)`;

  renderDiv = style(renderDiv, fontFamily, fontSize, spacing, viewportWidth);
  sourceDiv = style(sourceDiv, fontFamily, fontSize, spacing, viewportWidth);

  const pages: HTMLElement[] = [];

  let currentPage = document.createElement("div");
  currentPage.classList.add("page");
  renderDiv?.appendChild(currentPage);
  pages.push(currentPage);
  let accumulatedHeight = 0;

  for (const node of sourceDiv.children) {
    if (accumulatedHeight + node.clientHeight > viewportHeight) {
      if (node.tagName === "P") {
        const paragraphText = node.textContent.trim();
        const words = paragraphText.split(/\s+/);

        let newParagraph = document.createElement("p");
        if (node.classList.contains("myIndent")) {
          newParagraph.style.textIndent = "50px";
        }
        currentPage.appendChild(newParagraph);

        for (const word of words) {
          newParagraph.textContent += `${word} `;
          if (accumulatedHeight + newParagraph.clientHeight > viewportHeight) {
            const str = newParagraph.textContent.trim();
            const lastIndex = str.lastIndexOf(" ");
            newParagraph.textContent = newParagraph.textContent.slice(
              0,
              lastIndex + 1,
            );
            newParagraph = document.createElement("p");
            newParagraph.textContent += `${word} `;
            currentPage = document.createElement("div");
            currentPage.classList.add("page");
            currentPage.appendChild(newParagraph);
            renderDiv.appendChild(currentPage);
            pages.push(currentPage);
            accumulatedHeight = 0;
          }
        }

        accumulatedHeight += newParagraph.clientHeight;
      } else if (
        node.tagName === "DIV" ||
        node.tagName === "IMG" ||
        node.tagName === "H1" ||
        node.tagName === "H2"
      ) {
        let content = node.cloneNode(true);
        currentPage = document.createElement("div");
        currentPage.classList.add("page");
        currentPage.appendChild(content);
        renderDiv.appendChild(currentPage);
        pages.push(currentPage);
        accumulatedHeight = node.clientHeight;
        if (node.classList.contains("fullPage")) {
          currentPage.style.padding = "0";
          currentPage.style.margin = "0";
          content = fully(content);
        }
      }
    } else {
      let content = node.cloneNode(true);
      currentPage.appendChild(content);
      if (!node.classList.contains("float"))
        accumulatedHeight += node.clientHeight;
      if (content.classList.contains("fullPage")) {
        console.log("Eureka");
        content = fully(content);
      }
    }
  }
  for (const i in pages) {
    pages[i].style.width = "100%";
    //page.style.borderTop = "1px solid blue";
    pages[i].style.height = "100%";

    pages[i] = style(pages[i], fontFamily, fontSize, spacing, viewportWidth);
    if (viewportWidth > 900) {
      if (i % 2 === 0) {
        pages[i].style.padding = "90px 50px 70px 10%";
        if (pages[i].children[0].classList.contains("fullPage")) {
          pages[i].children[0].style.padding = "90px 50px 70px 20%";
        }
      } else {
        pages[i].style.padding = "90px 10% 70px 50px";
        pages[i].style.left = "calc(50% + 1px)";
        if (pages[i].children[0].classList.contains("fullPage")) {
          pages[i].children[0].style.padding = "90px 20% 70px 50px";
        }
      }
    } else {
      pages[i].style.padding = "90px 10%";
      if (pages[i].children[0].classList.contains("fullPage")) {
        pages[i].children[0].style.padding = "90px 10%";
      }
    }
  }
  return Promise.resolve(pages);
}

function style(element: HTMLElement, font: string, fontSize: number, spacing: number, v: number) {
  element.style.position = "absolute";
  if (v > 900) {
  element.style.width = "50%";
  } else {
    element.style.width = "100%";
  }
  element.style.padding = "90px 50px 70px 10%";
  element.style.lineHeight = "1.5";
  element.style.fontFamily = font;
  element.style.fontSize = `${fontSize}px`;
  element.style.letterSpacing = `${spacing}px`;

  return element;
}

function fully(element: HTMLElement) {
  element.style.position = "absolute";
  element.style.width = "calc(100% - 1px)";
  element.style.padding = "90px 10% 70px 10%";
  element.style.height = "100%";
  element.style.top = "0";
  element.style.left = "0";
}

class Page {
  element: HTMLElement;
  alignment: number;

  style(font: string, size: number) {
    element.style.position = "absolute";
    element.style.width = "calc(50%)";
    element.style.padding = "90px 50px 70px 10%";
    element.style.lineHeight = "1.5";
    element.style.fontFamily = font;
    element.style.fontSize = `${size}px`;
  }
}
