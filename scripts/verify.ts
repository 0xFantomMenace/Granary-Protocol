const hre = require('hardhat');
import { ethers } from 'hardhat';
import * as addresses from '../addresses.json';

async function main() {
  await hre.run('verify:verify', {
    address: "0x2dDD3BCA2Fa050532B8d7Fd41fB1449382187dAA",
    constructorArguments: [
     addresses.Lore.Peripheral.Multisig, '86400'
    ],
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});