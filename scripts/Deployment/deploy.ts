import { ethers } from 'hardhat';
import { BigNumberish } from 'ethers';
import * as addresses from '../../addresses.json';
import {
  ZERO_ADDRESS,
  delay,
  volStrat,
  sStrat,
} from '../../helpers/constants';
import {
  getConfiguratorProxy,
  getWETHGateway,
  getProvider,
  getATokensAndRatesHelper,
  getProtocolDataProvider,
  getRewarder,
  getAToken,
  getVariableDebtToken,
  getStableDebtToken,
  getDefaultReserveInterestRateStrategy,
  getTreasury,
} from '../../helpers/contracts-getters';

import {
  deployRewarder,
  deployLendingPoolAddressesProviderRegistry,
  deployLendingPoolAddressesProvider,
  deployReserveFactorTreasury,
  deployReserveLogicLibrary,
  deployGenericLogic,
  deployValidationLogic,
  deployLendingPool,
  deployLendingPoolConfigurator,
  deployStableAndVariableTokensHelper,
  deployATokensAndRatesHelper,
  deployAToken,
  deployVariableDebtToken,
  deployStableDebtToken,
  deployOracle,
  deployLendingRateOracle,
  deployProtocolDataProvider,
  deployWETHGateway,
  deployDefaultReserveInterestRateStrategy,
  deployLendingPoolCollateralManager,
  deployWalletBalanceProvider,
  deployChainlinkSourcesRegistry,
  deployUiPoolDataProviderV2,
  deployTimelock,
} from '../../helpers/contracts-deployments';

import {
  registerAddressesProvider,
  setPoolAdmin,
  setEmergencyAdmin,
  fetchPoolAdmin,
  fetchEmergencyAdmin,
  setLendingPoolImpl,
  fetchLendingPool,
  setLendingPoolConfiguratorImpl,
  fetchLendingPoolConfigurator,
  setPoolPause,
  setPriceOracle,
  setLendingRateOracle,
  transferOwnership,
  setOracleBorrowRates,
  setOracleOwnership,
  initializeReservesInBatch,
  configureReserve,
  setLendingPoolCollateralManagerImpl,
  authorizeWETHGateway,
  fetchReserveTokensAddresses,
  setAddress,
} from '../../helpers/contracts-helpers';

import {
  marketId,
  providerId,
  fallBackOracle,
  tokens,
  aggregators,
  rates,
  gasToken,
  gasTokenFeed,
  baseCurrencyUnit,
  loanToValues,
  liquidationThresholds,
  reserveFactors,
  liquidationBonuses,
  decimals,
  underlyingNames,
  aTokenNames,
  aTokenSymbols,
  vTokenNames,
  vTokenSymbols,
  sTokenNames,
  sTokenSymbols,
} from '../../markets/lore';

const DELAY = 30000;
const deployment = addresses.Lore;


