// Select the redSlider element using querySelector
const redSlider = document.querySelector("#redSlider");

// Select the greenSlider element using querySelector
const greenSlider = document.querySelector("#greenSlider");

// Select the blueSlider element using querySelector
const blueSlider = document.querySelector("#blueSlider");

// Select the .color-value element using querySelector
const colorValue = document.querySelector(".color-value");

// Select the .color-app element using querySelector
const colorApp = document.querySelector(".color-app");

// Function to update the color based on the slider values
function updateColor() {
  // Get the value of the redSlider
  const redValue = redSlider.value;

  // Get the value of the greenSlider
  const greenValue = greenSlider.value;

  // Get the value of the blueSlider
  const blueValue = blueSlider.value;

  // Convert the RGB values to hexadecimal format
  const colorHex = rgbToHex(redValue, greenValue, blueValue);

  // Update the text content of the .color-value element with the colorHex value
  colorValue.textContent = colorHex;

  // Set the background color of the .color-app element to the calculated RGB color
  colorApp.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
}

// Function to convert RGB values to hexadecimal format
function rgbToHex(r, g, b) {
  // Convert the red value to hexadecimal
  const red = toHex(r);

  // Convert the green value to hexadecimal
  const green = toHex(g);

  // Convert the blue value to hexadecimal
  const blue = toHex(b);

  // Return the hexadecimal color value
  return `#${red}${green}${blue}`;
}

// Function to convert a decimal color value to a 2-digit hexadecimal value
function toHex(color) {
  // Convert the color value to its hexadecimal representation
  const hex = color.toString(16);

  // If the hexadecimal value is single-digit, prepend 0 to make it a 2-digit value
  return hex.length === 1 ? "0" + hex : hex;
}

// Add an input event listener to the redSlider that triggers the updateColor function
redSlider.addEventListener("input", updateColor);

// Add an input event listener to the greenSlider that triggers the updateColor function
greenSlider.addEventListener("input", updateColor);

// Add an input event listener to the blueSlider that triggers the updateColor function
blueSlider.addEventListener("input", updateColor);

// Initialize the color on page load
updateColor();
