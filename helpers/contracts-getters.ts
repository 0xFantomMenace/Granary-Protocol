import { ethers } from 'hardhat';
import { BigNumber, BigNumberish } from 'ethers';


// ===================================== //
//              PROTOCOL CORE            //
// ===================================== // 

export async function getRewarder(rewarder_Address) {
  let Rewarder = await ethers.getContractFactory('Rewarder');
  let rewarder = await Rewarder.attach(rewarder_Address);
  return rewarder;
}

export async function getRegistry(registry_Address) {
  let Registry = await ethers.getContractFactory('LendingPoolAddressesProviderRegistry');
  let registry = await Registry.attach(registry_Address);
  return registry;
}

export async function getProvider(provider_Address) {
  let Provider = await ethers.getContractFactory('LendingPoolAddressesProvider');
  let provider = await Provider.attach(provider_Address);
  return provider;
}

export async function getReserveLogic(reserveLogic_Address) {
  let ReserveLogic = await ethers.getContractFactory('ReserveLogic');
  let reserveLogic = await ReserveLogic.attach(reserveLogic_Address);
  return reserveLogic;
}

export async function getGenericLogic(genericLogic_Address) {
  let GenericLogic = await ethers.getContractFactory('GenericLogic');
  let genericLogic = await GenericLogic.attach(genericLogic_Address);
  return genericLogic;
}

export async function getValidationLogic(genericLogic_Address, validationLogic_Address) {
  let ValidationLogic = await ethers.getContractFactory('ValidationLogic' , {
    libraries: {
      GenericLogic: genericLogic_Address
    }
  });
  let validationLogic = await ValidationLogic.attach(validationLogic_Address);
  return validationLogic;
}

export async function getLendingPool(reserveLogic_Address, validationLogic_Address, lendingPool_Address) {
  let LendingPool = await ethers.getContractFactory('LendingPool', {
    libraries: {
      ReserveLogic: reserveLogic_Address,
      ValidationLogic: validationLogic_Address
    }
  });
  let lendingPool = await LendingPool.attach(lendingPool_Address);
  return lendingPool;
}

export async function getLendingPoolProxy(reserveLogic_Address, validationLogic_Address, lendingPoolProxy_Address) {
  let LendingPoolProxy = await ethers.getContractFactory('LendingPool', {
    libraries: {
      ReserveLogic: reserveLogic_Address,
      ValidationLogic: validationLogic_Address
    }
  });
  let lendingPoolProxy = await LendingPoolProxy.attach(lendingPoolProxy_Address);
  return lendingPoolProxy;
}

export async function getConfigurator(configurator_Address) {
  let Configurator = await ethers.getContractFactory('LendingPoolConfigurator');
  let configurator = await Configurator.attach(configurator_Address);
  return configurator;
}

export async function getConfiguratorProxy(configuratorProxy_Address) {
  let ConfiguratorProxy = await ethers.getContractFactory('LendingPoolConfigurator');
  let configuratorProxy = await ConfiguratorProxy.attach(configuratorProxy_Address);
  return configuratorProxy;
}

export async function getStableAndVariableTokensHelper(StableAndVariableTokensHelper_Address) {
  let StableAndVariableTokensHelper = await ethers.getContractFactory('StableAndVariableTokensHelper');
  let stableAndVariableTokensHelper = await StableAndVariableTokensHelper.attach(StableAndVariableTokensHelper_Address);
  return stableAndVariableTokensHelper;
}

export async function getATokensAndRatesHelper(ATokensAndRatesHelper_Address) {
  let ATokensAndRatesHelper = await ethers.getContractFactory('ATokensAndRatesHelper');
  let aTokensAndRatesHelper = await ATokensAndRatesHelper.attach(ATokensAndRatesHelper_Address);
  return aTokensAndRatesHelper;
}

export async function getAToken(AToken_Address) {
  let AToken = await ethers.getContractFactory('AToken');
  let aToken = await AToken.attach(AToken_Address);
  return aToken;
}

export async function getVariableDebtToken(VariableDebtToken_Address) {
  let VariableDebtToken = await ethers.getContractFactory('VariableDebtToken');
  let variableDebtToken = await VariableDebtToken.attach(VariableDebtToken_Address);
  return variableDebtToken;
}

