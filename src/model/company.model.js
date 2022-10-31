const pool = require("../config/db");

const companyModel = {
  // auth
  register: ({ id, name, email, phone, hashedPassword }) => {
    return pool.query(
      `
            INSERT INTO companies (company_id, name, email, phone, password)
            VALUES ($1, $2, $3, $4, $5)
            `,
      [id, name, email, phone, hashedPassword]
    );
  },

  mailCheck: (email) => {
    return pool.query(`SELECT * FROM companies WHERE email = $1`, [email]);
  },
};

module.exports = companyModel;
