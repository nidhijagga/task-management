const express = require('express');
const sequelize = require('./config/db'); 
const app = express();
const body_parser = require('body-parser');
const envVariables = require('./config/env');
const PORT = envVariables.PORT || 3000;

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
