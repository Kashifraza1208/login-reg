const {
  registerUser,
  loginUser,
  logOut,
  getAllUser,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logOut);

router.route("/users").get(getAllUser);

module.exports = router;
