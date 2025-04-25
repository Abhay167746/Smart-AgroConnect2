const express = require("express");
const router = express.Router();
const { handleIoTTrigger } = require("../controllers/iotController");

router.post("/trigger", handleIoTTrigger);

module.exports = router;
