let users = {};

export const addUser = (user, email) => {
  if (users[user]) return false;
  if (Object.values(users).some((registerEmail) => registerEmail === email))
    return false;
  users[user] = email;
};

export default users;
