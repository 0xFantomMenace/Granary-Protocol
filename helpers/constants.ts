export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export async function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
export const volStrat = [
  ethers.utils.parseUnits('0.45', 27), // optimalUtilizationRate
  ethers.utils.parseUnits('0', 27), // baseVariableBorrowRate
  ethers.utils.parseUnits('0.07', 27), // variableRateSlope1
  ethers.utils.parseUnits('3', 27), // variableRateSlope2
  '0', // stableRateSlope1
  '0', // stableRateSlope2
];

export const sStrat = [
  ethers.utils.parseUnits('0.8', 27), // optimalUtilizationRate
  ethers.utils.parseUnits('0', 27), // baseVariableBorrowRate
  ethers.utils.parseUnits('0.04', 27), // variableRateSlope1
  ethers.utils.parseUnits('0.75', 27), // variableRateSlope2
  '0', // stableRateSlope1
  '0', // stableRateSlope2
];