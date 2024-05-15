export function paginate(htmlDocument, textSize, font) {
  let width = window.innerWidth / 2;
  let margin = 50;
  if (window.innerWidth < 900) {
    width = window.innerWidth;
    margin = 50;
  }
  const height = window.innerHeight - 140;
  return appendChunks(
    getNodes(htmlDocument, width, margin, textSize, height, font),
  );
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
  offscreenDiv.style.fontSize = `${((innerWidth / 20000) * textSize).toString()}em`;
  offscreenDiv.style.fontFamily = font;
  offscreenDiv.style.width = `calc(${(innerWidth - margin).toString()}px - 5%)`;
  document.body.appendChild(offscreenDiv);
  let offscreenRect = offscreenDiv.getBoundingClientRect();
  //console.log("offscreenRect:", offscreenRect);
  const chunks = [];
  let currentChunk = [];
  for (let i = 0; i < offscreenDiv.children.length; i++) {
    let current = offscreenDiv.children[i];
    const currentRect = current.getBoundingClientRect();
    currentChunk.push(current);
    if (currentRect.bottom > offscreenRect.bottom) {
      // current element is overflowing offscreenDiv, remove it from current chunk
      currentChunk.pop();

      if (current.nodeName == "P") {
        //let c = current.querySelector("p");
        //console.log(`par: ${current.innerHTML}`);
        //current.style.color = "red";
        let paragraph = document.createElement("p");
        paragraph.className = "alt";
        let text = "";
        //console.log(`split: ${current.innerHTML.split(" ")}`);
        const words = current.innerHTML.split(" ");
        for (let word of words) {
          text = text.concat(word + " ");
          //console.log(`text: ${text}`);
          paragraph.innerHTML = text;
          //console.log(`rendered: ${paragraph.innerHTML}`);
          console.log(Date.now());
          //currentChunk.push(paragraph);
          current.innerHTML = text;
          let rect = current.getBoundingClientRect();
          if (rect.bottom > offscreenRect.bottom) {
            //currentChunk.pop();
            break;
          }
        }
      }

      // remove all elements in currentChunk from offscreenDiv
      for (const element of currentChunk) {
        element.remove();
      }
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
    for (const element of currentChunk) {
      element.remove();
    }
    chunks.push(currentChunk);
  }
  // offscreenDiv is not needed anymore
  offscreenDiv.remove();
  return { chunks, innerWidth, margin, textSize, font };
}

function appendChunks({ chunks, innerWidth, margin, textSize, font }) {
  const container = document.getElementsByClassName("root_container")[0];
  container.innerHTML = "";
  //const length = chunks.length;
  const visible = [];
  /*
  if (window.innerWidth > 900) {
    visible.push(chunks[index * 2]);
    if (chunks[index * 2 + 1] != null) {
      visible.push(chunks[index * 2 + 1]);
    }
  } else {
    visible.push(chunks[index]);
  }
  */
  for (const chunk of chunks) {
    const page = document.createElement("div");
    page.className = "page";
    //page.style.display = "flex";
    //page.style.flexWrap = "wrap";
    page.style.margin = `0 ${margin / 2}px`;
    page.style.padding = "30px 0";
    page.style.borderTop = "1px solid black";
    page.style.fontSize = `${((innerWidth / 20000) * textSize).toString()}em`;
    page.style.width = `calc(${(innerWidth - margin).toString()}px - 5%)`;
    page.style.fontFamily = font;
    for (const element of chunk) {
      page.appendChild(element);
    }
    //container.appendChild(page);
    visible.push(page);
  }
  return visible;
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
        var color =
          "rgb(" +
          parseInt(Math.random() * 255, 10) +
          ", " +
          parseInt(Math.random() * 255, 10) +
          ", " +
          parseInt(Math.random() * 255, 10) +
          ")";
        content =
          content +
          '<div style="width: ' +
          width +
          "px; height: " +
          height +
          "px; background-color: " +
          color +
          '">' +
          i +
          "</div>";
        break;
    }
  }
  return content;
}
