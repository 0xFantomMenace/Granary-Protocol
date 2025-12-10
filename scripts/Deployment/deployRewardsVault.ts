import * as addresses from '../../addresses.json';
import { deployRewardsVault } from '../../helpers/contracts-deployments';
import { approveIncentivesController } from '../../helpers/contracts-helpers';
import { delay } from '../../helpers/constants';

async function main() {
  console.log('>>>Starting...<<<');
 
  // address incentivesController,
  // address rewardToken
  const rewardsVault = await deployRewardsVault(
    "0x3E45df33Adf1b81E7B45cA468E8e41496a66c837",
    "0xf270bFe3F97655Fff1D89aFf50a8E1dc381941b5"
  );

  console.log('  > RewardsVault.sol: ' +rewardsVault.address);
  await delay(25000);

  await approveIncentivesController(user, rewardsVault);
  console.log('  > Rewards Vault Authorized.');

  console.log('>>>Deployment Complete<<<');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});