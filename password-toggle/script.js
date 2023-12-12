document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.querySelector("#password");
  const showPasswordButton = document.querySelector("#showPasswordButton");

  showPasswordButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showPasswordButton.value = "Hide Password";
    } else {
      passwordInput.type = "password";
      showPasswordButton.value = "Show Password";
    }
  });
});
