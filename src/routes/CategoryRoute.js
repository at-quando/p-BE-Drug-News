const Express = require('express');
const validate = require('express-validation');
const Validation = require('../lib/Validation');
const CategoriesCtrl = require('../controller/CategoriesController');

const router = Express.Router();

router.route('/')
  /** GET /rooms - Get list of rooms */
  .post(CategoriesCtrl.create)
  .get(CategoriesCtrl.list);

router.route('/:id')
  /** GET /rooms - Get list of rooms */
  .post(CategoriesCtrl.edit)
  .get(CategoriesCtrl.show)
  .delete(CategoriesCtrl.destroy);

module.exports = router;