const express = require('express');
const sequelize = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const envVariables = require('./config/env');
const PORT = envVariables.PORT || 3000;

const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes); 

sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
