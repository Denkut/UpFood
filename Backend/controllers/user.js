const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helper/token");
const ROLES = require("../constants/roles");
const { getCart } = require("./cart");

//register
async function register(login, password, profileData) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    login,
    password: passwordHash,
    ...profileData,
  });
  const token = generate({ id: user.id });

  return { user, token };
}

//login
async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }
  const token = generate({ id: user.id });

  return { token, user };
}

async function getUsers() {
  try {
    const users = await User.find();
    const usersWithCarts = await Promise.all(
      users.map(async (user) => {
        const cart = await getCart(user._id);
        return {
          ...user.toObject(),
          cart,
        };
      })
    );
    return usersWithCarts;
  } catch (error) {
    throw error;
  }
}

async function getUser(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Пользователь не найден");
    }
    const cart = await getCart(userId);
    return {
      ...user.toObject(),
      cart,
    };
  } catch (error) {
    throw error;
  }
}

//edit
async function editUser(id, user) {
  const newUser = await User.findByIdAndUpdate(id, user, {
    returnDocument: "after",
  });
  return newUser;
}
//roles
function getRoles() {
  return [
    {
      id: ROLES.ADMIN,
      name: "Admin",
    },
    {
      id: ROLES.USER,
      name: "User",
    },
  ];
}
//delete
function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

//edit (roles)
function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
  });
}

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  getRoles,
  deleteUser,
  updateUser,
  editUser,
};
