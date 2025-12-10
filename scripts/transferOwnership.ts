const hre = require('hardhat');
import { Etherscan } from "@nomicfoundation/hardhat-verify/etherscan";
import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
import fs from 'fs';
import {
  marketId,
  providerId,
  fallBackOracle,
  tokens,
  aggregators,
  rates,
  volStrat,
  sStrat,
  gasToken,
  baseCurrencyUnit,
  atokens,
  stokens,
  vtokens,
} from '../markets/lore';
import {
  getProvider,
  getRewarder,
  getTreasury,
  getRegistry,
  getLendingRateOracle,
  getOracle,
  getWETHGateway,
} from '../helpers/contracts-getters';
import {
  deployTimelock,
} from '../helpers/contracts-deployments';
import {
  transferOwnership,
  setPoolAdmin,
  setEmergencyAdmin,
} from '../helpers/contracts-helpers';
import { ZERO_ADDRESS, delay } from '../helpers/constants';

const DELAY = 5000;
const deployment = addresses.Lore;



async function main() {
  const provider = await getProvider(deployment.Protocol.Provider);
  const rewarder = await getRewarder(deployment.Peripheral.Rewards.Rewarder);
  const treasury = await getTreasury(deployment.Peripheral.Treasury);
  const registry = await getRegistry(deployment.Protocol.Registry);
  const lendingRateOracle = await getLendingRateOracle(deployment.Protocol.LendingRateOracle);
  const aaveOracle = await getOracle(deployment.Protocol.Oracle);
  const gateway = await getWETHGateway(deployment.Protocol.WETHGateway);


  // ### TRANSFER PERMS ###
  // await setPoolAdmin(provider, deployment.Peripheral.Multisig);
  // console.log(`  > Pool Admin set to ${deployment.Peripheral.Multisig}`);
  // await delay(DELAY);

  // await setEmergencyAdmin(provider, deployment.Peripheral.Multisig);
  // console.log(`  > Emergency Admin set to ${deployment.Peripheral.Multisig}`);
  // await delay(DELAY);


  // ### TRANSFER OWNERSHIP ###
  // await transferOwnership(rewarder, deployment.Peripheral.Multisig);
  // console.log(`  > Rewarder's New Owner: ${await rewarder.owner()}`);
  // await delay(DELAY);

  // await transferOwnership(treasury, deployment.Peripheral.Multisig);
  // console.log(`  > Treasury's New Owner: ${await treasury.owner()}`);
  // await delay(DELAY);

  await transferOwnership(provider, deployment.Peripheral.Timelock);
  console.log(`  > Provider's New Owner: ${await provider.owner()}`);
  await delay(DELAY);

  await transferOwnership(registry, deployment.Peripheral.Timelock);
  console.log(`  > Registry's New Owner: ${await registry.owner()}`);
  await delay(DELAY);

  await transferOwnership(lendingRateOracle, deployment.Peripheral.Timelock);
  console.log(`  > LendingRateOracle's New Owner: ${await lendingRateOracle.owner()}`);
  await delay(DELAY);

  await transferOwnership(aaveOracle, deployment.Peripheral.Timelock);
  console.log(`  > AaveOracle's New Owner: ${await aaveOracle.owner()}`);
  await delay(DELAY);

  await transferOwnership(gateway, deployment.Peripheral.Timelock);
  console.log(`  > WETHGateway's New Owner: ${await gateway.owner()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});