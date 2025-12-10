import { deployChainlinkSourcesRegistry } from '../../helpers/contracts-deployments';
import { delay } from '../../helpers/constants';
import {
  tokens,
  aggregators,
} from '../../markets/horizen.ts';



async function main() {
  console.log('>>>Starting<<<');
  
  const chainlinkSourcesRegistry = await deployChainlinkSourcesRegistry();
  console.log('  > ChainlinkSourcesRegistry.sol: ' +chainlinkSourcesRegistry.address);
  await delay(10000);
  await chainlinkSourcesRegistry.updateAggregators(tokens, aggregators);
  console.log('  > Aggregators successfully updated.');
  
  console.log('>>>Deployment Complete<<<');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});