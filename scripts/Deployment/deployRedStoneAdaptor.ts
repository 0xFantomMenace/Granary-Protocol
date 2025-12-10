import { ethers } from "hardhat";
import * as addresses from '../../addresses.json';

async function main() {
  console.log(">>>Starting...<<<");

  const pricefeed = addresses.Mode.Aggregators.ezETH.Feed;
  const asset = addresses.Mode.Reserves.weETH;

  const Adaptor = await ethers.getContractFactory("RedStoneAdaptor");
  const adaptor = await Adaptor.deploy(pricefeed, asset);
  console.log("  >  RedStoneAdaptor.sol: " +adaptor.address);

  console.log(">>>Deployment Complete<<<");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});