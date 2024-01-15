const urlForEight =
  "https://dummy-apis.netlify.app/api/contact-suggestions?count=8";
const urlForOne =
  "https://dummy-apis.netlify.app/api/contact-suggestions?count=1";

let people = [];

document.addEventListener("DOMContentLoaded", function () {
  let container = document.getElementById("contacts-container-person");
  container.innerHTML = ""; // Clear existing content

  fetchData(urlForEight).then((data) => {
    people = data;
    renderPeople(people);
  });
  setupInvitationCount();
  setupCloseButtonListener();
});

function fetchData(url) {
  return fetch(url).then((response) => response.json());
}

function renderPeople(peopleToRender) {
  let container = document.getElementById("contacts-container-person");

  peopleToRender.forEach((person, index) => {
    container.appendChild(createPersonCard(person, index));
  });
}

function createPersonCard(person, index) {
  // Create elements for each person
  let personDiv = document.createElement("div");
  personDiv.className = "person-card";

  let backgroundImage = document.createElement("img");
  backgroundImage.src = person.backgroundImage
    ? person.backgroundImage
    : `https://source.unsplash.com/random/300x300?sig=${index}`;
  backgroundImage.className = "background-image";

  let image = document.createElement("img");
  image.src = person.picture;
  image.className = "image";

  let closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&#x2715;";

  let name = document.createElement("h2");
  name.className = "person-name";
  name.textContent = `${person.name.title} ${person.name.first} ${person.name.last}`;

  let jobTitle = document.createElement("p");
  jobTitle.className = "person-jobtitle";
  jobTitle.textContent = person.title;

  let connections = document.createElement("div");
  connections.className = "connections";

  let mutualConnectionIcon = document.createElement("p");
  let iconSpan = document.createElement("span");
  iconSpan.innerHTML = "&#x26AD;";
  iconSpan.className = "icon-connections";

  mutualConnectionIcon.appendChild(iconSpan);
  mutualConnectionIcon.innerHTML +=
    " " +
    `${person.mutualConnections} mutual connection${
      person.mutualConnections !== 1 ? "s" : ""
    }`;

  let connectButton = document.createElement("button");
  connectButton.className = "connect-button";
  connectButton.textContent = "Connect";

  // Append elements
  connections.appendChild(mutualConnectionIcon);

  personDiv.append(
    backgroundImage,
    image,
    closeButton,
    name,
    jobTitle,
    connections,
    connectButton
  );

  return personDiv;
}

function setupInvitationCount() {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("connect-button")) {
      toggleConncetionState(event.target);
    }
  });
}

function toggleConncetionState(button) {
  if (button.textContent === "Connect") {
    button.textContent = "Pending";
    updateInvitationsCount(1);
  } else {
    button.textContent = "Connect";
    updateInvitationsCount(-1);
  }
}

function updateInvitationsCount(change) {
  let headline = document.querySelector("#invitations-headline");
  let currentCount = parseInt(headline.textContent.match(/\d+/) || 0);
  let newCount = currentCount + change;

  if (newCount <= 0) {
    headline.textContent = "No pending invitation";
  } else {
    headline.textContent = `${newCount} pending invitation${
      newCount > 1 ? "s" : " "
    }`;
  }
}

function setupCloseButtonListener() {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("close-button")) {
      removePersonCard(event.target);
      addNewPersonCard();
    }
  });
}

function removePersonCard(button) {
  let personCard = button.closest(".person-card");
  if (personCard) {
    personCard.remove();
  }
}

function addNewPersonCard() {
  fetchData(urlForOne).then((data) => {
    let newUser = data[0]; // Assuming data is an array with one element
    renderPeople([newUser]);
  });
}
