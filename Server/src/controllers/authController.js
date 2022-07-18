const Users = require('../models/users');
const { createAccessToken } = require('../utils/helpers');

const authController = {
  register: async (req, res) => {
    console.log('req.body', req.body);
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      console.log('user', user);
      if (user) {
        return res.send(400).json({ message: 'email is already exist' });
      }
      const newUser = new Users({
        email,
        password,
      });
      await newUser.save();
      res.json({ message: 'Register user successfull' });
    } catch (error) {
      res.send(500).json({ message: error });
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await Users.findOne({ email });
      console.log('user', user);

      if (!user) {
        res.status(400).json({ message: 'this email not exist' });
      }
      const accessToken = createAccessToken({ email: user.email });
      res.json({ email, accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = authController;
