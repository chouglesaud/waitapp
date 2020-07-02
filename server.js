const app = require("express")();
const server = require("http").createServer(app);
const socketio = require("socket.io");

const io = socketio(server);
const activeRooms = [];
let PARTICIPANT_NUMBER = 0;

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ role, room }) => {
    if (role === "host") {
      activeRooms.push(room);
    }
    if (activeRooms.includes(room)) {
      socket.join(room);
      if (role === "participant") {
        PARTICIPANT_NUMBER++;
        socket.emit("getToken", PARTICIPANT_NUMBER);
      }
      socket.on("updateNumber", (number) => {
        io.sockets.in(room).emit("getNumber", number);
      });
    } else {
      socket.emit("message", `${room} does not exist`);
    }
    socket.on("deleteRoom", (room) => {
      const index = activeRooms.indexOf(room);
      activeRooms.splice(index, 1);
    });
    socket.on("leaveRoom", (room) => {
      socket.leave(room);
    });
  });
});
server.listen(3000, () => {
  console.log(`server started`);
});
