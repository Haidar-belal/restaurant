const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/photos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage }).single("files");

const { getCategory, storeCategory, updateCategory, deleteCategory, getCategoryById, getCategoryByIdLanguage
} = require('../controllers/category');

router.get('/', getCategory);

router.get('/:id', getCategoryById);

router.get('/lan/:id', getCategoryByIdLanguage);

router.post('/', upload, storeCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);


module.exports = router;