const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // For token generation
const bcrypt = require('bcrypt'); // For password hashing
const PORT = 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://mohdmurtaza0101:mongoDB@cluster0.j7yirfd.mongodb.net/worko?retryWrites=true&w=majority');

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Referral Schema
const ReferralSchema = new mongoose.Schema({
  name: String,
  email: String,
  experience: Number,
  resume: String,
  status: String,
});

const User = mongoose.model('User', UserSchema);
const Referral = mongoose.model('Referral', ReferralSchema);

// Secret key for JWT
const SECRET_KEY = 'my_super_secret_key';

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

app.get('/', (req,res)=>{
  res.status(200).json("this is home page!");
})

// Signup API
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error occurred during signup', error });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'user not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare hashed password
    if (!isPasswordValid)
      return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' }); // Generate token
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error occurred during login', error });
  }
});

// Logout API
app.post('/api/logout', (req, res) => {
  // For stateless JWT, there’s no true "logout" – we just instruct the frontend to delete the token.
  res.json({ success: true, message: 'Logout successful. Please clear your token from localStorage.' });
});

// Protected API: Get all referrals
app.get('/api/referrals', authenticateToken, async (req, res) => {
  try {
    const referrals = await Referral.find();
    console.log(referrals);
    res.json({massage:"data", success: true, data: referrals});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching referrals', error });
  }
});

// Protected API: Create a new referral
app.post('/api/referrals', authenticateToken, async (req, res) => {
  const { name, email, experience, resume, status } = req.body;
  try {
    const newReferral = new Referral({ name, email, experience, resume, status });
    await newReferral.save();
    res.json(newReferral);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating referral', error });
  }
});

// Protected API: Update referral status
app.put('/api/referrals/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedReferral = await Referral.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedReferral);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating referral', error });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));