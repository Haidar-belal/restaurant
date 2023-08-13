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

const upload = multer({ storage: storage }).array("files");

const item = require("../controllers/item");

router.get("/top-show", item.getActiveItem);

router.post("/", upload, item.storeItem);

router.put("/top-show/update", item.updateTopShow);

router.put("/top-show/new-list", item.updateToActive);

router.post("/add-images", upload, item.storeImages);

router.get("/", item.getAllItems);

router.delete("/delete-image/:id", item.deleteImage);

router.delete("/:id", item.deleteItem);

router.get("/:id", item.getitemById);

router.put("/:id", item.updateItemWithoutImage);

module.exports = router;
