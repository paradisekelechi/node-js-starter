const bcrypt = require('bcrypt-nodejs');
const User = require('../models')['user'];

module.exports = {
  signupController: function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (!email) {
      return res.status(400).send({
        message: 'Email is required!',
        success: false,
      });
    }

    if (!password) {
      return res.status(400).send({
        message: 'Password is required!',
        success: false,
      });
    }

    if (!firstname) {
      return res.status(400).send({
        message: 'Firstname is required!',
        success: false,
      });
    }

    if (!lastname) {
      return res.status(400).send({
        message: 'Lastname is required!',
        success: false,
      });
    }

    return User.findOne({ where: { email: email } }).then(function (savedUser) {
      if (savedUser) {
        return res.status(400).send({
          message: 'User already exists',
          success: false,
        });
      }

      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      return User.create({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      }).then(function (createdUser) {
        if (createdUser) {
          return res.status(201).send({
            message: 'User created successfully',
            success: true,
            payload: createdUser,
          });
        }
      });
    });
  },
  signinController: function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).send({
        message: 'Email is required!',
        success: false,
      });
    }

    if (!password) {
      return res.status(400).send({
        message: 'Password is required!',
        success: false,
      });
    }

    return User.findOne({ where: { email: email } }).then(function (savedUser) {
      if (!savedUser) {
        return res.status(400).send({
          message: 'User Signin failed',
          success: false,
        });
      }
      const hashedPassword = savedUser.password;
      if (bcrypt.compareSync(password, hashedPassword)) {
        return res.status(200).send({
          message: 'User signin successful',
          success: true,
        });
      }
      return res.status(400).send({
        message: 'User Signin failed',
        success: false,
      });
    });

    // if(bcrypt.compareSync(password, ))
  },
};
