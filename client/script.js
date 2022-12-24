import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

//as we are not using react this time we have to target html elements manually

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "...") {
      element.textContent = "";
    }
  }, 300);
}
