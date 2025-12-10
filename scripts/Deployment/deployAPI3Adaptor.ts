import { ethers } from "hardhat";
import * as addresses from '../../addresses.json';

async function main() {
  console.log(">>>Starting...<<<");

  const pricefeed = addresses.Linea.Aggregators.DAI.Feed.Production;

  const Adaptor = await ethers.getContractFactory("Api3AggregatorAdaptor");
  const adaptor = await Adaptor.deploy(pricefeed);
  console.log("  >  Api3AggregatorAdaptor.sol: " +adaptor.address);

  console.log(">>>Deployment Complete<<<");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});