// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./interfaces/IProxy.sol";

contract RedStoneAdaptor {  
    uint8 private constant DECIMALS = 8; 
    address public immutable proxy;
    address public immutable asset;

    constructor(address _proxy, address _asset) {
        proxy = _proxy;
        asset = _asset;
    }

    function latestAnswer() external view returns (int256 value) {
        int256 rawPrice = int256(IProxy(proxy).priceOf(asset));
        return rawPrice / 10 ** 10;
    }
   
    function decimals() external view returns (uint8) {
        return 8;
    }    

    function latestTimestamp() external view returns (uint256) {
        return block.timestamp;
    }
}