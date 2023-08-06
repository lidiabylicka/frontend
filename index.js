const BASE_URL = "https://ds-elp2-be.herokuapp.com/";
const BASE_REG_URL = "https://ds-elp2-be.herokuapp.com/auth/register";
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const terms = document.getElementById("terms");
const pwShowHide = document.querySelectorAll(".pw_hide");
const notification = document.querySelector(".notification");
const tick = document.querySelector(".uim-check");

//show and hide password functionality
pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

function validateRegisterForm() {
  let proceed = {
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    terms: true,
  };

  //for validation errors divs:
  const firstNameError = document.querySelector("#firstNameError");
  const lastNameError = document.querySelector("#lastNameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const termsError = document.querySelector("#termsError");
  //regexy
  const firstNameRegex = /^[A-Z][a-z]{1,19}$/;
  const lastNameRegex = /^[A-Z][a-z]{1,19}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!£])(?=.*[A-Za-z\d@#$%^&+=!£]).{8,}$/;

  if (!firstNameRegex.test(firstName.value)) {
    firstName.classList.add("error");
    firstNameError.classList.add("visible");
    proceed.firstName = false;
  } else {
    firstName.classList.remove("error");
    firstNameError.classList.remove("visible");
    proceed.firstName = true;
  }

  if (!lastNameRegex.test(lastName.value)) {
    lastName.classList.add("error");
    lastNameError.classList.add("visible");
    proceed.lastName = false;
  } else {
    lastName.classList.remove("error");
    lastNameError.classList.remove("visible");
    proceed.lastName = true;
  }

  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    proceed.email = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
    proceed.email = true;
  }

  if (!passwordRegex.test(password.value)) {
    password.classList.add("error");
    passwordError.classList.add("visible");
    proceed.password = false;
  } else {
    password.classList.remove("error");
    passwordError.classList.remove("visible");
    proceed.password = true;
  }

  if (!terms.checked) {
    terms.classList.add("error");
    termsError.classList.add("visible");
    proceed.terms = false;
  } else {
    terms.classList.remove("error");
    termsError.classList.remove("visible");
    proceed.terms = true;
  } //wszystkie ify

  function shouldProceed(proceed) {
    for (let key in proceed) {
      if (!proceed[key]) {
        return false;
      }
    }
    return true;
  }
  return shouldProceed(proceed);
}
//above that everything works
//-------------------------------------------------------------------------

//przesylanie formularza

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validateRegisterForm()) {
    registerForm();
  } else {
    console.log("error page");
  }
});

async function registerForm() {
  const body = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  localStorage.setItem("firstName", firstName.value);
  localStorage.setItem("lastName", lastName.value);
  localStorage.setItem("email", email.value);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  const response = await fetch(BASE_REG_URL, options);

  if (
    response.status === 202 ||
    response.status === 201 ||
    response.status === 200
  ) {
    const result = await response.json();
    console.log(result);
    operationSuccessful();
  } else if (response.status === 403) {
    operationFailed(
      `<p>Taki user istnieje, uzyj innego emaila. Zapomniales hasla?</p> <a href="./reset-password.html">Kliknij tutaj</a>`
    );
  } else {
    window.location = "./error404.html";
  }
}

const operationSuccessful = function () {
  const main = document.querySelector("main");
  const popUp = document.getElementById("popup");
  const popUpTick = document.querySelector(".popup-tick");
  const loader = document.querySelector(".loader");
  main.classList.add("blur");
  popUp.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
    popUpTick.style.display = "block";
    setTimeout(() => {
      window.location.href = "./confirm-email.html";
    }, 1000);
  }, 2500);
};

const operationFailed = function (message) {
  notification.innerHTML = message;
  notification.classList.add("show");
  if (window.matchMedia("(max-width: 600px)").matches) {
    notification.classList.add("show");
    const registrationDiv = document.querySelector(".registration");
    registrationDiv.style.marginTop = "194px";
  }
  if (window.matchMedia("(min-width: 1020px)").matches) {
    notification.classList.add("show");
    const registrationDiv = document.querySelector(".registration");
    registrationDiv.style.marginTop = "48px";
  }
};
