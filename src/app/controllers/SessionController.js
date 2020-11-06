import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);

    if (user.rowCount === 0) {
      return res.status(401).json({ error: 'User was not found.' });
    }

    const { id, name, user_password } = user.rows[0];

    if (!(await User.checkPassword(password, user_password))) {
      res.status(401).json({ error: 'Incorrect password.' });
    }

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
