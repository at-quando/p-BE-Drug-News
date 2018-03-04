const Express = require('express');
const validate = require('express-validation');
const Validation = require('../lib/Validation');
const ArticlesCtrl = require('../controller/ArticlesController');

const router = Express.Router();

router.route('/')
  /** GET /rooms - Get list of rooms */
  .get(ArticlesCtrl.create);

module.exports = router;