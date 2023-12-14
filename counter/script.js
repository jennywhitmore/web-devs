// Initialize the counter to 0
let counter = 0;

// Initialize the color counter to 0
let colorCounter = 0;

// Get the label element from the document
const label = document.querySelector("label");

// Function to increase the counter and update the display
function increaseCounter() {
  counter++; // Increment the counter by 1
  label.innerText = counter; // Update the text of the label with the new counter value

  colorCounter++; // Increment the color counter
  if (colorCounter === 101) {
    // Reset the color counter to 1 when it reaches 101
    colorCounter = 1;
  }
  main.style.setProperty("--counter", colorCounter + "%"); // Update the custom property (--counter) of the main element to change the background color
}

// Get the main element from the document
const main = document.querySelector("main");

// Add a click event listener to the main element, which calls the increaseCounter function when clicked
main.addEventListener("click", increaseCounter);

// Function to reset the counter and color counter
function resetCounter() {
  counter = 0; // Reset the counter to 0
  colorCounter = 0; // Reset the color counter to 0
  label.innerText = counter; // Update the text of the label to show the reset counter value
  main.style.setProperty("--counter", 0 + "%"); // Reset the custom property (--counter) of the main element to set the background color back to 0%
  button.blur(); // Remove focus from the reset button
}

// Get the button element from the document
const button = document.querySelector("button");

// Add a click event listener to the button element, which calls the resetCounter function when clicked
button.addEventListener("click", resetCounter);

// Add a keypress event listener to the document, which calls the increaseCounter function when the Enter or Space key is pressed
document.addEventListener("keypress", function (e) {
  if (["Enter", " "].includes(e.key)) {
    // Check if the pressed key is Enter or Space
    increaseCounter(); // Call the increaseCounter function
  }
});
