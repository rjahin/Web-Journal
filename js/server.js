const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const { User, connectDB } = require('./login-database');
const Goal = require('./goal');
const Emotion = require('./emotion');
const { MongoClient } = require('mongodb');




const app = express();
const PORT = process.env.PORT || 3003;


connectDB();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));


// Setup session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !true }
}));



const sendPersonalizedHtml = async (req, res, htmlPath, redirectPath) => {
    if (!req.session.firstName) {
      res.redirect(redirectPath);
      return;
    }

    try {
      const filePath = path.join(__dirname, htmlPath);
      const htmlData = await fs.promises.readFile(filePath, 'utf8');
      const personalizedHtml = htmlData.replace('<!--USERNAME-->', req.session.firstName);
      res.send(personalizedHtml);
    } catch (error) {
      res.status(500).send("Error loading page");
    }
  };

  // Static page route
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../MainPages/index.html'));
  });

  // Dynamic HTML routes
  const dynamicPages = [
    { url: '/home.html', path: '../MainPages/home.html' },
    { url: '/goal-setting.html', path: '../secondary-pages/goal-setting.html' },
    { url: '/logger.html', path: '../secondary-pages/logger.html' },
    { url: '/feedback-and-support.html', path: '../secondary-pages/feedback-and-support.html' },
    { url: '/security-privacy.html', path: '../secondary-pages/security-privacy.html' },
    { url: '/wellness-resources.html', path: '../secondary-pages/wellness-resources.html' }
  ];

  dynamicPages.forEach(page => {
    app.get(page.url, (req, res) => {
      sendPersonalizedHtml(req, res, page.path, '/login');
    });
  });

  // API endpoints for goals
  app.route('/api/goals')
    .get(async (req, res) => {
      if (!req.session.userId) {
        res.status(403).send("Unauthorized");
        return;
      }
      try {
        const goals = await Goal.find({ userId: req.session.userId });
        res.json(goals);
      } catch (error) {
        res.status(500).send("Error retrieving goals: " + error.message);
      }
    })
    .post(async (req, res) => {
      if (!req.session.userId) {
        res.status(403).send("Unauthorized");
        return;
      }
      try {
        const newGoal = new Goal({
          userId: req.session.userId,
          content: req.body.content
        });
        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
      } catch (error) {
        res.status(500).send("Error adding goal: " + error.message);
      }
    });

  app.delete('/api/goals/:goalId', async (req, res) => {
    if (!req.session.userId) {
      res.status(403).send("Unauthorized");
      return;
    }
    try {
      const goal = await Goal.findOneAndDelete({ _id: req.params.goalId, userId: req.session.userId });
      if (goal) {
        res.status(200).send("Goal deleted");
      } else {
        res.status(404).send("Goal not found");
      }
    } catch (error) {
      res.status(500).send("Error deleting goal: " + error.message);
    }
  });

  // API endpoints for emotions
  app.route('/api/emotions')
    .get(async (req, res) => {
      if (!req.session.userId) {
        res.status(403).send("Unauthorized");
        return;
      }
      try {
        const emotions = await Emotion.find({ userId: req.session.userId });
        res.json(emotions);
      } catch (error) {
        res.status(500).send("Error retrieving emotions: " + error.message);
      }
    })
    .post(async (req, res) => {
      if (!req.session.userId) {
        res.status(403).send("Unauthorized");
        return;
      }
      try {
        const newEmotion = new Emotion({
          userId: req.session.userId,
          emotion: req.body.emotion,
          date: new Date(req.body.date),
          notes: req.body.notes
        });
        const savedEmotion = await newEmotion.save();
        res.status(201).json(savedEmotion);
      } catch (error) {
        res.status(500).send("Error adding emotion: " + error.message);
      }
    });

  app.delete('/api/emotions/:emotionId', async (req, res) => {
    if (!req.session.userId) {
      res.status(403).send("Unauthorized");
      return;
    }
    try {
      const result = await Emotion.deleteOne({ _id: req.params.emotionId, userId: req.session.userId });
      if (result.deletedCount === 1) {
        res.status(200).send("Emotion deleted successfully");
      } else {
        res.status(404).send("Emotion not found");
      }
    } catch (error) {
      res.status(500).send("Error deleting emotion: " + error.message);
    }
  });

  // User authentication endpoints
  app.post('/submit-login', async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
      });
      if (user) {
        req.session.firstName = user.name;
        req.session.userId = user._id;
        res.redirect('/home.html');
      } else {
        res.status(401).send("Invalid username or password");
      }
    } catch (error) {
      res.status(500).send("Error logging in: " + error.message);
    }
  });

  app.post('/submit-registration', async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      await newUser.save();
      res.redirect('/login');
    } catch (error) {
      res.status(500).send("Registration failed: " + error.message);
    }
  });

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));