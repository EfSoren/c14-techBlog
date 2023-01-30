const { User } = require("../models");

const userData = [
  {
    username: "EfSoren",
    password: "password22",
  },
  {
    username: "TechEnjoyer",
    password: "password33",
  },
];
const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;
