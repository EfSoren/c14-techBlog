const sequelize = require("../config/connection");
const seedUser = require("./User-seed");
const seedPost = require("./Post-seed");
const seedComment = require("./Comment-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  await seedPost();
  await seedComment();
  process.exit(0);
};

seedAll();
