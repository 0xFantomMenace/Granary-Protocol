import { ethers } from "hardhat";
import * as addresses from '../../addresses.json';

async function main() {
  console.log(">>>Starting...<<<");

  const pricefeed = addresses.Horizen.Aggregators.USDC.Feed;
  const feedID = addresses.Horizen.Aggregators.USDC.FeedID;


  const Adaptor = await ethers.getContractFactory("PythAggregatorV3");
  const adaptor = await Adaptor.deploy(pricefeed, feedID);
  console.log("  >  PythAggregatorV3.sol: " +adaptor.address);

  console.log(">>>Deployment Complete<<<");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});