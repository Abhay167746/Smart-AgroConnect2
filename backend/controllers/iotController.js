const { ethers } = require("ethers");
const contractABI = require("../contracts/AgroPaymentABI.json").abi;

const CONTRACT_ADDRESS = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); 
const signer = provider.getSigner(0); // Act as backend IoT device

exports.handleIoTTrigger = async (req, res) => {
  const { qualityPassed } = req.body;

  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

  try {
    if (qualityPassed) {
      const tx = await contract.approveQuality();
      await tx.wait();
      res.json({ success: true, message: "Payment released to farmer." });
    } else {
      const tx = await contract.rejectQuality();
      await tx.wait();
      res.json({ success: true, message: "Payment refunded to buyer." });
    }
  } catch (error) {
    console.error("IoT Trigger Error:", error);
    res.status(500).json({ error: "Smart contract call failed." });
  }
};
