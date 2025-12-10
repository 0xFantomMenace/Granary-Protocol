import { ethers } from 'hardhat';


// ===================================== //
//              PROTOCOL CORE            //
// ===================================== // 

export async function deployRewarder() {
  let Rewarder = await ethers.getContractFactory('Rewarder');
  let rewarder = await Rewarder.deploy();
  return rewarder; 
}

export async function deployLendingPoolAddressesProviderRegistry() {
  let LendingPoolAddressesProviderRegistry = await ethers.getContractFactory('LendingPoolAddressesProviderRegistry');
  let lendingPoolAddressesProviderRegistry = await LendingPoolAddressesProviderRegistry.deploy();
  return lendingPoolAddressesProviderRegistry;
}

export async function deployLendingPoolAddressesProvider(marketId) {
  let LendingPoolAddressesProvider = await ethers.getContractFactory('LendingPoolAddressesProvider');
  let lendingPoolAddressesProvider = await LendingPoolAddressesProvider.deploy(marketId);
  return lendingPoolAddressesProvider;
}

export async function deployReserveLogicLibrary() {
  let ReserveLogicLibrary = await ethers.getContractFactory('ReserveLogic');
  let reserveLogicLibrary = await ReserveLogicLibrary.deploy();
  return reserveLogicLibrary;
}

export async function deployGenericLogic() {
  let GenericLogic = await ethers.getContractFactory('GenericLogic' );
  let genericLogic = await GenericLogic.deploy();
  return genericLogic;
}

export async function deployValidationLogic(genericLogic) {
  let ValidationLogic = await ethers.getContractFactory('ValidationLogic' , {
    libraries: {
      GenericLogic: genericLogic.address
    }
  });
  let validationLogic = await ValidationLogic.deploy();
  return validationLogic;
}

export async function deployLendingPool(reserveLogic, validationLogic) {
  let LendingPool = await ethers.getContractFactory('LendingPool', {
    libraries: {
      ReserveLogic: reserveLogic,
      ValidationLogic: validationLogic
    }
  });
  let lendingPool = await LendingPool.deploy();
  return lendingPool;
}

export async function deployLendingPoolConfigurator() {
  let LendingPoolConfigurator = await ethers.getContractFactory('LendingPoolConfigurator');
  let lendingPoolConfigurator = await LendingPoolConfigurator.deploy();
  return lendingPoolConfigurator;
}

export async function deployStableAndVariableTokensHelper(lendingPoolProxyAddress, providerAddress) {
  let StableAndVariableTokensHelper = await ethers.getContractFactory('StableAndVariableTokensHelper');
  let stableAndVariableTokensHelper = await StableAndVariableTokensHelper.deploy(lendingPoolProxyAddress, providerAddress);
  return stableAndVariableTokensHelper;
}

export async function deployATokensAndRatesHelper(lendingPoolProxyAddress, providerAddress, configuratorAddress) {
  let ATokensAndRatesHelper = await ethers.getContractFactory('ATokensAndRatesHelper');
  let aTokensAndRatesHelper = await ATokensAndRatesHelper.deploy(lendingPoolProxyAddress, providerAddress, configuratorAddress);
  return aTokensAndRatesHelper;
}

export async function deployAToken() {
  let AToken = await ethers.getContractFactory('AToken');
  let aToken = await AToken.deploy();
  return aToken;
}

export async function deployVariableDebtToken() {
  let VariableDebtToken = await ethers.getContractFactory('VariableDebtToken');
  let variableDebtToken = await VariableDebtToken.deploy();
  return variableDebtToken;
}

export async function deployStableDebtToken() {
  let StableDebtToken = await ethers.getContractFactory('StableDebtToken');
  let stableDebtToken = await StableDebtToken.deploy();
  return stableDebtToken;
}

export async function deployOracle(tokens, aggregators, fallBackOracle, baseCurrency, baseCurrencyUnit) {
  let Oracle = await ethers.getContractFactory('Oracle');
  let oracle = await Oracle.deploy(tokens, aggregators, fallBackOracle, baseCurrency, baseCurrencyUnit); 
  return oracle;
}

export async function deployLendingRateOracle() {
  let LendingRateOracle = await ethers.getContractFactory('LendingRateOracle');
  let lendingRateOracle = await LendingRateOracle.deploy();
  return lendingRateOracle;
}

