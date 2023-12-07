const express = require('express');
const sequelize = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const envVariables = require('./config/env');
const PORT = envVariables.PORT || 3000;
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const User = require("./models/user");
const Task = require("./models/task");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes); 
app.use('/task', taskRoutes);

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User,{ foreignKey: 'userId' });

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
