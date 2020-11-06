const db = require('../../database/pool');

class File {
  async create(name, path) {
    const { rows } = await db.query(
      `insert into files (name, path) values ('${name}', '${path}') returning id`
    );

    const { id } = rows[0];

    const file = await db.query(
      `select id, name, url, created_at, updated_at from files where id=${id}`
    );

    return file;
  }

  async getFiles() {
    const files = await db.query(`select id, name, path from files`);

    return files;
  }

  async getFileById(id) {
    const file = await db.query(
      `select id, name, path from files where id=${id}`
    );

    return file;
  }
}

export default new File();
