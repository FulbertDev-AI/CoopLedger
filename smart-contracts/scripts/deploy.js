const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy CoopLedger
  const CoopLedger = await ethers.getContractFactory("CoopLedger");
  const coopLedger = await CoopLedger.deploy();
  await coopLedger.deployed();
  console.log("CoopLedger deployed to:", coopLedger.address);

  // Deploy Voting
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.deployed();
  console.log("Voting deployed to:", voting.address);

  // Save addresses
  const addresses = {
    CoopLedger: coopLedger.address,
    Voting: voting.address,
    deployedAt: new Date().toISOString()
  };
  fs.writeFileSync("contract-addresses.json", JSON.stringify(addresses, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
