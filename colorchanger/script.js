// Select the Sliders using querySelector
const redSlider = document.querySelector("#redSlider");
const greenSlider = document.querySelector("#greenSlider");
const blueSlider = document.querySelector("#blueSlider");
const colorValue = document.querySelector(".color-value");
const colorApp = document.querySelector(".color-field");

// Function to update the color based on the slider values
function updateColor() {
  const redValue = redSlider.value; //call html value of each slider. the value property is set in the element and contains a number from 0 to 255.
  const greenValue = greenSlider.value;
  const blueValue = blueSlider.value;

  // Update the text content of the .color-value element with the rgb value
  colorValue.textContent = `RGB: (${redValue}, ${greenValue}, ${blueValue})`;

  // Set background color of color-field to calculated RGB color
  colorApp.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
}

// Add input event listener to all Sliders in order to recognize slider changing
redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);

// Call the program
updateColor();
