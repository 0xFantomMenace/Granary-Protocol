import { deployUiIncentivesDataProvider } from '../../helpers/contracts-deployments';



async function main() {  
  console.log('>>>Starting...<<<');

  const uiIncentivesDataProvider = await deployUiIncentivesDataProvider();
  console.log('  > UiIncentivesDataProvider.sol: ' +uiIncentivesDataProvider.address);

  console.log('>>>Deployment Complete<<<');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});