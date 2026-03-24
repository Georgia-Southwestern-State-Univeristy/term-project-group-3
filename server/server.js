const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..')));

app.use(express.json());

app.use(
  session({
    secret: 'fittrack-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.loggedIn = true;
    req.session.username = username;
    return res.json({ success: true });
  } else {
    return res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/workouts', (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const workouts = [
    { id: 1, type: 'Running', duration: 30, date: '2026-03-20' },
    { id: 2, type: 'Cycling', duration: 45, date: '2026-03-19' },
  ];

  res.json(workouts);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`💡 Open your browser to http://localhost:${PORT} to view the app`);
});
