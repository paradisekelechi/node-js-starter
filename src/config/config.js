const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_environment_url: true,
    url: process.env.DATABASE_URL,
  },
  production: {},
  test: {},
};
