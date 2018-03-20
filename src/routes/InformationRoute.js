const Express = require('express');
const validate = require('express-validation');
const Validation = require('../lib/Validation');
const InformationCtrl = require('../controller/InformationController');

const router = Express.Router();

router.route('/')
  /** GET /rooms - Get list of rooms */
  .post(InformationCtrl.create);

router.route('/:id')
  /** GET /rooms - Get list of rooms */
  .post(InformationCtrl.edit)
  .get(InformationCtrl.show)
  .delete(InformationCtrl.destroy);

module.exports = router;