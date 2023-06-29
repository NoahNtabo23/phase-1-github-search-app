// Accessing DOM elements.
const form = document.getElementById("github-form");
const search = document.getElementById("search");
const container = document.getElementById("github-container");

// Adding event listener to the form.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  search.innerHTML = "";
  container.innerHTML = "";

  fetch('https://api.github.com/search/users?q=octocat')
    .then(res => res.json())
    .then(userInfo => userInfo.items.forEach(displayUser))
    .catch(error => console.error('Error:', error));
});

function displayUser(userInfo) {
  const name = document.createElement('li');
  name.textContent = userInfo.login;

  const avatar = document.createElement('img');
  avatar.src = userInfo.avatar_url;
  avatar.alt = `${userInfo.login} avatar image`;

  avatar.addEventListener('click', (e) => {
    onceClicked(userInfo);
  });

  const profileLink = document.createElement('a');
  profileLink.href = userInfo.html_url;
  profileLink.textContent = 'Github Profile';

  search.append(name, avatar, profileLink);
}

function onceClicked(userInfo) {
  fetch(`https://api.github.com/users/${userInfo.login}/repos`)
    .then(res => res.json())
    .then(userRepos => {
      search.innerHTML = "";
      displayUser(userInfo);
      userRepos.forEach(renderRepos);
    })
    .catch(error => console.error('Error:', error));
}

function renderRepos(user) {
  const li = document.createElement('li');
  li.textContent = user.full_name;
  container.append(li);
}