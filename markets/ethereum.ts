import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
import { ZERO_ADDRESS } from '../helpers/constants';

export const marketId = 'Granary Genesis Market';
export const providerId = 1;
export const fallBackOracle = ZERO_ADDRESS;

export const tokens = [
  addresses.Reserves.DAI,
  addresses.Reserves.USDC,
  addresses.Reserves.USDT,
  addresses.Reserves.WBTC,
  addresses.Reserves.WETH,
];

export const aggregators = [
  addresses.Aggregators.DAI,
  addresses.Aggregators.USDC,
  addresses.Aggregators.USDT,
  addresses.Aggregators.WBTC,
  addresses.Aggregators.WETH,
];

export const rates = [
  ethers.utils.parseUnits('0.039', 27),
  ethers.utils.parseUnits('0.039', 27),
  ethers.utils.parseUnits('0.035', 27),
  ethers.utils.parseUnits('0.03', 27),
  ethers.utils.parseUnits('0.03', 27),
];

export const volStrat = [
  ethers.utils.parseUnits('0.45', 27), // optimalUtilizationRate
  ethers.utils.parseUnits('0', 27), // baseVariableBorrowRate
  ethers.utils.parseUnits('0.07', 27), // variableRateSlope1
  ethers.utils.parseUnits('3', 27), // variableRateSlope2
  '0', // stableRateSlope1
  '0', // stableRateSlope2
];

export const sStrat = [
  ethers.utils.parseUnits('0.8', 27), // optimalUtilizationRate
  ethers.utils.parseUnits('0', 27), // baseVariableBorrowRate
  ethers.utils.parseUnits('0.04', 27), // variableRateSlope1
  ethers.utils.parseUnits('0.75', 27), // variableRateSlope2
  '0', // stableRateSlope1
  '0', // stableRateSlope2
];