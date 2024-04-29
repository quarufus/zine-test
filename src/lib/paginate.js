//import {document} from "$app/environment"

export function paginate(htmlDocument, index, textSize, font) {
	let width = window.innerWidth / 2;
	let margin = 200;
	if (window.innerWidth < 900) {
		width = window.innerWidth;
		margin = 50;
	}
	const height = window.innerHeight - 140;
	return appendChunks(getNodes(htmlDocument, width, margin, textSize, height, font), index); //!TODO Add font
}

function getNodes(htmlDocument, innerWidth, margin, textSize, height, font) {
	const offscreenDiv = document.createElement("div");
	offscreenDiv.className = "page";
	offscreenDiv.style.position = "absolute";
	offscreenDiv.style.top = "-3000px";
	offscreenDiv.innerHTML = htmlDocument;
	//offscreenDiv.style.display = "flex";
	//offscreenDiv.style.flexWrap = "wrap";
	offscreenDiv.style.margin = `0 ${margin / 2}px`;
	offscreenDiv.style.padding = "30px 0";
	offscreenDiv.style.borderTop = "1px solid black";
	offscreenDiv.style.height = `${height}px`;
	offscreenDiv.style.fontSize =
		`${((innerWidth / 20000) * textSize).toString()}em`;
	offscreenDiv.style.fontFamily = font;
	offscreenDiv.style.width = `${(innerWidth - margin).toString()}px`;
	document.body.appendChild(offscreenDiv);
	let offscreenRect = offscreenDiv.getBoundingClientRect();
	//console.log("offscreenRect:", offscreenRect);
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
		for (const element of currentChunk) {element.remove()};
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
		for (const element of currentChunk) {element.remove()};
			chunks.push(currentChunk);
	}
	// offscreenDiv is not needed anymore
	offscreenDiv.remove();
	return { chunks, innerWidth, margin, textSize, font };
}

function appendChunks({ chunks, innerWidth, margin, textSize, font }, index) {
	const container = document.getElementsByClassName("root_container")[0];
	container.innerHTML = "";
	const length = chunks.length;
	const visible = [];
	if (window.innerWidth > 900) {
		visible.push(chunks[index * 2]);
		if (chunks[(index * 2) + 1] != null) {
			visible.push(chunks[(index * 2)+ 1]);
		}
	} else {
		visible.push(chunks[index]);
	}
	for (const chunk of visible) {
		const page = document.createElement("div");
		page.className = "page";
		//page.style.display = "flex";
		//page.style.flexWrap = "wrap";
		page.style.margin = `0 ${margin / 2}px`;
		page.style.padding = "30px 0";
		page.style.borderTop = "1px solid black";
		page.style.fontSize =
			`${((innerWidth / 20000) * textSize).toString()}em`;
		page.style.width = `${(innerWidth - margin).toString()}px`;
		page.style.fontFamily = font;
		for (const element of chunk) {page.appendChild(element)};
			container.appendChild(page);
	};
	return length;
}

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
