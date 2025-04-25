const hre = require("hardhat");

async function main() {
  const [buyer, farmer] = await hre.ethers.getSigners();
  const AgroPayment = await hre.ethers.getContractFactory("AgroPayment");
  const contract = await AgroPayment.deploy(farmer.address, { value: hre.ethers.utils.parseEther("1") });
  await contract.deployed();
  console.log("Deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3