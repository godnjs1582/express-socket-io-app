const socket = io();

const query = new URLSearchParams(location.search);
const username = query.get(username);
const room = query.get(room);

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    href.location = "/";
  }
});

socket.on("message",)
