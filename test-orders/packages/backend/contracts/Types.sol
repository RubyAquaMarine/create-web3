//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*
cannot hold state variables, fallback or payable functions also cannot be created inside
the library

only pure and view functions can be called from outside of the library

*/

library Types {

    struct TokenAmount {
        IERC20 token;
        uint112 amount;
    }

    //status of order. Only tracked on action from user/miners
    enum OrderStatus {
        UNDEFINED,
        PENDING,
        FILLED,
        CANCELLED,
        PENALIZED
    }

    struct Order {

        //trader that owns the order
        address trader;

        //the token we are taking as fee
        IERC20 feeToken;

        //eth price of fee token in 18-decimal units
        uint feeTokenETHPrice;

        //current price of ETH in USD units
        uint ethUSDPrice;

        //an estimate of gas to use to fill the order
        uint gasEstimate;

        //token being offered
        TokenAmount input;

        //token wanted
        TokenAmount output;
    }

    //============== CONFIG STATE =============/
    struct Config {
        //dev team address (120b)
        address devTeam;

        //bps fee expressed as a whole number
        uint128 minFee;

        //penalty a user faces for removing assets or 
        //allowances before a trade
        uint128 penaltyFee;

        //number of blocks to lock stake and order cancellations
        uint8 lockoutBlocks;
    }

    //============== ACCESS STATE =============/
    //storage structure of access controls
    struct AccessControl {
        bool reentrantFlag;
        mapping(bytes32 => mapping(address => bool)) roles;
    }

    //============== INITIALIZATION STATE =============/
    struct InitControls {
        bool initialized;
        bool initializing;
    }
}
