/* global document window */

// assets
const userIcon = document.getElementById("user-icon");
const userName = document.getElementById("user-name");
const noIcon = document.getElementById("no-icon");
const userDesc = document.getElementById("user-desc");
const goBtn = document.getElementById("go-btn");

// functions
async function init() {
  const userBase = await window.api.call("load-save");
  if (userBase.success) {
    const userData = JSON.parse(userBase.content);
    if (userData.username) {
      userName.innerText = userData.username;
    }
    if (userData.icon) {
      userIcon.src = userData.icon;
      noIcon.remove();
    } else {
      userIcon.remove();
    }
    if (userData.description) {
      userDesc.innerText = userData.description;
    }
    if (userData.email) {
      const oldName = userName.innerText;
      userName.innerText = oldName + " - (" + userData.email + ")";
    }
  }
}

//triggers
goBtn.addEventListener("click", () => {
  window.location.href = "../mainScreen/mainScreen.html";
});

init();
