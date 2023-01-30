const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

Post.belongsTo(User, {
  foreignKey: "creator_id",
});

User.hasMany(Post, {
  foreignKey: "creator_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Comment, {
  foreignKey: "creator_id",
});

Comment.belongsTo(User, {
  foreignKey: "creator_id",
});

module.exports = { User, Post, Comment };
