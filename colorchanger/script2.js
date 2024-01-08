// Select the Sliders using querySelector
const redSlider = document.querySelector("#redSlider");
const greenSlider = document.querySelector("#greenSlider");
const blueSlider = document.querySelector("#blueSlider");
const randomButton = document.querySelector("#random-button");
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

// Function to fetch a random color from the API
function fetchRandomColor() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Bad Network response");
      }
      return response.json();
    })
    //Use the fetched color to directly change the display color
    .then((data) => {
      colorValue.textContent = `RGB: ${data.color}`;
      colorApp.style.backgroundColor = data.color;
    })
    .catch((error) => {
      console.error(`Failed to fetch color:`, error);
    });
}

// Add input event listener to all Sliders and buttons as to recognize slider changing or button click
redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);
randomButton.addEventListener("click", fetchRandomColor);

// Call the program
updateColor();
