const access_token = localStorage.getItem("access_token");
const BASE_URL = "https://ds-elp2-be.herokuapp.com/";
const BASE_PROFILE_URL = "https://ds-elp2-be.herokuapp.com/profile";
const userContent = document.getElementById("userContent");
const toLogout = document.querySelector(".toLogout");

const loggedOut = true;

if (!access_token) {
  userContent.innerHTML = `<h3>Something went wrong... </h3> <p id="goBack"> Please, <a href="./login.html"> go back to the login page</a> and retry.<p>`;
} else {
  getUser();
}

//for personal greeting
const firstName = localStorage.getItem("firstName");
const title = document.querySelector(".title");
function greeting() {
  if (firstName) {
    title.innerHTML = `Welcome, ${firstName}!`;
  } else {
    title.innerHTML = `Welcome, User!`;
  }
}
greeting();

async function getUser() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await fetch(BASE_PROFILE_URL, options);
    const result = await response.json();
    console.log(result);
    browseOtherUsers(result);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

const userName = document.getElementById("userName");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let usersData;

function browseOtherUsers(userData) {
  userData.forEach((values, index) => {
    let userToDisplay = "";
    const theUser = new User(index + 1, values.firstName, values.lastName);
    userToDisplay = theUser.displayMe();
    userName.innerHTML = userToDisplay;
  });
  //just like swapi???
}

const rememberMe = localStorage.getItem("rememberMe");

window.addEventListener("beforeunload", function () {
  if (rememberMe === "true") {
    console.log(rememberMe);
    return;
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("rememberMe");
  }
});

toLogout.addEventListener("click", () => {
  logOut();
});

function logOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("rememberMe");
  localStorage.removeItem("firstName");

  window.location.href = "./login.html";
}

class User {
  constructor(index, firstName, lastName) {
    this.index = index;
    this.firstName = firstName;
    this.lastName = lastName;
  }
  displayMe() {
    return `<div>
      <p>${this.firstName} ${this.lastName}</p>
      <p> ID: ${this.index}</p>
    </div>`;
  }
}
