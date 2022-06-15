const express = require('express');

const multer = require('multer');

var router = express.Router();

router.get("/", function (req, res, next) {

    res.render('fileupload', {title: "File upload in NodeJs Express", message: req.flash('success')});


});


router.post("/", function (req,res, next) {

    var storage = multer.diskStorage({


        destination:function (req, file, callback) {

            callback(null, './uploads');

        },

        filename : function (req, file, callback) {
            var temp_file_array = file.originalname.split(".");

            var temp_file_name = temp_file_array[0];

            var temp_file_extension = temp_file_array[1];

            callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
        }

    });

    var upload = multer({storage:storage}).single('sample_image');

    upload(req,res, function (err){

        if (err){
            return res.end('Error Uploading File');
        }
        else {
            req.flash('success', req.file.filename);

            res.redirect('/fileupload');
            // return res.end('File Uploaded Successfully');
        }

    })

})

module.exports = router;




