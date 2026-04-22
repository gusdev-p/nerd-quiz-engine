/* global document window alert  */
/* eslint "no-unused-vars": "off" */

// assets
const userNameBtn = document.getElementById("user-name");
// main buttons
const createProjectBtn = document.getElementById("create-project");

// vars
let userExist = false;

// function
async function init() {
  const settingsBase = await window.api.call("load-settings");

  if (settingsBase.success) {
    const settingsData = JSON.parse(settingsBase.content);
    const userBase = await window.api.call("load-save");
    if (userBase.success) {
      const userData = JSON.parse(userBase.content);
      window.api.call("log", userData);
      if (userData.username) {
        userNameBtn.innerText = "Welcome back " + userData.username + "!";
        userExist = true;
      } else {
        alert("Bad user.json :(");
      }
    }
  }
}

//triggers
userNameBtn.addEventListener("click", () => {
  if (userExist) {
    window.location.href = "../userSection/userSection.html";
  } else {
    window.location.href = "../signUp/signUp.html";
  }
});

createProjectBtn.addEventListener("click", () => {
  window.api.call("create-window", {
    windowPath: "core/createProject/createProject.html",
    windowResize: false,
  });
});

init();
