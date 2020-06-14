const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const models = require('./src/models');
const authenticationRoutes = require('./src/routes/authentication-routes');

dotenv.config();
const app = express();

models.sequelize
  .sync()
  .then(function () {
    console.log('Database updated successfully');
  })
  .catch(function (error) {
    console.log(error, 'Database sync failed!');
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

authenticationRoutes(app);

app.get('/', function (req, res) {
  res.status(200).send({
    message: 'Welcome to our application!',
  });
});

const port = 5001;

app.listen(port, function (error) {
  if (error) {
    console.log({ error });
  } else {
    console.log('Application started and listening to port ' + port);
  }
});
