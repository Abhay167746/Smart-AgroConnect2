const Produce = require("../models/Produce");

exports.addProduce = async (req, res) => {
  try {
    const { crop, quantity, price, location, userId, userName } = req.body;

    const produce = new Produce({
      crop,
      quantity,
      price,
      location,
      userId,
      userName,
    });

    const saved = await produce.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to save produce" });
  }
};

// get all produce
exports.getProduce = async (req, res) => {
  try {
    const produceList = await Produce.find().sort({ listedAt: -1 });
    res.status(200).json(produceList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch produce" });
  }
};

exports.getProduceByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const produceList = await Produce.find({ userId }).sort({ listedAt: -1 });
    res.json(produceList);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user listings" });
  }
};