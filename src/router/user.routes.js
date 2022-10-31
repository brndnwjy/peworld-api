const express = require("express");
const { register, login, getUserDetail, editUserDetail, insertSkill, getUserSkill, deleteSkill } = require("../controller/user.controller");
const upload = require("../middleware/multer");
const router = express.Router();

router
// auth
.post("/register", register)
.post("/login", login)

// profile
.get("/:id", getUserDetail)
.get("/:id/skill", getUserSkill)
// .get("/protfolio", getUserPortfolio)
// .get("/experience", getUserExperience)

// insert new data
.post("/skill", insertSkill)
// .post("/portfolio", insertPortfolio)
// .post("/experience", insertExperience)

// update user data
.put("/update/:id", upload.single("avatar"), editUserDetail)
// .put("/portfolio/:id", insertPortfolio)
// .put("/experience/:id", insertExperience)

// delete user data
.delete("/:id/skill/:skill_id", deleteSkill)
// .delete("/portfolio/:id", deletePortfolio)
// .delete("/experience/:id", deleteExperience)

module.exports = router;