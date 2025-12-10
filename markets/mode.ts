import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
import { ZERO_ADDRESS } from '../helpers/constants';

export const marketId = 'Ironclad Genesis Market';
export const providerId = 1;
export const fallBackOracle = ZERO_ADDRESS;

export const gasToken = addresses.Mode.Reserves.ETH;
export const gasTokenFeed = addresses.Mode.Aggregators.ETH.Adapter;
export const baseCurrencyUnit = '100000000'; // 8 decimals for price feeds (Chainlink)

export const tokens = [
  addresses.Mode.Reserves.USDC,
  addresses.Mode.Reserves.USDT,
  addresses.Mode.Reserves.ETH,
];

export const aggregators = [
  addresses.Mode.Aggregators.USDC.Adapter,
  addresses.Mode.Aggregators.USDT.Adapter,
  addresses.Mode.Aggregators.ETH.Adapter,
];

export const atokens = [
  addresses.Mode.Protocol.ATokens.ironUSDC,
  addresses.Mode.Protocol.ATokens.ironUSDT,
  addresses.Mode.Protocol.ATokens.ironETH,
];

export const stokens = [
  addresses.Mode.Protocol.StableDebtTokens.sUSDC,
  addresses.Mode.Protocol.StableDebtTokens.sUSDT,
  addresses.Mode.Protocol.StableDebtTokens.sETH,
];

export const vtokens = [
  addresses.Mode.Protocol.VariableDebtTokens.vUSDC,
  addresses.Mode.Protocol.VariableDebtTokens.vUSDT,
  addresses.Mode.Protocol.VariableDebtTokens.vETH,
];

export const rates = [
  ethers.utils.parseUnits('0.039', 27), // USDC
  ethers.utils.parseUnits('0.039', 27), // USDT
  ethers.utils.parseUnits('0.03', 27),  // ETH
];

export const loanToValues = [
  8000, // USDC
  8000, // USDT
  7000, // ETH
];

export const liquidationThresholds = [
  8500, // USDC
  8500, // USDT
  7500, // ETH
];

export const liquidationBonuses = [
  11000, // USDC
  11000, // USDT
  11000, // ETH
];

export const reserveFactors = [
  2000, // USDC
  2000, // USDT
  2000, // ETH
];

export const decimals = [
  6, // USDC
  6, // USDT
  18, // ETH
];

export const underlyingNames = [
  "USDC", // USDC
  "USDT", // USDT
  "ETH", // ETH
];

export const aTokenNames = [
  "Ironclad USDC", // USDC
  "Ironclad USDT", // USDT
  "Ironclad ETH", // ETH
];

export const aTokenSymbols = [
  "ironUSDC", // USDC
  "ironUSDT", // USDT
  "ironETH", // ETH
];

export const vTokenNames = [
  "Ironclad variable debt bearing USDC", // USDC
  "Ironclad variable debt bearing USDT", // USDT
  "Ironclad variable debt bearing ETH", // ETH
];

export const vTokenSymbols = [
  "variableDebtUSDC", // USDC
  "variableDebtUSDT", // USDT
  "variableDebtETH", // ETH
];

export const sTokenNames = [
  "Ironclad stable debt bearing USDC", // USDC
  "Ironclad stable debt bearing USDT", // USDT
  "Ironclad stable debt bearing ETH", // ETH
];

export const sTokenSymbols = [
  "stableDebtUSDC", // USDC
  "stableDebtUSDT", // USDT
  "stableDebtETH", // ETH
];