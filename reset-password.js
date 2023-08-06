const BASE_PROFILE_URL = "https://ds-elp2-be.herokuapp.com/profile";

const form = document.getElementById("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;

const notification = document.querySelector(".notification");
const tick = document.querySelector(".uim-check");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRecoveryForm()) {
    sendRecoveryEmail();
  } else {
    operationFailed("This is not a correct e-mail address");
  }
});

function validateRecoveryForm() {
  let proceed = true;

  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    proceed = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
    proceed = true;
  }

  function shouldProceed(proceed) {
    if (proceed === false) {
      return false;
    }

    return true;
  }
  return shouldProceed(proceed);
}

async function sendRecoveryEmail() {
  try {
    //tu by byla funkcja sprawdzajaca czy email jest w bazie danych?
    operationSuccessful();
    window.location.href = "./reset-password-confirm.html";
  } catch (error) {
    console.error(error);
  }
}

function goToLogin() {
  window.location.href = "./login.html";
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
      window.location = "./profile.html";
    }, 1000);
  }, 2500);
};

const operationFailed = function (message) {
  notification.innerHTML = message;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.add("hide");
    setTimeout(() => {
      notification.classList.remove("show", "hide");
    }, 200);
  }, 3000);
};
