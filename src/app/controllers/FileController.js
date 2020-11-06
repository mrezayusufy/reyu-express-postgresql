import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { rows } = await File.create(name, path);

    return res.json(rows[0]);
  }

  async index(req, res) {
    const { rows } = await File.getFiles();

    return res.json(rows);
  }

  async indexById(req, res) {
    const { id } = req.params;

    const file = await File.getFileById(id);

    return res.json(file);
  }
}

export default new FileController();
