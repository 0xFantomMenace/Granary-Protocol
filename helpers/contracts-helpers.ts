import { ethers } from "hardhat";

export async function registerAddressesProvider(registry, providerAddress, providerId) {
  let tx = await registry.registerAddressesProvider(providerAddress, providerId);
  let receipt = await tx.wait();
  return receipt;
}

export async function setPoolAdmin(provider, adminAddress) {
  let tx = await provider.setPoolAdmin(adminAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function setEmergencyAdmin(provider, adminAddress) {
  let tx = await provider.setEmergencyAdmin(adminAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function fetchPoolAdmin(provider) {
  let poolAdmin = await provider.getPoolAdmin();
  return poolAdmin;
}

export async function fetchEmergencyAdmin(provider) {
  let emergencyAdmin = await provider.getEmergencyAdmin();
  return emergencyAdmin;
}

export async function setLendingPoolImpl(provider, poolAddress) {
  let tx = await provider.setLendingPoolImpl(poolAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function fetchLendingPool(provider) {
  let lendingPool = await provider.getLendingPool();
  return lendingPool;
}

export async function setLendingPoolConfiguratorImpl(provider, configuratorAddress) {
  let tx = await provider.setLendingPoolConfiguratorImpl(configuratorAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function fetchLendingPoolConfigurator(provider) {
  let lendingPoolConfigurator = await provider.getLendingPoolConfigurator();
  return lendingPoolConfigurator;
}

export async function setPoolPause(configuratorProxy, val) {
  let tx = await configuratorProxy.setPoolPause(val);
  let receipt = await tx.wait();
  return receipt;
}

export async function setPriceOracle(provider, oracleAddress) {
  let tx = await provider.setPriceOracle(oracleAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function setLendingRateOracle(provider, oracleAddress) {
  let tx = await provider.setLendingRateOracle(oracleAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function transferOwnership(contractObject, targetAddress) {
  let tx = await contractObject.transferOwnership(targetAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function setOracleBorrowRates(helper, assets, rates, oracleAddress) {
  let tx = await helper.setOracleBorrowRates(assets, rates, oracleAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function setOracleOwnership(helper, oracleAddress, adminAddress) {
  let tx = await helper.setOracleOwnership(oracleAddress, adminAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function initializeReservesInBatch(configuratorProxy, initInputParams) {
  let tx = await configuratorProxy.batchInitReserve(initInputParams);
  let receipt = await tx.wait();
  return receipt;
}

export async function configureReserve(aHelper, inputConfigParams) {
  let tx = await aHelper.configureReserves(inputConfigParams);
  let receipt = await tx.wait();
  return receipt;
}

export async function setLendingPoolCollateralManagerImpl(provider, managerAddress) {
  let tx = await provider.setLendingPoolCollateralManager(managerAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function fetchCollateralManager(provider) {
  let collateralManager = await provider.getLendingPoolCollateralManager();
  return collateralManager;
}

export async function setAddress(provider, id, newAddress) {
  let tx = await provider.setAddress(id, newAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function authorizeWETHGateway(gateway, lendingPoolProxyAddress) {
  let tx = await gateway.authorizeLendingPool(lendingPoolProxyAddress);
  let receipt = await tx.wait();
  return receipt;
}

export async function fetchReserveTokensAddresses(dataProvider, reserve_Address) {
  let reserveTokensAddresses = await dataProvider.getReserveTokensAddresses(reserve_Address);
  return reserveTokensAddresses;
}

export async function approveIncentivesController(rewardsVault) {
  let tx = await rewardsVault.approveIncentivesController("115792089237316195423570985008687907853269984665640564039457584007913129639935");
  let receipt = await tx.wait();
  return receipt;
}
