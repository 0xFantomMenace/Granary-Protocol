import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
import { ZERO_ADDRESS } from '../helpers/constants';

export const marketId = 'Lore Genesis Market';
export const providerId = 1;
export const fallBackOracle = ZERO_ADDRESS;

export const gasToken = addresses.Lore.Reserves.ETH;
export const gasTokenFeed = addresses.Lore.Aggregators.ETH;
export const baseCurrencyUnit = '100000000'; // 8 decimals for price feeds (Chainlink)

export const tokens = [
  addresses.Lore.Reserves.USDC,
  addresses.Lore.Reserves.USDT,
  addresses.Lore.Reserves.ETH,
  addresses.Lore.Reserves.STONE,
  addresses.Lore.Reserves.wstETH,
];

export const aggregators = [
  addresses.Lore.Aggregators.USDC,
  addresses.Lore.Aggregators.USDT,
  addresses.Lore.Aggregators.ETH,
  addresses.Lore.Aggregators.STONE,
  addresses.Lore.Aggregators.wstETH,
];

export const atokens = [
  addresses.Lore.Protocol.ATokens.loreUSDC,
  addresses.Lore.Protocol.ATokens.loreUSDT,
  addresses.Lore.Protocol.ATokens.loreETH,
  addresses.Lore.Protocol.ATokens.loreSTONE,
  addresses.Lore.Protocol.ATokens.loreWstETH,
];

export const stokens = [
  addresses.Lore.Protocol.StableDebtTokens.sUSDC,
  addresses.Lore.Protocol.StableDebtTokens.sUSDT,
  addresses.Lore.Protocol.StableDebtTokens.sETH,
  addresses.Lore.Protocol.StableDebtTokens.sSTONE,
  addresses.Lore.Protocol.StableDebtTokens.sWstETH,
];

export const vtokens = [
  addresses.Lore.Protocol.VariableDebtTokens.vUSDC,
  addresses.Lore.Protocol.VariableDebtTokens.vUSDT,
  addresses.Lore.Protocol.VariableDebtTokens.vETH,
  addresses.Lore.Protocol.VariableDebtTokens.vSTONE,
  addresses.Lore.Protocol.VariableDebtTokens.vWstETH,
];

export const rates = [
  ethers.utils.parseUnits('0.039', 27), // USDC
  ethers.utils.parseUnits('0.039', 27), // USDT
  ethers.utils.parseUnits('0.035', 27),  // ETH
  ethers.utils.parseUnits('0.030', 27),  // STONE
  ethers.utils.parseUnits('0.030', 27),  // wstETH
];

export const loanToValues = [
  7500, // USDC
  7000, // USDT
  8000, // ETH
  7000, // STONE
  7000, // wstETH
];

export const liquidationThresholds = [
  8000, // USDC
  7500, // USDT
  8500, // ETH
  7500, // STONE
  7500, // wstETH
];

export const liquidationBonuses = [
  11000, // USDC
  11000, // USDT
  11000, // ETH
  11000, // STONE
  11000, // wstETH
];

export const reserveFactors = [
  5000, // USDC
  5000, // USDT
  5000, // ETH
  5000, // STONE
  5000, // wstETH
];

export const decimals = [
  6, // USDC
  6, // USDT
  18, // ETH
  18, // Stone
  18, // wstETH
];

export const underlyingNames = [
  "USDC", // USDC
  "USDT", // USDT
  "ETH", // ETH
  "STONE", // STONE
  "wstETH", // wstETH
];

export const aTokenNames = [
  "Lore USDC", // USDC
  "Lore USDT", // USDT
  "Lore ETH", // ETH
  "Lore STONE", // STONE
  "Lore wstETH", // wstETH
];

export const aTokenSymbols = [
  "loreUSDC", // USDC
  "loreUSDT", // USDT
  "loreETH", // ETH
  "loreSTONE", // STONE
  "loreWstETH", // wstETH
];

export const vTokenNames = [
  "Lore variable debt bearing USDC", // USDC
  "Lore variable debt bearing USDT", // USDT
  "Lore variable debt bearing ETH", // ETH
  "Lore variable debt bearing STONE", // STONE
  "Lore variable debt bearing wstETH", // wstETH
];

export const vTokenSymbols = [
  "variableDebtUSDC", // USDC
  "variableDebtUSDT", // USDT
  "variableDebtETH", // ETH
  "variableDebtSTONE", // STONE
  "variableDebtWstETH", // wstETH
];

export const sTokenNames = [
  "Lore stable debt bearing USDC", // USDC
  "Lore stable debt bearing USDT", // USDT
  "Lore stable debt bearing ETH", // ETH
  "Lore stable debt bearing STONE", // STONE
  "Lore stable debt bearing wstETH", // wstETH
];

export const sTokenSymbols = [
  "stableDebtUSDC", // USDC
  "stableDebtUSDT", // USDT
  "stableDebtETH", // ETH
  "stableDebtSTONE", // STONE
  "stableDebtWstETH", // wstETH
];