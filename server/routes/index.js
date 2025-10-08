var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/assets', function(req, res, next) {
  res.render('assets')
})

module.exports = router;
