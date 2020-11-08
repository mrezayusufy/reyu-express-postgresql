import bcrypt from 'bcryptjs';

const db = require('../../database/pool');

class User {
  async create(
    user_name,
    user_gender,
    user_email,
    user_password,
    user_firstname
  ) {
    const user = await db.query(
      `insert into users ( user_name, user_gender, user_email, user_password, user_firstname) 
      values ('${user_name}','${user_gender}', '${user_email}', '${user_password}', '${user_firstname}') 
      returning *`
    );
    return user;
  }

  async getUsers() {
    const users = await db.query(`select * from users;`);

    return users;
  }

  async getUserById(id) {
    const user = await db.query(`select * from users where id=${id}`);

    return user;
  }

  async getUserByEmail(email) {
    const user = await db.query(
      `select * from users where user_email='${email}'`
    );

    return user;
  }

  async hashPassword(password) {
    const user_password = await bcrypt.hash(password, 8);

    return user_password;
  }

  async checkPassword(password, user_password) {
    return bcrypt.compare(password, user_password);
  }

  async update(id, json) {
    const {
      user_name,
      user_firstname,
      user_lastname,
      email,
      password,
      avatar_id,
      user_email_verified,
      admin,
      user_biography,
      user_website,
      user_country,
    } = json;
    const query = {
      text: `update users set 
        user_country='${user_country}',
        user_website='${user_website}',
        user_biography='${user_biography}',
        user_lastname='${user_lastname}'
        where id=${id}`,
    };
    if (query) {
      await db.query(query.text);
    }
    if (user_email_verified) {
      await db.query(
        `update users set user_email_verified='${user_email_verified}' where id=${id}`
      );
    }
    if (admin) {
      await db.query(`update users set admin='${admin}' where id=${id}`);
    }
    if (user_firstname) {
      await db.query(
        `update users set user_firstname='${user_firstname}' where id=${id}`
      );
    }
    if (user_name) {
      await db.query(
        `update users set user_name='${user_name}' where id=${id}`
      );
    }
    if (user_lastname) {
      await db.query(
        `update users set user_lastname='${user_lastname}' where id=${id}`
      );
    }

    if (email) {
      await db.query(`update users set user_email='${email}' where id=${id}`);
    }

    if (password) {
      const user_password = await this.hashPassword(password);
      await db.query(
        `update users set user_password='${user_password}' where id=${id}`
      );
    }

    if (avatar_id) {
      await db.query(`update users set avatar_id=${avatar_id} where id=${id}`);
    }

    const user = await db.query(`select * from users where id=${id}`);

    return user;
  }
}

export default new User();
