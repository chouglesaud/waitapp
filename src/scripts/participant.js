import io from "socket.io-client";

const roomInput = document.querySelector("#room");
const joinBtn = document.querySelector("#join");
const leaveBtn = document.querySelector("#leave");
const number = document.querySelector("#number");
const message = document.querySelector("#message");
const token = document.querySelector("#token");
const socket = io("http://localhost:3000");

joinBtn.addEventListener("click", () => {
  socket.emit("joinRoom", { role: "participant", room: roomInput.value });
});

leaveBtn.addEventListener("click", () => {
  socket.emit("leaveRoom", roomInput.value);
});

socket.on("getNumber", (num) => {
  number.innerHTML = `current number: ${num}`;
});

socket.on("getToken", (myToken) => {
  token.innerHTML = `my number: ${myToken}`;
});
socket.on("message", (msg) => {
  message.innerHTML = msg;
  setTimeout(() => {
    message.innerHTML = "";
  }, 2000);
});
