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
    userData = result;
    browseOtherUsers(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

const userName = document.getElementById("userName");
const userCount = document.getElementById("userCount");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let currentIndex = 0;
let userData;
let totalUsers;
let theUser;

function browseOtherUsers(userData) {
  const theUser = new User(
    `PA-PER00${currentIndex}`,
    userData[currentIndex].firstName,
    userData[currentIndex].lastName
  );
  const userToDisplay = theUser.displayMe();
  userName.innerHTML = userToDisplay;

  totalUsers = userData.length;
  userCount.innerHTML = `User ${currentIndex + 1} out of ${totalUsers}`;

  prev.disabled = currentIndex === 0;
}

prev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    browseOtherUsers(userData);
  }
});

next.addEventListener("click", () => {
  const totalUsers = userData.length;
  if (currentIndex < totalUsers - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  //Hammer.js found online for swipey events
  const userName = document.getElementById("userName");
  const hammer = new Hammer(userName);

  hammer.on("swipeleft swiperight", (e) => {
    if (e.type === "swipeleft") {
      // Swipe left (next user)
      const totalUsers = userData.length;
      if (currentIndex < totalUsers - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    } else if (e.type === "swiperight") {
      // Swipe right (previous user)
      if (currentIndex > 0) {
        currentIndex--;
      }
    }
    browseOtherUsers(userData);
  }); //end of swipey events
  browseOtherUsers(userData);
});

//rememberMe
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

//for users browsing:
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
