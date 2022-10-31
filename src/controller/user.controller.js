const userModel = require("../model/user.model");
const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

const userController = {
  // auth
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

  // profile
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

  getUserSkill: async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await userModel.getUserSkill(id);
      const skill = data.rows;

      res.json({
        msg: "get user skill berhasil",
        skills: skill,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  getUserPortfolio: async (req, res, next) => {
    try {
      const {id} = req.params;

      const data = await userModel.getUserPortfolio(id);
      const porto = data.rows;

      res.json({
        msg: "get user skill berhasil",
        portfolio: porto,
      });

    } catch {
      next (new createError.InternalServerError())
    }
  },

  // insert
  insertSkill: async (req, res, next) => {
    try {
      const { id, name } = req.body;

      await userModel.insertSkill(id, name);

      res.json({
        msg: "insert skill berhasil",
        skill: name,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  insertPortfolio: async (req, res, next) => {
    try {
      let image;
      if (req.file) {
        image = `http://${req.get("host")}/portofolio/${req.file.filename}`;
      }

      const data = {
        id: req.body.id,
        name: req.body.name,
        link: req.body.link,
        type: req.body.type,
        image,
      };

      await userModel.insertPortfolio(data);

      res.json({
        msg: "insert porto berhasil",
        data: data,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  // update
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

  editPortfolio: async (req, res, next) => {
    try {
      const {id, porto_id} = req.params;

      let image;

      if (req.file) {
        image = `http://${req.get("host")}/portfolio/${req.file.filename}`;
      }

      const data = {
        id, 
        porto_id,
        name : req.body.name,
        link : req.body.link,
        type : req.body.type,
        image
      }

      console.log(data)

      await userModel.editPortfolio(data)

      res.json({
        msg: "update portfolio berhasil",
        data: data
      })
    } catch {
      next (new createError.InternalServerError())
    }
  },

  // delete
  deleteSkill: async (req, res, next) => {
    try {
      const { id, skill_id } = req.params;

      await userModel.deleteSkill(id, skill_id);

      res.json({
        msg: "delete skill berhasil",
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  deletePortfolio: async (req, res, next) => {
    try {
      const { id, porto_id } = req.params;

      await userModel.deletePortfolio(id, porto_id);

      res.json({
        msg: "delete portfolio berhasil",
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },
};

module.exports = userController;
