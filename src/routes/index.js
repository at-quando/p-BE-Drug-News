const express = require('express');
// const protectedRoutes = require('./ProtectRoute');

const router = express.Router();

// router.use(protectedRoutes);

/** GET / - Check service health */
router.get('/', (req, res) =>
  res.send('OK123')
);

module.exports = router;