export async function deployProtocolDataProvider(provider) {
  let ProtocolDataProvider = await ethers.getContractFactory('ProtocolDataProvider');
  let protocolDataProvider = await ProtocolDataProvider.deploy(provider);
  return protocolDataProvider;
}

export async function deployWETHGateway(wethAddress, providerAddress) {
  let WETHGateway = await ethers.getContractFactory('WETHGateway');
  let wETHGateway = await WETHGateway.deploy(wethAddress, providerAddress);
  return wETHGateway;
}

export async function deployDefaultReserveInterestRateStrategy(providerAddress, optUtilRate, baseVarBorrowRate, vSlope1, vSlope2, sSlope1, sSlope2) {
  let DefaultReserveInterestRateStrategy = await ethers.getContractFactory('DefaultReserveInterestRateStrategy');
  let defaultReserveInterestRateStrategy = await DefaultReserveInterestRateStrategy.deploy(providerAddress, optUtilRate, baseVarBorrowRate, vSlope1, vSlope2, sSlope1, sSlope2);
  return defaultReserveInterestRateStrategy;
}

export async function deployLendingPoolCollateralManager() {
  let LendingPoolCollateralManager = await ethers.getContractFactory('LendingPoolCollateralManager');
  let lendingPoolCollateralManager = await LendingPoolCollateralManager.deploy();
  return lendingPoolCollateralManager;
}

export async function deployWalletBalanceProvider() {
  let WalletBalanceProvider = await ethers.getContractFactory('WalletBalanceProvider');
  let walletBalanceProvider = await WalletBalanceProvider.deploy();
  return walletBalanceProvider;
}

export async function deployUiPoolDataProvider(incentivesControllerAddress, oracleAddress) {
  let UiPoolDataProvider = await ethers.getContractFactory('UiPoolDataProvider');
  let uiPoolDataProvider = await UiPoolDataProvider.deploy(incentivesControllerAddress, oracleAddress);
  return uiPoolDataProvider;
}

export async function deployUiPoolDataProviderV2(incentivesControllerAddress, oracleAddress) {
  let UiPoolDataProviderV2 = await ethers.getContractFactory('UiPoolDataProviderV2');
  let uiPoolDataProviderV2 = await UiPoolDataProviderV2.deploy(incentivesControllerAddress, oracleAddress);
  return uiPoolDataProviderV2;
}

// ===================================== //
//          PERIPHERAL CONTRACTS         //
// ===================================== // 

export async function deployReserveFactorTreasury(addressesProviderAddress) {
  let ReserveFactorTreasury = await ethers.getContractFactory('Treasury');
  let reserveFactorTreasury = await ReserveFactorTreasury.deploy(addressesProviderAddress);
  return reserveFactorTreasury; 
}

export async function deployChainlinkSourcesRegistry() {
  let ChainlinkSourcesRegistry = await ethers.getContractFactory('ChainlinkSourcesRegistry');
  let chainlinkSourcesRegistry = await ChainlinkSourcesRegistry.deploy();
  return chainlinkSourcesRegistry; 
}

export async function deployRewardsVault(rewarder, rewardToken) {
  let RewardsVault = await ethers.getContractFactory('RewardsVault');
  let rewardsVault = await RewardsVault.deploy(rewarder, rewardToken);
  return rewardsVault;
}

export async function deployTestToken(name, symbol, decimals) {
  let TestToken = await ethers.getContractFactory('TestToken');
  let testToken = await TestToken.deploy(name, symbol, decimals);
  return testToken;
}

export async function deployTimelock(admin, delay) {
  let Timelock = await ethers.getContractFactory('Timelock');
  let timelock = await Timelock.deploy(admin, delay);
  return timelock;
}

export async function deployUiIncentivesDataProviderV2V3() {
  let UiIncentivesDataProviderV2V3 = await ethers.getContractFactory('UiIncentiveDataProviderV2V3');
  let uiIncentivesDataProviderV2V3 = await UiIncentivesDataProviderV2V3.deploy();
  return uiIncentivesDataProviderV2V3;
}

export async function deployUiIncentivesDataProvider() {
  let UiIncentivesDataProvider = await ethers.getContractFactory('UiIncentiveDataProvider');
  let uiIncentivesDataProvider = await UiIncentivesDataProvider.deploy();
  return uiIncentivesDataProvider;
}