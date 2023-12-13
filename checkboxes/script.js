const checkboxes = document.querySelectorAll('input[type="checkbox"]');

function handleCheckboxChange(event) {
  let checkedCount = 0;
  let lastCheckedIndex = null;

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      checkedCount++;
      lastCheckedIndex = index;
    }
  });

  if (checkedCount > 2) {
    checkboxes[lastCheckedIndex].checked = false;
  }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckboxChange);
});
