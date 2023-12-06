const { Sequelize } = require('sequelize');
const envVariables = require('./env');
const sequelize = new Sequelize(envVariables.DB_NAME, envVariables.DB_USER, envVariables.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to SQL database');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
