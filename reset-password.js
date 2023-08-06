const BASE_PROFILE_URL = "https://ds-elp2-be.herokuapp.com/profile";

const form = document.getElementById("form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRecoveryForm()) {
    sendRecoveryEmail();
  } else {
    console.error(error);
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
// da sie? need to tap in to api FIRST
async function sendRecoveryEmail() {
  try {
    const emailToCheck = email.value;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Bearer ${emailToCheck}`,
    //   },
    // };
    const url = `${BASE_PROFILE_URL}?email=${encodeURIComponent(emailToCheck)}`;
    const response = await fetch(url);

    if (!response.ok) {
      // The email does not exist
      console.error("Email not found or an error occurred.");
      return;
    }
    const result = await response.json();
    window.location.href = "./reset-password-confirm.html";
  } catch (error) {
    console.error(error);
  }
}
