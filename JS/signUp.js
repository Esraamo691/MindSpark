const icon = document.getElementById("toggleIcon");
const signIn = document.getElementById("signIn");
const nameInput = document.getElementById("nameInput");
const signUpEmail = document.getElementById("signUpEmail");
const passwordSignUp = document.getElementById("passwordSignUp");
const signAccess = document.getElementById("signAccess");
let text = document.querySelector(".text");
let inner = document.querySelector(".inner");
let allData = [];
if (localStorage.getItem("allData") !== null) {
  allData = JSON.parse(localStorage.getItem("allData"));
}
console.log(allData);
// **Show password**\\
function password() {
  input = passwordSignUp ;
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
// **is empty**\\
function isEmpty() {
    if (nameInput.value == "" || signUpEmail.value == "" || passwordSignUp.value == "") {
        return true
    } else {
        return false
    }

}
// **Email IsExist**\\
function isExist() {
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].email === signUpEmail.value) {
      return true;
    }
  }
  return false;
}
// **SignUP button**\\
signAccess.addEventListener("click", function () {
  let user = {
    name: nameInput.value,
    email: signUpEmail.value,
    password: passwordSignUp.value,
  };
  if(isEmpty()){
     $(".text").html('<p class="text-danger">All inputs is required</p>')
  }
  if (isExist()) {
    // text.classList.replace("d-none", "d-block");
    $(".text").toggle(500)
    $(".inner").hide();
    return;
  }
  allData.push(user);
  localStorage.setItem("allData", JSON.stringify(allData));
  
  // inner.classList.replace("d-none", "d-block");
   $(".inner").toggle(500)
  $(".text").hide();
  setTimeout(() => {
     window.location.href="index.html";
  }, 1000);
  clear();
});

// **clear all**\\
function clear() {
  nameInput.value = null;
  signUpEmail.value = null;
  passwordSignUp.value = null;
}
signIn.addEventListener("click", function () {
  window.location.href="index.html";
});


