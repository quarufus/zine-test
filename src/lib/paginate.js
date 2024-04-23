import {document, createElement} from "$app/environment"

function generateRandomContent() {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  let content = "";
  // we will generate 100 random elements displaying their index to keep track of what's happening
  for (let i = 0; i < 100; i++) {
    const type = Number.parseInt(Math.random() * 2, 10);
    switch (type) {
      case 0: // text, generates and random p block
        content = content + "<p>" + i + " ";
        var numWords = 10 + parseInt(Math.random() * 50, 10);
        for (var j = 0; j < numWords; j++) {
          var numLetters = 2 + parseInt(Math.random() * 15, 10);
          if (j > 0) {
            content = content + " ";
          }
          for (var k = 0; k < numLetters; k++) {
            content = content + alpha[parseInt(Math.random() * 26, 10)];
          }
          
        }
        content = content + "</p>";
        break;
      case 1: // colored div, generates a div of random size and color
        var width = 30 + parseInt(Math.random() * 20, 10) * 10;
        var height = 30 + parseInt(Math.random() * 20, 10) * 10;
        var color = "rgb(" + parseInt(Math.random() * 255, 10) + ", " + parseInt(Math.random() * 255, 10) + ", " + parseInt(Math.random() * 255, 10) + ")";
        content = content + '<div style="width: ' + width + 'px; height: ' + height + 'px; background-color: ' + color + '">' + i + '</div>';
        break;
       
    }
  }
  return content;
}

export function getNodeChunks(htmlDocument) {
  const offscreenDiv = document.createElement('div');
  offscreenDiv.className = 'page';
  offscreenDiv.style.position = 'absolute';
  offscreenDiv.style.top = '-3000px';
  offscreenDiv.innerHTML = htmlDocument;
  offscreenDiv.display = 'flex';
  offscreenDiv.flexWrap = 'wrap';
  document.body.appendChild(offscreenDiv);
  let offscreenRect = offscreenDiv.getBoundingClientRect();
  // console.log('offscreenRect:', offscreenRect);
  const chunks = [];
  let currentChunk = []
  for (let i = 0; i < offscreenDiv.children.length; i++) {
    const current = offscreenDiv.children[i];
    const currentRect = current.getBoundingClientRect();
    currentChunk.push(current);
    if (currentRect.bottom > (offscreenRect.bottom)) {
      // current element is overflowing offscreenDiv, remove it from current chunk
      currentChunk.pop();
      // remove all elements in currentChunk from offscreenDiv
      currentChunk.forEach(elem => elem.remove());
      // since children were removed from offscreenDiv, adjust i to start back at current eleme on next iteration
      i -= currentChunk.length;
      // push current completed chunk to the resulting chunklist
      chunks.push(currentChunk);
      // initialise new current chunk
      currentChunk = [current];
      offscreenRect = offscreenDiv.getBoundingClientRect();
    }
  }
  // currentChunk may not be empty but we need the last elements
  if (currentChunk.length > 0) {
    currentChunk.forEach(elem => elem.remove());
    chunks.push(currentChunk);
  }
  // offscreenDiv is not needed anymore
  offscreenDiv.remove();
  return chunks;
}

export function appendChunksToPages(chunks) {
    const container = document.getElementsByClassName('root_container')[0];
    chunks.forEach((chunk, index) => {
      // ex of a page header
      const header = document.createElement('div');
      header.innerHTML = '<h4 style="margin: 5px">Page ' + (index + 1) + '</h4>';
      container.appendChild(header);
      const page = document.createElement('div');
      page.className = 'page';
      chunk.forEach(elem => page.appendChild(elem));
      container.appendChild(page);
    });
}

