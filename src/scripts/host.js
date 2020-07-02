import io from "socket.io-client";
let NUMBER = 0;
const roomInput = document.querySelector("#room");
const createBtn = document.querySelector("#create");
const updateBtn = document.querySelector("#update");
const deleteBtn = document.querySelector("#delete-room");
const number = document.querySelector("#number");
const socket = io("http://localhost:3000");

createBtn.addEventListener("click", () => {
  socket.emit("joinRoom", { role: "host", room: roomInput.value });
});

updateBtn.addEventListener("click", () => {
  NUMBER++;
  socket.emit("updateNumber", NUMBER);
});

deleteBtn.addEventListener("click", () => {
  socket.emit("deleteRoom", roomInput.value);
});

socket.on("getNumber", (num) => {
  number.innerHTML = `${num}`;
});
