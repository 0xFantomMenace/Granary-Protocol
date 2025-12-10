// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {IERC20} from '../dependencies/openzeppelin/contracts/IERC20.sol';
import {Ownable} from '../dependencies/openzeppelin/contracts/Ownable.sol';
import {Errors} from '../protocol/libraries/helpers/Errors.sol';

contract RewardsVault is Ownable {
  address public INCENTIVES_CONTROLLER;
  address public REWARD_TOKEN;

  constructor (
    address incentivesController,
    address rewardToken
  ) public {
    INCENTIVES_CONTROLLER = incentivesController;
    REWARD_TOKEN = rewardToken;
  }

  function approveIncentivesController(uint256 value) external onlyOwner {
    IERC20(REWARD_TOKEN).approve(INCENTIVES_CONTROLLER, value);
  }

  function emergencyEtherTransfer(address to, uint256 amount) external onlyOwner {
    (bool success, ) = to.call{value: amount}(new bytes(0));
    require(success, 'ETH_TRANSFER_FAILED');
  }

  function emergencyTokenTransfer(
    address token,
    address to,
    uint256 amount
  ) external onlyOwner {
    IERC20(token).transfer(to, amount);
  }
}