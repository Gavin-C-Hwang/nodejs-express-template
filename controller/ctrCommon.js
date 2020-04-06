var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var svc = require('../service/svcCommon');
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));


router.post('/create/commoncode', async function (req, res) {
  let result = await svc.createCommonCode(JSON.stringify(req.body));
  res.send(result);
});

router.get('/retrieve/commoncodelist', async function (req, res) {
  let result = await svc.retrieveCommonCodeList(JSON.stringify(req.query));
  res.send(result);
});

module.exports = router;
