// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
/*
Uniswap Pairy , build an interface 

totalSupply
balanceOf
*/
interface IDEX {
    function allPairsLength() external view returns (uint256);
    function allPairs(uint256 pool) external view returns (address);
}

contract DexProp {
    IDEX internal resultManager;

    constructor(address _address) {
        resultManager = IDEX(_address);
    }

    function getPoolLength() public view returns (uint256) {
        uint256 id = resultManager.allPairsLength();
        return id;
    }

    function getPool(uint256 pool) public view returns (address) {
        address id = resultManager.allPairs(pool);
        return id;
    }
}
