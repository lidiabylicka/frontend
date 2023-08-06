const toLogin = document.querySelector(".toLogin");
toLogin.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

const subtitle = document.querySelector(".subtitle");
const email = localStorage.getItem("email");
const name = localStorage.getItem("firstName");
const surname = localStorage.getItem("lastName");

const femaleGreeting = (name) => {
  let femalegreeting = "Droga ";
  const penultimateLetter = name[name.length - 2];
  const thirdFromEndLetter = name[name.length - 3];
  const fourthFromEndLetter = name[name.length - 4];
  const consonantsRegex = /^[bcdfghjklmnpqrstvwxyz]$/i;
  if (
    penultimateLetter.toLowerCase() === "l" &&
    thirdFromEndLetter.toLowerCase() === "i"
  ) {
    const nameWithoutLastLetter = name.slice(0, -1);
    const newLastLetter = "o";
    const newName = nameWithoutLastLetter + newLastLetter;
    return femalegreeting + newName;
  } else if (
    penultimateLetter.toLowerCase() === "l" ||
    (penultimateLetter.toLowerCase() === "i" &&
      consonantsRegex.test(thirdFromEndLetter) &&
      consonantsRegex.test(fourthFromEndLetter))
  ) {
    const nameWithoutLastLetter = name.slice(0, -1);
    const newLastLetter = "u";
    const newName = nameWithoutLastLetter + newLastLetter;
    return femalegreeting + newName;
  } else {
    const nameWithoutLastLetter = name.slice(0, -1);
    const newLastLetter = "o";
    const newName = nameWithoutLastLetter + newLastLetter;
    return femalegreeting + newName;
  }
};
// male names were too complicated to do the greeting thing
const greetingByGender = (name) => {
  let greeting;
  const lastLetter = name[name.length - 1];
  if (lastLetter.toLowerCase() === "a" && name !== "Kuba") {
    greeting = femaleGreeting(name);
  } else {
    greeting = `Dzięki, ${name}`;
  }
  return greeting;
};
const greeting = greetingByGender(name);

const successRegistrationMessage = `${greeting}, wysłaliśmy właśnie do Ciebie link na adres: ${email}. Otwórz link,
by móc dokończyć rejestrację i dokonać logowania.`;

function confirmationPageMessage() {
  if (email) {
    subtitle.innerHTML = successRegistrationMessage;
  }
  window.addEventListener("beforeunload", () => {
    localStorage.clear();
  });
}
confirmationPageMessage();
