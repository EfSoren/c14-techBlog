const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(userLogin.dataValues);
    if (!userLogin) {
      res.status(400).json({ message: "Incorrect Username or Password" });
      return;
    }
    const passwordCheck = await userLogin.checkPassword(req.body.password);

    if (!passwordCheck) {
      res.status(400).json({ message: "Incorrect Username or Password" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.UserID = userLogin.dataValues.id;
      req.session.User = userLogin.dataValues.username;
      res.status(200).json({ message: "logged in" });
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const createUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(createUser);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.UserID = createUser.dataValues.id;
      req.session.User = createUser.dataValues.username;
      res.status(200).json({ message: "logged in" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post("/post", async (req, res) => {
  try {
    const addPost = await Post.create({
      creator_id: req.body.creator_id,
      title: req.body.title,
      post_text: req.body.post_text,
    });
    res.status(200).json({ message: "Post added" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/post", async (req, res) => {
  try {
    if (req.session.loggedIn === true) {
      const postEdit = await Post.update(
        { post_text: req.body.post_text },
        {
          where: {
            id: req.body.id,
          },
        }
      );
    }
    res.status(200).json({ message: "post updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.delete("/post/:id", async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/comment", async (req, res) => {
  try {
    const commentPost = await Comment.create({
      creator_id: req.body.creator_id,
      post_id: req.body.post_id,
      comment_text: req.body.comment_text,
    });
    res.status(200).json(commentPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/comment/:id", async (req, res) => {
  try {
    if (req.session.UserID === req.params.id) {
      const commentEdit = await Comment.update(
        { comment_text: req.body.comment_text },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!commentEdit) {
        res.status(404).json({ message: "no comment found with that id" });
        return;
      }
      res.status(200).json(commentEdit);
    } else {
      res.status(400).json({ message: "you cannot edit someone elses post" });
    }
  } catch (error) {
    console.log(error);
    res.json(500).json(error);
  }
});
module.exports = router;
