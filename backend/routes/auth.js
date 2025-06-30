const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// GET: Default to Login-Seite
router.get("/", (req, res) => {
  res.render("login");
});

// GET: Login-Seite
router.get("/login", (req, res) => {
  res.render("login");
});

// GET: Register-Seite
router.get("/register", (req, res) => {
  res.render("register");
});

// POST: Registrierung
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name, email, passwordHash });
  res.redirect("/login");
});

// POST: Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).send("Login fehlgeschlagen");
  }

  // Token generieren und in Cookie oder Session speichern (z. B. später)
  res.redirect("/dashboard");
});

module.exports = router;
