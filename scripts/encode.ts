import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
const abiCoder = ethers.utils.defaultAbiCoder;


async function main() {
  const tokens = [
    addresses.Linea.Reserves.DAI,
    addresses.Linea.Reserves.USDC,
    addresses.Linea.Reserves.USDT,
    addresses.Linea.Reserves.WETH,
    addresses.Linea.Reserves.WBTC,
  ];
  const aggregators = [
    addresses.Linea.Aggregators.DAI.Adapter.Production,
    addresses.Linea.Aggregators.USDC.Adapter.Production,
    addresses.Linea.Aggregators.USDT.Adapter.Production,
    addresses.Linea.Aggregators.WETH.Adapter.Production,
    addresses.Linea.Aggregators.WBTC.Adapter.Production,
  ];

  // console.log(tokens);
  // console.log(aggregators);

  // const encodedData = abiCoder.encode(['address[]','address[]'],[tokens, aggregators]);
  // console.log(encodedData);

  const newOwner = "0x0d75BD85F718681C55829f8f9170B12A9e2e75Be";
  const encodedData = abiCoder.encode(['address'],[newOwner]);
  console.log(encodedData);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});