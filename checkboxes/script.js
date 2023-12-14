// Create an empty array to store the checked checkboxes
let checkedCheckboxes = [];

// Select all the checkbox input elements on the page and add an event listener to each of them
document.querySelectorAll("input[type=checkbox]").forEach(function (checkbox) {
  checkbox.addEventListener("change", handleCheckboxChange);
});

// Define a function to handle the change event on checkboxes
function handleCheckboxChange(event) {
  // Check if the checkbox is being checked
  if (event.target.checked) {
    // Check if there are already 2 checkboxes checked
    if (checkedCheckboxes.length === 2) {
      // Uncheck the second checkbox that was checked
      checkedCheckboxes[1].checked = false;
      // Remove the second checkbox from the array
      checkedCheckboxes.splice(1, 1);
    }
    // Add the newly checked checkbox to the array
    checkedCheckboxes.push(event.target);
  } else {
    // If the checkbox is being unchecked
    // Remove the unchecked checkbox from the array
    checkedCheckboxes = checkedCheckboxes.filter(
      (checkbox) => checkbox !== event.target
    );
  }
}
