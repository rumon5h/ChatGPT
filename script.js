import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timeStamp}-${hexadecimalString}`;
}

function chatStripe(isAI, value, uniqueId) {
  return `
  <div class="wrapper ${isAI && "ai"}">
    <div class="chat">
      <div class="profile">
        <img 
        src="${isAI ? bot : user}"
        alt="${isAI ? 'bot' : 'user'}"
        />
      </div>
      <div class="message" id="${uniqueId}">${value}</div>
    </div>
  </div>
  `;
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = new FormData(form);

  // user's chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  form.reset();

  // bot's chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId); 

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv)

}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (event) => {
  if(event.keyCode === 13) {
    handleSubmit(event);
  }
})