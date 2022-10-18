const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// this setup is for Heroku Database env
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // This setup is for localhost env
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
<<<<<<< HEAD
      // port: 3306 // This port is for local mysql, how about heroku?
=======
      port: 3306
>>>>>>> 845e61a35741fb20dad8a15ea54157c0642d5c99
    }
  );
}

module.exports = sequelize;
