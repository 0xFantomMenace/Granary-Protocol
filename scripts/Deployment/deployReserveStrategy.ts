import { ethers } from 'hardhat';
import * as addresses from '../../addresses.json';
import { deployDefaultReserveInterestRateStrategy } from '../../helpers/contracts-deployments';

const customStrat = [
  ethers.utils.parseUnits('0.70', 27), // optimalUtilizationRate
  ethers.utils.parseUnits('0', 27), // baseVariableBorrowRate
  ethers.utils.parseUnits('0.048', 27), // variableRateSlope1
  ethers.utils.parseUnits('1', 27), // variableRateSlope2
  '0', // stableRateSlope1
  '0' // stableRateSlope2
];



async function main() {
  console.log('>>>Starting...<<<');
 
  const customStrategy = await deployDefaultReserveInterestRateStrategy(
    addresses.Protocol.Provider,
    customStrat[0],
    customStrat[1],
    customStrat[2],
    customStrat[3],
    customStrat[4],
    customStrat[5]
  );
  console.log('  > DefaultReserveInterestRateStrategy.sol: ' +customStrategy.address);

  console.log('>>>Deployment Complete<<<');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});