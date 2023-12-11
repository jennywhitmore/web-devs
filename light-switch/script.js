//switch theme states//
document.querySelector(".toggleButton").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const buttonTitle = document.querySelector(".buttonTitle");
  if (document.body.classList.contains("dark")) {
    buttonTitle.textContent = "Good Night!";
  } else {
    buttonTitle.textContent = "Good Day!";
  }
});
