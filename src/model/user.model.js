const pool = require("../config/db");

const userModel = {
  // auth
  register: ({ id, fullname, email, phone, hashedPassword }) => {
    return pool.query(
      `
        INSERT INTO users (user_id, fullname, email, phone, password)
        VALUES ($1, $2, $3, $4, $5)
        `,
      [id, fullname, email, phone, hashedPassword]
    );
  },

  mailCheck: (email) => {
    return pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  },

  // profile
  getUserDetail: (id) => {
    return pool.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
  },

  getUserSkill: (id) => {
    return pool.query(`SELECT * FROM skills WHERE user_id = $1`, [id]);
  },

  // insert
  insertSkill: (id, name) => {
    return pool.query(
      `INSERT INTO skills (user_id, skill_name) VALUES ($1, $2)`,
      [id, name]
    );
  },

  // update
  editUserDetail: (data) => {
    return pool.query(
      `
    UPDATE users SET
    fullname = COALESCE($1, fullname),
    phone = COALESCE($2, phone),
    avatar = COALESCE($3, avatar),
    title = COALESCE($4, title),
    location = COALESCE($5, location),
    description = COALESCE($6, description),
    insta = COALESCE($7, insta),
    github = COALESCE($8, github),
    linkedin = COALESCE($9, linkedin)
    WHERE user_id = $10
    `,
      [
        data.fullname,
        data.phone,
        data.avatar,
        data.title,
        data.location,
        data.description,
        data.insta,
        data.github,
        data.linkedin,
        data.id,
      ]
    );
  },

  // delete
  deleteSkill: (id, skill_id) => {
    return pool.query(
      `DELETE FROM skills WHERE user_id = $1 AND skill_id = $2`,
      [id, skill_id]
    );
  },
};

module.exports = userModel;
