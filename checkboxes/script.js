let checkedCheckboxes = [];

document.querySelectorAll("input[type=checkbox]").forEach(function (checkbox) {
  checkbox.addEventListener("change", handleCheckboxChange);
});

function handleCheckboxChange(event) {
  if (event.target.checked) {
    if (checkedCheckboxes.length === 2) {
      // Uncheck the second checkbox that was checked
      checkedCheckboxes[1].checked = false;
      // Remove the second checkbox from the array
      checkedCheckboxes.splice(1, 1);
    }
    // Add the newly checked checkbox to the array
    checkedCheckboxes.push(event.target);
  } else {
    // Remove the unchecked checkbox from the array
    checkedCheckboxes = checkedCheckboxes.filter(
      (checkbox) => checkbox !== event.target
    );
  }
}
