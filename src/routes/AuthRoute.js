const Express = require('express');
const AuthCtrl = require('../controller/AuthController');

const router = Express.Router();

router.route('/login')
  /** GET /rooms - Get list of rooms */
  .post(AuthCtrl.login);

router.route('/logout')
  /** GET /rooms - Get list of rooms */
  .delete(AuthCtrl.logout);

router.route('/show').get(AuthCtrl.authorize, AuthCtrl.show);

module.exports = router;