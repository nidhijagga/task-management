const User = require('../models/user')
const { hashPassword, comparePassword } = require('../utils/bcryptUtils');
const jwt = require('jsonwebtoken');
const envVariables = require('../config/env');

const generateToken = (user) => {
  const secretKey = envVariables.TOKEN_KEY; 
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
};

const register = async (req, res) => {
    const { email, password, phone } = req.body;
  
    try {
    
      const existingUser = await User.findOne({
        where: { email: email }
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      
      const hashedPassword = await hashPassword(password);
  
      
      const newUser = await User.create({
        email: email,
        password: hashedPassword,
        phone: phone
      });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    
    const user = await User.findOne({ where: { email : email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    
    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { register, login };
