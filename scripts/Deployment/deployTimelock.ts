import * as addresses from '../../addresses.json';
import { deployTimelock } from '../../helpers/contracts-deployments';

const DELAY = '86400';
const ADMIN = addresses.Mode.Peripheral.Multisig;



async function main() {
  console.log('>>>Starting...<<<');
 
  const timelock = await deployTimelock(ADMIN, DELAY);
  console.log('  > Timelock.sol: ' +timelock.address);

  console.log('>>>Deployment Complete<<<');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});