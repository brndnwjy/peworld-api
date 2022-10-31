const express = require("express");
const {
  register,
  login,
  getUserDetail,
  editUserDetail,
  insertSkill,
  getUserSkill,
  deleteSkill,
  insertPortfolio,
  getUserPortfolio,
  editPortfolio,
  deletePortfolio,
  insertExperience,
  getUserExperience,
  editExperience,
  deleteExperience,
} = require("../controller/user.controller");
const {
  avatarUpload,
  portoUpload,
  companyUpload,
} = require("../middleware/multer");
const router = express.Router();

router
  // auth
  .post("/register", register)
  .post("/login", login)

  // profile
  .get("/:id", getUserDetail)
  .get("/:id/skill", getUserSkill)
  .get("/:id/portfolio", getUserPortfolio)
  .get("/:id/experience", getUserExperience)

  // insert new data
  .post("/skill", insertSkill)
  .post("/portfolio", portoUpload.single("image"), insertPortfolio)
  .post("/experience", insertExperience)

  // update user data
  .put("/update/:id", avatarUpload.single("avatar"), editUserDetail)
  .put("/:id/portfolio/:porto_id", portoUpload.single("image"), editPortfolio)
  .put("/:id/experience/:exp_id", editExperience)

  // delete user data
  .delete("/:id/skill/:skill_id", deleteSkill)
  .delete("/:id/portfolio/:porto_id", deletePortfolio)
  .delete("/:id/experience/:exp_id", deleteExperience);

module.exports = router;
