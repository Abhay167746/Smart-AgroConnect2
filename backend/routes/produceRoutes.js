const express = require("express");
const router = express.Router();
const { addProduce, getProduce, getProduceByUser } = require("../controllers/produceController");

router.post("/", addProduce);
router.get("/", getProduce);
router.get("/:userId", getProduceByUser);
module.exports = router;
