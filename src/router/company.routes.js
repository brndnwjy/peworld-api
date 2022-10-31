const express = require("express");
const { register, login } = require("../controller/company.controller");
const router = express.Router();

router
// auth
.post("/register", register)
.post("/login", login)

// profile
// .get("/profile", getCompanyDetail)

// home
// .get("/user", getUser)
// .get("/user/:id", getUserDetail)

// insert new data
// .post("/offer", createOffer)

// update user data
// .put("/", editCompanyDetail)

// delete user data
// .delete("/offer/:id", cancelOffer)

module.exports = router;