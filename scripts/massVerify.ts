const hre = require('hardhat');
import { Etherscan } from "@nomicfoundation/hardhat-verify/etherscan";
import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';
import fs from 'fs';
import {
  ZERO_ADDRESS,
  delay,
  volStrat,
  sStrat,
} from '../helpers/constants';
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
  gasTokenFeed,
  baseCurrencyUnit,
  atokens,
  stokens,
  vtokens,
} from '../markets/lore';

const instance = new Etherscan(
  process.env.SCROLL_ETHERSCAN_API_KEY || "", // Etherscan API key
  "https://api.scrollscan.com/api", // Etherscan API URL
  "https://scrollscan.com/" // Etherscan browser URL
);

const DELAY = 5000;
const deployment = addresses.Lore;


async function main() {
  const stableStrategy = deployment.Strategies.StableStrategy;
  if (!(await instance.isVerified(stableStrategy))) {
    await verify(
      stableStrategy,
      [
        deployment.Protocol.Provider,
        sStrat[0],
        sStrat[1],
        sStrat[2],
        sStrat[3],
        sStrat[4],
        sStrat[5]
      ]
    );
  }

  const volatileStrategy = deployment.Strategies.VolatileStrategy;
  if (!(await instance.isVerified(volatileStrategy))) {
    await verify(
      volatileStrategy,
      [
      deployment.Protocol.Provider,
      volStrat[0],
      volStrat[1],
      volStrat[2],
      volStrat[3],
      volStrat[4],
      volStrat[5]
      ]
    );
  }

  const registry = deployment.Protocol.Registry;
  if (!(await instance.isVerified(registry))) {
    await verify(registry,[]);
  }

  const provider = deployment.Protocol.Provider;
  if (!(await instance.isVerified(provider))) {
    await verify(provider,[marketId]);
  }

  const reserveLogic = deployment.Protocol.ReserveLogic;
  if (!(await instance.isVerified(reserveLogic))) {
    await verify(reserveLogic,[]);
  }

  const genericLogic = deployment.Protocol.GenericLogic;
  if (!(await instance.isVerified(genericLogic))) {
    await verify(genericLogic,[]);
  }

  const validationLogic = deployment.Protocol.ValidationLogic;
  if (!(await instance.isVerified(validationLogic))) {
    await verify(validationLogic,[]);
  }

  const lendingPool = deployment.Protocol.LendingPool;
  if (!(await instance.isVerified(lendingPool))) {
    await verify(lendingPool,[]);
  }

  const lendingPoolProxy = deployment.Protocol.LendingPoolProxy;
  if (!(await instance.isVerified(lendingPoolProxy))) {
    await verify(lendingPoolProxy,[deployment.Protocol.Provider]);
  }

  const configurator = deployment.Protocol.Configurator;
  if (!(await instance.isVerified(configurator))) {
    await verify(configurator,[]);
  }

  const configuratorProxy = deployment.Protocol.ConfiguratorProxy;
  if (!(await instance.isVerified(configuratorProxy))) {
    await verify(configuratorProxy,[deployment.Protocol.Provider]);
  }

  const aToken = deployment.Protocol.AToken;
  if (!(await instance.isVerified(aToken))) {
    await verify(aToken,[]);
  }

  const variableDebtToken = deployment.Protocol.VariableDebtToken;
  if (!(await instance.isVerified(variableDebtToken))) {
    await verify(variableDebtToken,[]);
  }

  const stableDebtToken = deployment.Protocol.StableDebtToken;
  if (!(await instance.isVerified(stableDebtToken))) {
    await verify(stableDebtToken,[]);
  }

  const oracle = deployment.Protocol.Oracle;
  if (!(await instance.isVerified(oracle))) {
    await verify(
      oracle,
      [
        tokens,
        aggregators,
        fallBackOracle, 
        ZERO_ADDRESS,
        baseCurrencyUnit
      ]
    );
  }

  const lendingRateOracle = deployment.Protocol.LendingRateOracle;
  if (!(await instance.isVerified(lendingRateOracle))) {
    await verify(lendingRateOracle,[]);
  }

  const gateway = deployment.Protocol.WETHGateway;
  // const provider = deployment.Protocol.Provider;
  if (!(await instance.isVerified(gateway))) {
    await verify(gateway,[gasToken, provider]);
  }

  const collateralManager = deployment.Protocol.CollateralManager;
  if (!(await instance.isVerified(collateralManager))) {
    await verify(collateralManager,[]);
  }

  const rewarder = deployment.Peripheral.Rewards.Rewarder;
  if (!(await instance.isVerified(rewarder))) {
    await verify(rewarder,[]);
  }

  const protocolDataProvider = deployment.Peripheral.ProtocolDataProvider;
  if (!(await instance.isVerified(protocolDataProvider))) {
    await verify(protocolDataProvider,[deployment.Protocol.Provider]);
  }

  const walletBalanceProvider = deployment.Peripheral.WalletBalanceProvider;
  if (!(await instance.isVerified(walletBalanceProvider))) {
    await verify(walletBalanceProvider,[]);
  }

  const uiPoolDataProviderV2 = deployment.Peripheral.UiPoolDataProviderV2;
  if (!(await instance.isVerified(uiPoolDataProviderV2))) {
    await verify(uiPoolDataProviderV2,[gasTokenFeed, gasTokenFeed]);
  }

  const chainlinkSourcesRegistry = deployment.Peripheral.ChainlinkSourcesRegistry;
  if (!(await instance.isVerified(chainlinkSourcesRegistry))) {
    await verify(chainlinkSourcesRegistry,[]);
  }

  const treasury = deployment.Peripheral.Treasury;
  if (!(await instance.isVerified(treasury))) {
    await verify(treasury,[deployment.Protocol.Provider]);
  }

  for (let i = 0; i < atokens.length; i++) {
    const aToken = atokens[i];
    if (!(await instance.isVerified(aToken))) {
      await verify(aToken,[deployment.Protocol.ConfiguratorProxy]);
    }
  }

  for (let j = 0; j < stokens.length; j++) {
    const sToken = stokens[j];
    if (!(await instance.isVerified(sToken))) {
      await verify(sToken,[deployment.Protocol.ConfiguratorProxy]);
    }
  }

  for (let k = 0; k < vtokens.length; k++) {
    const vToken = vtokens[k];
    if (!(await instance.isVerified(vToken))) {
      await verify(vToken,[deployment.Protocol.ConfiguratorProxy]);
    }
  }
}


async function verify(contractAddress, args) {
  await delay(DELAY);
  
  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch(error) {
    await delay(1000);
    await hre.run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  }

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});