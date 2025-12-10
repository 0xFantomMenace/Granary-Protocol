import { ethers } from "hardhat";
import * as addresses from '../../addresses.json';

async function main() {
  console.log(">>>Starting...<<<");

  const pricefeed = addresses.Mode.Aggregators.ETH.Production.Feed;

  const Adaptor = await ethers.getContractFactory("RedStoneAdaptorETH");
  const adaptor = await Adaptor.deploy(pricefeed);
  console.log("  >  RedStoneAdaptorETH.sol: " +adaptor.address);

  console.log(">>>Deployment Complete<<<");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});