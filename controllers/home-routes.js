const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../middleware/auth");

router.get("/", (req, res) => {
  try {
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/home", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
        { model: User, attributes: { exclude: ["password"] } },
      ],
      exclude: User.password,
    });
    const postArray = posts.map((data) => data.get({ plain: true }));
    const inOrder = postArray.reverse();
    const userIdValue = req.session.UserID;
    console.log(postArray[0].comments);
    res.render("dashboard", {
      inOrder,
      loggedIn: req.session.loggedIn,
      userIdValue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//add sequlize find user
router.get("/dashboard", withAuth, async (req, res) => {
  if (req.session.UserID) {
    const userPosts = await Post.findAll({
      where: {
        creator_id: req.session.UserID,
      },
    });
    const postArray = userPosts.map((data) => data.get({ plain: true }));
    console.log(postArray);
    const userIdValue = req.session.UserID;
    res.render("homepage", {
      postArray,
      userIdValue,
      loggedIn: req.session.loggedIn,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect("/login");
    });
  } else {
    res.status(404).redirect("/login");
  }
});

module.exports = router;
