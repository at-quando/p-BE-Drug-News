const express = require('express');
// const protectedRoutes = require('./ProtectRoute');
// const AuthCtrl = require('../controller/AuthController');
const articleRoute = require('./ArticleRoute');
const categoryRoute = require('./CategoryRoute');
const informationRoute = require('./InformationRoute');
const userRoute = require('./UserRoute');
const imageRoute = require('./ImageRoute');
const authRoute = require('./AuthRoute');

const router = express.Router();

// router.use(protectedRoutes);

/** GET / - Check service health */
// router.get('/', AuthCtrl.authorize);

router.use('/articles', articleRoute);
router.use('/categories', categoryRoute);
router.use('/information', informationRoute);
router.use('/users', userRoute);
router.use('/images', imageRoute);
router.use('/auth', authRoute);

module.exports = router;
