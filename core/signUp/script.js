/* global document window confirm FileReader */

// assets
const userNameInput = document.getElementById("future-user-name");
const userEmailInput = document.getElementById("future-user-email");
const userIconInput = document.getElementById("future-user-icon");
const userDescInput = document.getElementById("future-user-desc");
const submitBtn = document.getElementById("submit-sign");

// functions

// triggers
submitBtn.addEventListener("click", async () => {
  const file = userIconInput.files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const userinfos = {
      username: userNameInput.value,
      icon: reader.result,
      description: userDescInput.value,
      email: userEmailInput.value,
    };

    const result = await window.api.call("create-file", userinfos, "user.json");

    if (result.success) {
      window.location.href = "../mainScreen/mainScreen.html";
    } else {
      console.error(result.error);
    }
  };

  reader.readAsDataURL(file);
});
