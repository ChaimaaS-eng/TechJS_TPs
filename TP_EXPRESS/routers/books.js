const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  const books = [
    { title: 'Clean Code', author: 'Robert C. Martin' },
    { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas' },
    { title: 'You Don\'t Know JS', author: 'Kyle Simpson' },
  ];
  res.json({ user: req.user.username, books });
});

module.exports = router;