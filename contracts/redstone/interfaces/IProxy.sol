// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IProxy {
    function priceOf(address asset) external view returns (uint256);
    function priceOfETH() external view returns (uint256);
}
