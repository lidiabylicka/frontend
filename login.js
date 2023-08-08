const BASE_LOG_URL = "https://ds-elp2-be.herokuapp.com/auth/login";

const form = document.getElementById("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const pwShowHide = document.querySelectorAll(".pw_hide");

const rememberMe = document.querySelector("#rememberMe");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (validateLoginForm()) {
    const body = {
      email: email.value,
      password: password.value,
    };
    if (rememberMe.checked) {
      localStorage.setItem("rememberMe", true);
    } else {
      localStorage.setItem("rememberMe", false);
    }
    login(body);
  } else {
    console.log("ERROR");
  }
});

function validateLoginForm() {
  let proceed = {
    email: true,
    password: true,
  };

  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  const emailRegex = /^[^\s@]+@[^@\s]+\.[^@\s]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[A-Za-z\d@#$%^&+=!]).{8,}$/;

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

  function shouldProceed(proceed) {
    for (let key in proceed) {
      if (!proceed[key]) {
        return false;
      } else {
        return true;
      }
    }
  }
  return shouldProceed(proceed);
}

async function login(body) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "Application/JSON" },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(BASE_LOG_URL, options);
    const result = await response.json();
    console.log(result);

    if (result.message == "Unauthorized") {
      operationFailed();
    } else {
      localStorage.setItem("access_token", result.access_token);
      // localStorage.setItem("firstName", result.firstName);
      operationSuccessful();
    }
  } catch (error) {
    console.error(error);
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
      window.location = "./profile.html";
    }, 1000);
  }, 2500);
};

const operationFailed = function () {
  notification.classList.add("show");
  if (window.matchMedia("(max-width: 600px)").matches) {
    notification.classList.add("show");
    const loginDiv = document.querySelector(".login");
    loginDiv.style.marginTop = "194px";
  }
  if (window.matchMedia("(min-width: 1020px)").matches) {
    notification.classList.add("show");
    const loginDiv = document.querySelector(".registration");
    loginDiv.style.marginTop = "48px";
  }
};
