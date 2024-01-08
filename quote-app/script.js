let quoteCount = 2; // Start from 2 as the first quote is already in HTML

document.getElementById("quoteButton").addEventListener("click", function () {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => response.json())
    .then((data) => {
      let mainContainer = document.querySelector("main");
      let newQuoteParagraph = document.createElement("p");
      newQuoteParagraph.innerHTML = `${quoteCount}. ${data.quote} <span class="author">- ${data.author}</span>`;
      mainContainer.appendChild(newQuoteParagraph); // Append new quote in the main container
      quoteCount++;
    });
});
