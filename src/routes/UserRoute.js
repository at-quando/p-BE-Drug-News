const Express = require('express');
const validate = require('express-validation');
const Validation = require('../lib/Validation');
const UsersCtrl = require('../controller/UsersController');

const router = Express.Router();

router.route('/')
  /** GET /rooms - Get list of rooms */
  .post(UsersCtrl.create)
  .get(UsersCtrl.list);

router.route('/:id')
  /** GET /rooms - Get list of rooms */
  .post(UsersCtrl.edit)
  .get(UsersCtrl.show)
  .delete(UsersCtrl.destroy);

module.exports = router;