export async function getStableDebtToken(StableDebtToken_Address) {
  let StableDebtToken = await ethers.getContractFactory('StableDebtToken');
  let stableDebtToken = await StableDebtToken.attach(StableDebtToken_Address);
  return stableDebtToken;
}

export async function getOracle(Oracle_Address) {
  let Oracle = await ethers.getContractFactory('Oracle');
  let oracle = await Oracle.attach(Oracle_Address);
  return oracle;
}

export async function getLendingRateOracle(lendingRateOracle_Address) {
  let LendingRateOracle = await ethers.getContractFactory('LendingRateOracle');
  let lendingRateOracle = await LendingRateOracle.attach(lendingRateOracle_Address);
  return lendingRateOracle;
}

export async function getProtocolDataProvider(ProtocolDataProvider_Address) {
  let ProtocolDataProvider = await ethers.getContractFactory('ProtocolDataProvider');
  let protocolDataProvider = await ProtocolDataProvider.attach(ProtocolDataProvider_Address);
  return protocolDataProvider;
}

export async function getWETHGateway(WETHGateway_Address) {
  let Gateway = await ethers.getContractFactory('WETHGateway');
  let gateway = await Gateway.attach(WETHGateway_Address);
  return gateway;
}

export async function getDefaultReserveInterestRateStrategy(Strategy_Address) {
  let DefaultReserveInterestRateStrategy = await ethers.getContractFactory('DefaultReserveInterestRateStrategy');
  let defaultReserveInterestRateStrategy = await DefaultReserveInterestRateStrategy.attach(Strategy_Address);
  return defaultReserveInterestRateStrategy;
}

export async function getCollateralManager(collateralManager_Address) {
  let CollateralManager = await ethers.getContractFactory('LendingPoolCollateralManager');
  let collateralManager = await CollateralManager.attach(collateralManager_Address);
  return collateralManager;
}

export async function getWalletBalanceProvider(walletBalanceProvider_Address) {
  let WalletBalanceProvider = await ethers.getContractFactory('WalletBalanceProvider');
  let walletBalanceProvider = await WalletBalanceProvider.attach(walletBalanceProvider_Address);
  return walletBalanceProvider;
}

export async function getUiPoolDataProvider(uiPoolDataProvider_Address) {
  let UiPoolDataProvider = await ethers.getContractFactory('UiPoolDataProvider');
  let uiPoolDataProvider = await UiPoolDataProvider.attach(uiPoolDataProvider_Address);
  return uiPoolDataProvider;
}

export async function getUiPoolDataProviderV2(uiPoolDataProviderV2_Address) {
  let UiPoolDataProviderV2 = await ethers.getContractFactory('UiPoolDataProviderV2');
  let uiPoolDataProviderV2 = await UiPoolDataProviderV2.attach(uiPoolDataProviderV2_Address);
  return uiPoolDataProviderV2;
}



// ===================================== //
//          PERIPHERAL CONTRACTS         //
// ===================================== // 

export async function getTreasury(treasury_Address) {
  let Treasury = await ethers.getContractFactory('Treasury');
  let treasury = await Treasury.attach(treasury_Address);
  return treasury;
}

export async function getERC20(ERC20_Address) {
  let ERC20 = await ethers.getContractFactory('ERC20');
  let erc20 = await ERC20.attach(ERC20_Address);
  return erc20;
}

export async function getChainlinkSourcesRegistry(ChainlinkSourcesRegistry_Address) {
  let ChainlinkSourcesRegistry = await ethers.getContractFactory('ChainlinkSourcesRegistry');
  let chainlinkSourcesRegistry = await ChainlinkSourcesRegistry.attach(ChainlinkSourcesRegistry_Address);
  return chainlinkSourcesRegistry;
}

export async function getTestToken(ERC20_Address) {
  let TestToken = await ethers.getContractFactory('TestToken');
  let testToken = await TestToken.attach(ERC20_Address);
  return testToken;
}

export async function getTimelock(Timelock_Address) {
  let Timelock = await ethers.getContractFactory('Timelock');
  let timelock = await Timelock.attach(Timelock_Address);
  return timelock;
}