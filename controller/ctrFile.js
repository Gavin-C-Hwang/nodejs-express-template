var express = require('express');
var session = require('express-session');
var fs = require('fs');
var mime = require('mime-types');
var bodyParser = require('body-parser');
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' }) //업로드 경로 설정
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});
var upload = multer({ storage: storage });

var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(
  session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
  })
);

router.post('/upload', upload.array('userfile'), function(req, res) {
  res.send('Uploaded! : ' + req.file); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  console.log(req.files); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

router.get('/download', function(req, res) {
  var origFileNm, savedFileNm, savedPath, fileSize;
  var file = 'uploads/611ab6b4249afa756b4f937015c3eac2';
  mimetype = mime.lookup('mypic.jpg'); //application/zip, text/plain, image/png 등을 반환
  res.setHeader('Content-disposition', 'attachment; filename=' + 'mypic.jpg');
  res.setHeader('Content-type', mimetype);
  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

module.exports = router;
