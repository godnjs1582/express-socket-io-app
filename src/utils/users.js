const users = [];
const addUser = ({ id, username, room }) => {
  username = username.trim();
  room = room.trim();

  if (!username || !room) {
    return {
      error: "사용자 이름과 방이 필요합니다",
    };
  }

  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return {
      error: "사용자 이름이 사용중입니다",
    };
  }
  //유저 배열에 저장
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const getUsersInRoom = (room) => {
  room = room.trim();
  return users.filter((user) => {
    return user.room === room;
  });
};

module.exports = {
  addUser,
  getUsersInRoom,
};
