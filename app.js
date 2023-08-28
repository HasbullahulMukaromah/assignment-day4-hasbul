const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware for role checking
function checkRole(req, res, next) {
  const role = req.query.role;
  if (role === 'admin') {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
}

// Middleware for logging
function logRequest(req, res, next) {
  const logData = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile('access.log', logData, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
  next();
}

app.use(express.json());
app.use(logRequest);

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
