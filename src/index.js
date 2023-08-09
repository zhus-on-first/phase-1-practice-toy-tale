// Define text characters for full and empty hearts
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Fetch data
fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toys) => {
    toys.forEach(renderToyCollection);
  });

// Call to render and populate the DOM:
// <div class="card">
//   <h2>Woody</h2>
//   <img src="[toy_image_url]" class="toy-avatar" />
//   <p>4 Likes</p>
//   <button class="like-btn" id="[toy_id]">Like ❤️</button>
// </div>

function renderToyCollection(toy) {
  //Do it by .appendChild(someTag) also?
  const div = document.createElement("div");

  div.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;
  div.append(h2);

  const img = document.createElement("img");
  img.src = toy.image;
  img.alt = toy.name;
  img.className = "toy-avatar";
  div.append(img);

  const p = document.createElement("p");
  p.textContent = toy.likes;
  div.append(p);

  const btn = document.createElement("button");
  btn.class = "like-btn";
  btn.id = toy.id;
  btn.textContent = "Like " + "EMPTY_HEART";
  div.append(btn);

  document.querySelector("#toy-collection").append(div);
}

// Event listener for add new toy form
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Post: data persist events:
// {
//  "id": 1,
//  "name": "Woody",
//  "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
//  "likes": 5
// }

const newToyForm = document.querySelector(".add-toy-form");

newToyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //pull the info for the new toy out of the form submission
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: "0",
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toy),
  })
    .then((response) => response.json())
    .then((toy) => renderToyCollection(toy));
});

// Increase like
