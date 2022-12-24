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

    if (element.textContent === "...") {
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
