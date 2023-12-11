var express = require('express');
var router = express.Router();
var path = require('path');
const multer  = require('multer')
const bidea = path.join(__dirname, '../public/uploads/');
console.log(bidea)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, bidea)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let name = file.originalname.split(`.`)[0];
        let type = file.originalname.split(`.`)[1];
        cb(null, name+'-' + uniqueSuffix + '.'+type);
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Fitxategiaren mota ez da onargarria. PNG fitxategia behar da.'));
    }
  };
  
  const limits = {
    fileSize: 2 * 1024 * 1024, 
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
  });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file);
    const izena = req.body.izena;
    const responseText = `Zure izena: ${izena}. Fitxategia: ${req.file.path}`;
    console.log(responseText)
    res.send(responseText);
});

module.exports = router;
