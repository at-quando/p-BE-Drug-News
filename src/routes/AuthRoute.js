const Express = require('express');
const AuthCtrl = require('../controller/AuthController');

const router = Express.Router();

router.route('/login')
  /** GET /rooms - Get list of rooms */
  .post(ArticlesCtrl.login);

router.route('/logout')
  /** GET /rooms - Get list of rooms */
  .delete(ArticlesCtrl.logout);

module.exports = router;