

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Aman patial here for GET response!' });
});

router.post('/', function(req, res, next) {
res.render('index', { title: 'Aman patial here for POST response!' });
});

module.exports = router;


