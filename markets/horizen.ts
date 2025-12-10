import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
import { ZERO_ADDRESS } from '../helpers/constants';

export const marketId = 'Yuzu Genesis Market';
export const providerId = 1;
export const fallBackOracle = ZERO_ADDRESS;

export const gasToken = addresses.Horizen.Reserves.WZEN;
export const gasTokenFeed = addresses.Horizen.Aggregators.WZEN.Adapter;
export const baseCurrencyUnit = '100000000'; // Pyth Uses 8 decimals for pricefeeds (CL uses 8)

export const tokens = [
  addresses.Horizen.Reserves.WZEN,
  addresses.Horizen.Reserves.USDC,
  addresses.Horizen.Reserves.WETH,
  addresses.Horizen.Reserves.WBTC,
];

export const aggregators = [
  addresses.Horizen.Aggregators.WZEN.Adapter,
  addresses.Horizen.Aggregators.USDC.Adapter,
  addresses.Horizen.Aggregators.WETH.Adapter,
  addresses.Horizen.Aggregators.WBTC.Adapter,
];

export const atokens = [
  addresses.Horizen.Protocol.ATokens.yuzuZEN,
  addresses.Horizen.Protocol.ATokens.yuzuUSDC,
  addresses.Horizen.Protocol.ATokens.yuzuWETH,
  addresses.Horizen.Protocol.ATokens.yuzuWBTC,
];

export const stokens = [
  addresses.Horizen.Protocol.StableDebtTokens.sZEN,
  addresses.Horizen.Protocol.StableDebtTokens.sUSDC,
  addresses.Horizen.Protocol.StableDebtTokens.sWETH,
  addresses.Horizen.Protocol.StableDebtTokens.sWBTC,
];

export const vtokens = [
  addresses.Horizen.Protocol.VariableDebtTokens.vZEN,
  addresses.Horizen.Protocol.VariableDebtTokens.vUSDC,
  addresses.Horizen.Protocol.VariableDebtTokens.vWETH,
  addresses.Horizen.Protocol.VariableDebtTokens.vWBTC,
];

export const rates = [
  ethers.utils.parseUnits('0.039', 27), // ZEN
  ethers.utils.parseUnits('0.039', 27), // USDC
  ethers.utils.parseUnits('0.035', 27), // WETH
  ethers.utils.parseUnits('0.03', 27),  // WBTC
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