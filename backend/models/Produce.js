const mongoose = require("mongoose");
const produceSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  listedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Produce", produceSchema);
