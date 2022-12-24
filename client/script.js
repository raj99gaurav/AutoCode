import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

//as we are not using react this time we have to target html elements manually

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

//AI thinking ...
function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

//Function to print the output from AI letter by letter -> Better User exp

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    //check if we are still typing
    if (index < text.length) {
      element.innerHTML += text.chartAt(index); //will get char at specific index
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

//function to create unique ids to  map to msgs
function generateUniqueId() {
  //using current time and date
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

//function to implement chat stripe

function chatStripe(isAi, value, uniqueId) {
  return `
  <div class="wrapper ${isAi && "ai"}">
    <div class="chat">
      <div className="profile">
        <img scr="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}"/>
      </div>
      <div class="message" id=${uniqueId}>${value}</div>
    </div>
  </div>  `;
}

//Handle submit function to trigger AI generated response

const handleSubmit = async (e) => {
  e.preventDefault();

  //get the date that we typed into the form
  const data = new FormData(form);

  //user's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  //bot's chat stripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId); //empty string as we will fill it up later

  //put the new msg in view by scrolling
  chatContainer.scrollTop = chatContainer.scrollHeight;

  //fetch the newely created div
  const messageDiv = document.getElementById(uniqueId);

  //turn on the loader
  loader(messageDiv);
};

//holding the handleSubmit function

form.addEventListener("submit", handleSubmit);

//also submit on enter
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    //if enter key is pressed
    handleSubmit(e);
  }
});