async function main() {
  console.log(`>>>Starting Full Protocol Deployment<<<`);

  const [owner] = await ethers.getSigners();
  const adminAddress = owner.address;
  console.log(`  > Deployer address: ${adminAddress}`);

  // ============================================
  // PHASE 1: Core Infrastructure
  // ============================================

  const rewarder = await deployRewarder();
  console.log(`  > Rewarder.sol: ${rewarder.address}`);
  await delay(DELAY);

  const registry = await deployLendingPoolAddressesProviderRegistry();
  console.log(`  > Registry.sol: ${registry.address}`);
  await delay(DELAY);

  const provider = await deployLendingPoolAddressesProvider(marketId);
  console.log(`  > Provider.sol: ${provider.address}`);
  await delay(DELAY);
  await registerAddressesProvider(registry, provider.address, providerId);
  console.log(`  > Provider ${providerId} registered.`);
  await delay(DELAY);

  await setPoolAdmin(provider, adminAddress);
  console.log(`  > Pool admin set to: ${await fetchPoolAdmin(provider)}`);
  await delay(DELAY);
  await setEmergencyAdmin(provider, adminAddress);
  console.log(`  > Emergency admin set to: ${await fetchEmergencyAdmin(provider)}`);
  await delay(DELAY);

  // ============================================
  // PHASE 2: Logic Libraries
  // ============================================

  const reserveLogic = await deployReserveLogicLibrary();
  console.log(`  > ReserveLogic.sol: ${reserveLogic.address}`);
  await delay(DELAY);

  const genericLogic = await deployGenericLogic();
  console.log(`  > GenericLogic.sol: ${genericLogic.address}`);
  await delay(DELAY);

  const validationLogic = await deployValidationLogic(genericLogic);
  console.log(`  > ValidationLogic.sol: ${validationLogic.address}`);
  await delay(DELAY);

  // ============================================
  // PHASE 3: Lending Pool
  // ============================================

  const lendingPool = await deployLendingPool(reserveLogic.address, validationLogic.address);
  console.log(`  > LendingPool.sol: ${lendingPool.address}`);
  await delay(DELAY);
  await lendingPool.initialize(provider.address);
  await delay(DELAY);
  console.log(`  > Initialized lending pool with provider, ${provider.address}`);
  await setLendingPoolImpl(provider, lendingPool.address);
  await delay(DELAY);
  const lendingPoolProxyAddress = await fetchLendingPool(provider);
  console.log(`  > LendingPool.sol (PROXY): ${lendingPoolProxyAddress}`);
  await delay(DELAY);

  const treasury = await deployReserveFactorTreasury(provider.address);
  console.log(`  > Treasury.sol: ${treasury.address}`);
  await delay(DELAY);

  // ============================================
  // PHASE 4: Configurator
  // ============================================

  const configurator = await deployLendingPoolConfigurator();
  console.log(`  > LendingPoolConfigurator.sol: ${configurator.address}`);
  await delay(DELAY);
  await setLendingPoolConfiguratorImpl(provider, configurator.address);
  await delay(DELAY);
  const configuratorProxyAddress = await fetchLendingPoolConfigurator(provider);
  console.log(`  > LendingPoolConfigurator.sol (PROXY): ${configuratorProxyAddress}`);
  await delay(DELAY);
  const configuratorProxy = await getConfiguratorProxy(configuratorProxyAddress);
  await delay(DELAY);
  await setPoolPause(configuratorProxy, true);
  console.log(`  > Market paused during deployment.`);
  await delay(DELAY);

  // ============================================
  // PHASE 5: Token Implementations
  // ============================================

  const aHelper = await deployATokensAndRatesHelper(lendingPoolProxyAddress, provider.address, configuratorProxyAddress);
  console.log(`  > ATokensAndRatesHelper.sol: ${aHelper.address}`);
  await delay(DELAY);

  const aToken = await deployAToken();
  console.log(`  > AToken.sol: ${aToken.address}`);
  await delay(DELAY);

  const vToken = await deployVariableDebtToken();
  console.log(`  > VariableDebtToken.sol: ${vToken.address}`);
  await delay(DELAY);

  const sToken = await deployStableDebtToken();
  console.log(`  > StableDebtToken.sol: ${sToken.address}`);
  await delay(DELAY);

  // ============================================
  // PHASE 6: Oracles
  // ============================================

  const oracle = await deployOracle(tokens, aggregators, fallBackOracle, ZERO_ADDRESS, baseCurrencyUnit);
  console.log(`  > Oracle deployed at: ${oracle.address}`);
  await delay(DELAY);
  await setPriceOracle(provider, oracle.address);
  console.log(`  > Price Oracle set in provider.`);
  await delay(DELAY);

  const svHelper = await deployStableAndVariableTokensHelper(lendingPoolProxyAddress, provider.address);
  console.log(`  > StableAndVariableTokensHelper.sol: ${svHelper.address}`);
  await delay(DELAY);
  const lendingRateOracle = await deployLendingRateOracle();
  console.log(`  > LendingRateOracle.sol: ${lendingRateOracle.address}`);
  await delay(DELAY);
  await setLendingRateOracle(provider, lendingRateOracle.address);
  console.log(`  > Lending Rate Oracle set in provider.`);
  await delay(DELAY);
  await transferOwnership(lendingRateOracle, svHelper.address);
  console.log(`  > Ownership transferred to StableAndVariableTokensHelper.`);
  await delay(DELAY);
  await setOracleBorrowRates(svHelper, tokens, rates, lendingRateOracle.address);
  console.log(`  > Oracle borrow rates successfully set.`);
  await delay(DELAY);
  await setOracleOwnership(svHelper, lendingRateOracle.address, adminAddress);
  console.log(`  > Ownership transferred back to Pool Admin.`);
  await delay(DELAY);

  // ============================================
  // PHASE 7: Interest Rate Strategies
  // ============================================

  const stableStrategy = await deployDefaultReserveInterestRateStrategy(
    provider.address,
    sStrat[0],
    sStrat[1],
    sStrat[2],
    sStrat[3],
    sStrat[4],
    sStrat[5]
  );
  console.log(`  > Stable Strategy: ${stableStrategy.address}`);
  await delay(DELAY);

  const volatileStrategy = await deployDefaultReserveInterestRateStrategy(
    provider.address,
    volStrat[0],
    volStrat[1],
    volStrat[2],
    volStrat[3],
    volStrat[4],
    volStrat[5]
  );
  console.log(`  > Volatile Strategy: ${volatileStrategy.address}`);
  await delay(DELAY);

  // ============================================
  // PHASE 8: Initialize Reserves
  // ============================================

  const initInputParams1: {
    aTokenImpl: string;
    stableDebtTokenImpl: string;
    variableDebtTokenImpl: string;
    underlyingAssetDecimals: BigNumberish;
    interestRateStrategyAddress: string;
    underlyingAsset: string;
    treasury: string;
    incentivesController: string;
    underlyingAssetName: string;
    aTokenName: string;
    aTokenSymbol: string;
    variableDebtTokenName: string;
    variableDebtTokenSymbol: string;
    stableDebtTokenName: string;
    stableDebtTokenSymbol: string;
    params: string;
  }[] = [];

  const initInputParams2: {
    aTokenImpl: string;
    stableDebtTokenImpl: string;
    variableDebtTokenImpl: string;
    underlyingAssetDecimals: BigNumberish;
    interestRateStrategyAddress: string;
    underlyingAsset: string;
    treasury: string;
    incentivesController: string;
    underlyingAssetName: string;
    aTokenName: string;
    aTokenSymbol: string;
    variableDebtTokenName: string;
    variableDebtTokenSymbol: string;
    stableDebtTokenName: string;
    stableDebtTokenSymbol: string;
    params: string;
  }[] = [];

  // USDC
  initInputParams1.push({
    aTokenImpl: aToken.address,
    stableDebtTokenImpl: sToken.address,
    variableDebtTokenImpl: vToken.address,
    underlyingAssetDecimals: decimals[0],
    interestRateStrategyAddress: stableStrategy.address,
    underlyingAsset: tokens[0],
    treasury: treasury.address,
    incentivesController: rewarder.address,
    underlyingAssetName: underlyingNames[0],
    aTokenName: aTokenNames[0],
    aTokenSymbol: aTokenSymbols[0],
    variableDebtTokenName: vTokenNames[0],
    variableDebtTokenSymbol: vTokenSymbols[0],
    stableDebtTokenName: sTokenNames[0],
    stableDebtTokenSymbol: sTokenSymbols[0],
    params: '0x10'
  });

  // USDT
  initInputParams1.push({
    aTokenImpl: aToken.address,
    stableDebtTokenImpl: sToken.address,
    variableDebtTokenImpl: vToken.address,
    underlyingAssetDecimals: decimals[1],
    interestRateStrategyAddress: stableStrategy.address,
    underlyingAsset: tokens[1],
    treasury: treasury.address,
    incentivesController: rewarder.address,
    underlyingAssetName: underlyingNames[1],
    aTokenName: aTokenNames[1],
    aTokenSymbol: aTokenSymbols[1],
    variableDebtTokenName: vTokenNames[1],
    variableDebtTokenSymbol: vTokenSymbols[1],
    stableDebtTokenName: sTokenNames[1],
    stableDebtTokenSymbol: sTokenSymbols[1],
    params: '0x10'
  });

  // WETH
  initInputParams1.push({
    aTokenImpl: aToken.address,
    stableDebtTokenImpl: sToken.address,
    variableDebtTokenImpl: vToken.address,
    underlyingAssetDecimals: decimals[2],
    interestRateStrategyAddress: volatileStrategy.address,
    underlyingAsset: tokens[2],
    treasury: treasury.address,
    incentivesController: rewarder.address,
    underlyingAssetName: underlyingNames[2],
    aTokenName: aTokenNames[2],
    aTokenSymbol: aTokenSymbols[2],
    variableDebtTokenName: vTokenNames[2],
    variableDebtTokenSymbol: vTokenSymbols[2],
    stableDebtTokenName: sTokenNames[2],
    stableDebtTokenSymbol: sTokenSymbols[2],
    params: '0x10'
  });

  // STONE
  initInputParams2.push({
    aTokenImpl: aToken.address,
    stableDebtTokenImpl: sToken.address,
    variableDebtTokenImpl: vToken.address,
    underlyingAssetDecimals: decimals[3],
    interestRateStrategyAddress: volatileStrategy.address,
    underlyingAsset: tokens[3],
    treasury: treasury.address,
    incentivesController: rewarder.address,
    underlyingAssetName: underlyingNames[3],
    aTokenName: aTokenNames[3],
    aTokenSymbol: aTokenSymbols[3],
    variableDebtTokenName: vTokenNames[3],
    variableDebtTokenSymbol: vTokenSymbols[3],
    stableDebtTokenName: sTokenNames[3],
    stableDebtTokenSymbol: sTokenSymbols[3],
    params: '0x10'
  });

  // wstETH
  initInputParams2.push({
    aTokenImpl: aToken.address,
    stableDebtTokenImpl: sToken.address,
    variableDebtTokenImpl: vToken.address,
    underlyingAssetDecimals: decimals[4],
    interestRateStrategyAddress: volatileStrategy.address,
    underlyingAsset: tokens[4],
    treasury: treasury.address,
    incentivesController: rewarder.address,
    underlyingAssetName: underlyingNames[4],
    aTokenName: aTokenNames[4],
    aTokenSymbol: aTokenSymbols[4],
    variableDebtTokenName: vTokenNames[4],
    variableDebtTokenSymbol: vTokenSymbols[4],
    stableDebtTokenName: sTokenNames[4],
    stableDebtTokenSymbol: sTokenSymbols[4],
    params: '0x10'
  });

  await initializeReservesInBatch(configuratorProxy, initInputParams1);
  console.log(`  > Reserves batch #1 initialized.`);
  await delay(DELAY);
  await initializeReservesInBatch(configuratorProxy, initInputParams2);
  console.log(`  > Reserves batch #2 initialized.`);
  await delay(DELAY);

  // ============================================
  // PHASE 9: Configure Reserves
  // ============================================

  const inputConfigParams: {
    asset: string;
    baseLTV: BigNumberish;
    liquidationThreshold: BigNumberish;
    liquidationBonus: BigNumberish;
    reserveFactor: BigNumberish;
    stableBorrowingEnabled: boolean;
    borrowingEnabled: boolean;
  }[] = [];

  // USDC
  inputConfigParams.push({
    asset: tokens[0],
    baseLTV: loanToValues[0],
    liquidationThreshold: liquidationThresholds[0],
    liquidationBonus: liquidationBonuses[0],
    reserveFactor: reserveFactors[0],
    stableBorrowingEnabled: false,
    borrowingEnabled: true,
  });

  // USDT
  inputConfigParams.push({
    asset: tokens[1],
    baseLTV: loanToValues[1],
    liquidationThreshold: liquidationThresholds[1],
    liquidationBonus: liquidationBonuses[1],
    reserveFactor: reserveFactors[1],
    stableBorrowingEnabled: false,
    borrowingEnabled: true,
  });

  // WETH
  inputConfigParams.push({
    asset: tokens[2],
    baseLTV: loanToValues[2],
    liquidationThreshold: liquidationThresholds[2],
    liquidationBonus: liquidationBonuses[2],
    reserveFactor: reserveFactors[2],
    stableBorrowingEnabled: false,
    borrowingEnabled: true,
  });

  // STONE
  inputConfigParams.push({
    asset: tokens[3],
    baseLTV: loanToValues[3],
    liquidationThreshold: liquidationThresholds[3],
    liquidationBonus: liquidationBonuses[3],
    reserveFactor: reserveFactors[3],
    stableBorrowingEnabled: false,
    borrowingEnabled: true,
  });

  // wstETH
  inputConfigParams.push({
    asset: tokens[4],
    baseLTV: loanToValues[4],
    liquidationThreshold: liquidationThresholds[4],
    liquidationBonus: liquidationBonuses[4],
    reserveFactor: reserveFactors[4],
    stableBorrowingEnabled: false,
    borrowingEnabled: true,
  });

  await setPoolAdmin(provider, aHelper.address);
  console.log(`  > ATokensAndRatesHelper is now Provider Admin.`);
  await delay(DELAY);

  await configureReserve(aHelper, inputConfigParams);
  console.log(`  > Reserves Successfully Configured with ATokensAndRatesHelper.`);
  await delay(DELAY);

  await setPoolAdmin(provider, adminAddress);
  console.log(`  > Pool Admin has been reset to Default Admin.`);
  await delay(DELAY);

  // ============================================
  // PHASE 10: Additional Components
  // ============================================

  const collateralManager = await deployLendingPoolCollateralManager();
  console.log(`  > LendingPoolCollateralManager.sol: ${collateralManager.address}`);
  await delay(DELAY);
  await setLendingPoolCollateralManagerImpl(provider, collateralManager.address);
  console.log(`  > Set Lending Pool Collateral Manager implementation address to: ${collateralManager.address}`);
  await delay(DELAY);

  const protocolDataProvider = await deployProtocolDataProvider(provider.address);
  console.log(`  > ProtocolDataProvider.sol: ${protocolDataProvider.address}`);
  await delay(DELAY);

  await setAddress(provider, '0x0100000000000000000000000000000000000000000000000000000000000000', protocolDataProvider.address);
  console.log(`  > Protocol Data Provider Registered with Provider.`);
  await delay(DELAY);

  const walletBalanceProvider = await deployWalletBalanceProvider();
  console.log(`  > WalletBalanceProvider.sol: ${walletBalanceProvider.address}`);
  await delay(DELAY);

  const gateway = await deployWETHGateway(gasToken, provider.address);
  console.log(`  > WETHGateway.sol: ${gateway.address}`);
  await delay(DELAY);

  await authorizeWETHGateway(gateway, lendingPoolProxyAddress);
  console.log(`  > Authorization of WETHGateway Successful.`);
  await delay(DELAY);

  // ============================================
  // PHASE 11: UI Data Providers
  // ============================================

  const chainlinkSourcesRegistry = await deployChainlinkSourcesRegistry();
  console.log(`  > ChainlinkSourcesRegistry.sol: ${chainlinkSourcesRegistry.address}`);
  await delay(DELAY);
  await chainlinkSourcesRegistry.updateAggregators(tokens, aggregators);
  console.log(`  > Aggregators successfully updated`);
  await delay(DELAY);

  const uiPoolDataProviderV2 = await deployUiPoolDataProviderV2(gasTokenFeed, gasTokenFeed);
  console.log(`  > UiPoolDataProviderV2.sol: ${uiPoolDataProviderV2.address}`);
  await delay(DELAY);

  // ============================================
  // PHASE 12: Unpause and Finalize
  // ============================================

  await setPoolPause(configuratorProxy, false);
  console.log(`  > LendingPool Unpaused`);
  await delay(DELAY);

  // Print deployed token addresses
  console.log(`\n  === Deployed Reserve Token Addresses ===`);
  for (let i = 0; i < tokens.length; i++) {
    const tokenArray = await fetchReserveTokensAddresses(protocolDataProvider, tokens[i]);
    const ERC20 = await ethers.getContractFactory('ERC20');
    const erc20 = await ERC20.attach(tokens[i]);
    const symbol = await erc20.symbol();
    console.log(`${symbol}:`);
    console.log(`  > aToken address: ${tokenArray[0]}`);
    console.log(`  > stable debt address: ${tokenArray[1]}`);
    console.log(`  > variable debt address: ${tokenArray[2]}`);
  }

  console.log(`\n>>>Deployment Complete<<<`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
