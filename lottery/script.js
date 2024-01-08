//function to get random numbers//
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let numbers = [];

const randomPickButton = document.querySelector(`#randomPickButton`);
const resetButton = document.querySelector(`#resetButton`);

randomPickButton.addEventListener(`click`, function () {
  if (numbers.length < 6) {
    const currentNum = getRandomInt(1, 49);
    const displayNumber = document.createElement(`span`);
    displayNumber.textContent = currentNum + " ";
    document.body.appendChild(displayNumber);
    if (!numbers.includes(currentNum)) {
      numbers.push(currentNum);
    }
  } else {
    alert(`You have already picked 6 numbers.`);
  }
});

resetButton.addEventListener(`click`, function () {
  numbers = [];
  const spans = document.querySelectorAll(`span`);
  spans.forEach((span) => span.remove());
});
