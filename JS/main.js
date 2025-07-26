const icon = document.getElementById("toggleIcon");
const signUp = document.getElementById("signUp");
const login1 = document.getElementById("login1");
const emailInput = document.getElementById("emailInput");
const passwordlInput = document.getElementById("passwordlInput");
let allData = [];
if (localStorage.getItem("allData") !== null) {
  allData = JSON.parse(localStorage.getItem("allData"));
}
function password() {
  input = passwordlInput;
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
login1.addEventListener("click", function () {
  if (isEmpty()) {
    $(".text").text("All inputs is required").show();
    return;
  }
  if (isExist()) {
    location.replace("Quiz.html");
  } else {
    $(".text").text("Incorrect Email Or Password").show();
  }
});
// **clear all**\\
function clear() {
  emailInput.value = null;
  passwordlInput.value = null;
}
// **is empty**\\
function isEmpty() {
  if (emailInput.value == "" || passwordlInput.value == "") {
    return true;
  } else {
    return false;
  }
}

// **Is Exist**\\
function isExist() {
  for (let i = 0; i < allData.length; i++) {
    if (
      allData[i].email === emailInput.value &&
      allData[i].password === passwordlInput.value
    ) {
      return true;
    }
  }
  return false;
}

signUp.addEventListener("click", function () {
  window.location.href = "signUp.html";
});
