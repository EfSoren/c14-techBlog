const { Post } = require("../models");

const postData = [
  {
    creator_id: 1,
    title: "Handlebars Features",
    post_text:
      "Handlebars can be used to format html pages with different designs and information to display to users",
  },
  {
    creator_id: 1,
    title: "Model View Controller",
    post_text: "This site was developed using the MVC format structure!",
  },
];
const seedPost = () => Post.bulkCreate(postData);
module.exports = seedPost;