// generateRandom content outputs raw html, getNodeChunks returns
// an array of array of elements, the first dimension is the set of
// pages, the second dimension is the set of elements in each page
// finally appendChunks to pages generates a page for each chunk 
// and adds this page to the root container
appendChunksToPages(getNodeChunks(generateRandomContent()));


	function getNodes(htmlDocument) {
		const offscreenDiv = document.createElement("div");
		offscreenDiv.className = "page";
		offscreenDiv.style.position = "absolute";
		offscreenDiv.style.top = "-3000px";
		offscreenDiv.innerHTML = htmlDocument;
		offscreenDiv.style.display = "flex";
		offscreenDiv.style.flexWrap = "wrap";
		offscreenDiv.style.height = "700px";
		offscreenDiv.style.fontSize = (innerWidth / 100).toString() + "px";
		offscreenDiv.style.width = (innerWidth / 2).toString() + "px";
		document.body.appendChild(offscreenDiv);
		let offscreenRect = offscreenDiv.getBoundingClientRect();
		console.log("offscreenRect:", offscreenRect);
		const chunks = [];
		let currentChunk = [];
		for (let i = 0; i < offscreenDiv.children.length; i++) {
			const current = offscreenDiv.children[i];
			const currentRect = current.getBoundingClientRect();
			currentChunk.push(current);
			if (currentRect.bottom > offscreenRect.bottom) {
				// current element is overflowing offscreenDiv, remove it from current chunk
				currentChunk.pop();
				// remove all elements in currentChunk from offscreenDiv
				currentChunk.forEach((elem) => elem.remove());
				// since children were removed from offscreenDiv, adjust i to start back at current eleme on next iteration
				i -= currentChunk.length;
				// push current completed chunk to the resulting chunklist
				chunks.push(currentChunk);
				// initialise new current chunk
				currentChunk = [current];
				offscreenRect = offscreenDiv.getBoundingClientRect();
			}
		}
		// currentChunk may not be empty but we need the last elements
		if (currentChunk.length > 0) {
			currentChunk.forEach((elem) => elem.remove());
			chunks.push(currentChunk);
		}
		// offscreenDiv is not needed anymore
		//offscreenDiv.remove();
		return chunks;
	}
	export function appendChunks(chunks) {
		const container = document.getElementsByClassName("root_container")[0];
		chunks.forEach((chunk, index) => {
			// ex of a page header
			const header = document.createElement("div");
			header.innerHTML =
				'<h4 style="margin: 5px">Page ' + (index + 1) + "</h4>";
			container.appendChild(header);
			const page = document.createElement("div");
			page.className = "page";
			page.style.width = "50%";
			page.style.fontSize = (innerWidth / 100).toString() + "px";
			chunk.forEach((elem) => page.appendChild(elem));
			container.appendChild(page);
		});
	}



	function splitIntoPages() {
		const book = document.querySelector(".root_container");
		//const ccontent = book.innerHtml;
		//book.innerHtml = "";

		const pageHeight = 700;
		let currentPage = 1;
		let currentHeight = 0;
		let totalPages = 0;
		let newPage = createPage(currentPage);

		const paragraphs = content.split("<p>");

		for (let i = 0; i < paragraphs.length; i++) {
			const paragraph = paragraphs[i];
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = "<p>" + paragraph;
			book.appendChild(tempDiv);

			const paragraphHeight = tempDiv.clientHeight;

			console.log(paragraphHeight);

			if (currentHeight > pageHeight) {
				currentPage++;
				totalPages++;
				newPage = createPage(currentPage);
				book.appendChild(newPage);
				currentHeight = 0;
			}

			currentHeight += paragraphHeight;
			newPage.appendChild(tempDiv);
		}

		totalPages++;
		book.setAttribute("data-pages", totalPages);
	}

	function createPage(number) {
		const page = document.createElement("div");
		page.classList.add("page");
		page.setAttribute("data-page", number);
		page.style.height = "700px";
		page.style.boxSizing = "border-box";
		page.style.padding = "20px";
		page.style.breakInside = "avoid";
		page.style.width = (innerWidth / 2).toString() + "px";
		//page.style.float = "left";
		return page;
	}
