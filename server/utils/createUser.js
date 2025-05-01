const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async ({
  name,
  email,
  phone,
  password,
  role = "user",
  isVerified = true,
}) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
    isVerified,
  });

  await user.save();
  return user._id;
};

module.exports = createUser;
