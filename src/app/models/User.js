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
    const { user_name, email, password, avatar_id } = json;

    if (user_name) {
      await db.query(
        `update users set user_name='${user_name}' where id=${id}`
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
