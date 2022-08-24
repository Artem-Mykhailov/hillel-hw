"use strict";

const userInfo = document.querySelector("#userInfo");
const userInput = document.querySelector("#input-name");
const getUserInfoBtn = document.querySelector("#btn");
const resetForm = document.querySelector(".btn-reset");

getUserInfoBtn.addEventListener("click", onGetUserInfoBtnClick);
resetForm.addEventListener("click", onResetFormClick);

function onGetUserInfoBtnClick(e) {
  e.preventDefault();

  fetch(`https://api.github.com/users/${userInput.value}`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject("Error: " + res.status)
    )
    .then(renderUser)
    .catch((err) => {
      alert("Invalid user name! Try again");
      console.warn(err);
    });

  clearInput();
}

function onResetFormClick(e) {
  e.preventDefault();
  const userPosts = document.querySelectorAll(".userPost");

  userPosts.forEach((post) => {
    post.remove();
  });
}

function renderUser(user) {
  const html = generateUserHtml(user);

  userInfo.insertAdjacentHTML("afterbegin", html);
}

function clearInput() {
  userInput.value = "";
}

function generateUserHtml(user) {
  return `
        <div class="userPost">
            <h1 class="userPost-name">${user.name}</h1>
            <img class="userPost-avatar" src="${user.avatar_url}">
            <p class="userPost-text"><span class="userPost-text-title">Number of Repos:</span> ${user.public_repos}</p>
            <p class="userPost-text"><span class="userPost-text-title">Followers:</span> ${user.followers}</p>
            <p class="userPost-text"><span class="userPost-text-title">Following:</span> ${user.following}</p>
        </div>
    `;
}
