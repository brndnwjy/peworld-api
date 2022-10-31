const userModel = require("../model/user.model");
const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

const userController = {
  register: async (req, res, next) => {
    try {
      const id = uuid();
      const { fullname, email, phone, password } = req.body;
      const hashedPassword = await hash(password, 10);

      const data = {
        id,
        fullname,
        email,
        phone,
        hashedPassword,
      };

      console.log(data);

      await userModel.register(data);

      res.json({
        mesg: "register berhasil",
        data: data,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await userModel.mailCheck(email);

      if (!result.rowCount) {
        return next(createError(404, "email not registered"));
      }

      const {
        rows: [user],
      } = result;
      const hashedPassword = user.password;

      const valid = await compare(password, hashedPassword);

      if (!valid) {
        return next(createError(403, "E-mail or password incorrect!"));
      }

      delete user.password;

      res.json({
        msg: "login berhasi",
        user: user,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  getUserDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await userModel.getUserDetail(id);
      const [user] = data.rows;

      res.json({
        msg: "get profile berhasil",
        data: user,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  editUserDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      let avatar;

      if (req.file) {
        avatar = `http://${req.get("host")}/avatar/${req.file.filename}`;
      }

      const data = {
        id,
        fullname: req.body.fullname,
        phone: req.body.phone,
        avatar,
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        insta: req.body.insta,
        github: req.body.github,
        linkedin: req.body.linkedin,
      };

      await userModel.editUserDetail(data);

      res.json({
        msg: "update profile berhasil",
        data: data,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },
};

module.exports = userController;
