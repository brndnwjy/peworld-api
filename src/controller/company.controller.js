const companyModel = require("../model/company.model");
const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");

const companyController = {
  // auth
  register: async (req, res, next) => {
    try {
      const id = uuid();
      const { name, email, phone, password } = req.body;
      const hashedPassword = await hash(password, 10);

      const data = {
        id,
        name,
        email,
        phone,
        hashedPassword,
      };

      console.log(data);

      await companyModel.register(data);

      res.json({
        mesg: "register company berhasil",
        data: data,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await companyModel.mailCheck(email);

      if (!result.rowCount) {
        return next(createError(404, "email not registered"));
      }

      const {
        rows: [company],
      } = result;
      const hashedPassword = company.password;

      const valid = await compare(password, hashedPassword);

      if (!valid) {
        return next(createError(403, "E-mail or password incorrect!"));
      }

      delete company.password;

      res.json({
        msg: "login company berhasi",
        company: company,
      });
    } catch {
      next(new createError.InternalServerError());
    }
  },
};

module.exports = companyController;
