const express = require('express');
// const protectedRoutes = require('./ProtectRoute');
// const AuthCtrl = require('../controller/AuthController');
const articleRoute = require('./ArticleRoute');

const router = express.Router();

// router.use(protectedRoutes);

/** GET / - Check service health */
// router.get('/', AuthCtrl.authorize);

router.use('/articles', articleRoute);

module.exports = router;
