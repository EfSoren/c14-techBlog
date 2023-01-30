const { Comment } = require("../models");

const commentData = [
  {
    creator_id: 1,
    post_id: 1,
    comment_text: "That makes it so easy to display dynamic information!",
  },
  {
    creator_id: 1,
    post_id: 2,
    comment_text:
      "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
  },
];

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;
