const BASE_LOG_URL = "https://ds-elp2-be.herokuapp.com/auth/login";

const form = document.getElementById("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const pwShowHide = document.querySelectorAll(".pw_hide");

const rememberMe = document.querySelector("#rememberMe");

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
      console.log("blad"); //sprawdzic kiedy NIE istnieje uzytkownik i dodac '.accountDoesntExist label?
    } else {
      localStorage.setItem("access_token", result.access_token);

      window.location = "./profile.html";
    }
  } catch (error) {
    console.error(error);
  }
}
