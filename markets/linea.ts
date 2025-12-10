import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
import { ZERO_ADDRESS } from '../helpers/constants';

export const marketId = 'Granary Genesis Market';
export const providerId = 1;
export const fallBackOracle = ZERO_ADDRESS;

export const gasToken = addresses.Linea.Reserves.WETH;
export const gasTokenFeed = addresses.Linea.Aggregators.WETH.Adapter;
export const baseCurrencyUnit = '1000000000000000000'; // API3 Uses 18 decimals for pricefeeds (CL uses 8)

export const tokens = [
  addresses.Linea.Reserves.DAI,
  addresses.Linea.Reserves.USDC,
  addresses.Linea.Reserves.USDT,
  addresses.Linea.Reserves.WETH,
  addresses.Linea.Reserves.WBTC,
];

export const aggregators = [
  addresses.Linea.Aggregators.DAI.Adapter,
  addresses.Linea.Aggregators.USDC.Adapter,
  addresses.Linea.Aggregators.USDT.Adapter,
  addresses.Linea.Aggregators.WETH.Adapter,
  addresses.Linea.Aggregators.WBTC.Adapter,
];

export const atokens = [
  addresses.Linea.Protocol.ATokens.grainDAI,
  addresses.Linea.Protocol.ATokens.grainUSDC,
  addresses.Linea.Protocol.ATokens.grainUSDT,
  addresses.Linea.Protocol.ATokens.grainWETH,
  addresses.Linea.Protocol.ATokens.grainWBTC,
];

export const stokens = [
  addresses.Linea.Protocol.StableDebtTokens.sDAI,
  addresses.Linea.Protocol.StableDebtTokens.sUSDC,
  addresses.Linea.Protocol.StableDebtTokens.sUSDT,
  addresses.Linea.Protocol.StableDebtTokens.sWETH,
  addresses.Linea.Protocol.StableDebtTokens.sWBTC,
];

export const vtokens = [
  addresses.Linea.Protocol.VariableDebtTokens.vDAI,
  addresses.Linea.Protocol.VariableDebtTokens.vUSDC,
  addresses.Linea.Protocol.VariableDebtTokens.vUSDT,
  addresses.Linea.Protocol.VariableDebtTokens.vWETH,
  addresses.Linea.Protocol.VariableDebtTokens.vWBTC,
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