const authenticationController = require('../controllers/authentication-controller');

module.exports = function (app) {
  app.post('/signup', authenticationController.signupController);
  app.post('/signin', authenticationController.signinController);
};
