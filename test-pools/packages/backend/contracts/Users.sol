pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Users {

    /*
    mapping examples 
    */
    mapping (address => mapping (address => uint256)) approvals;
    /*
    mapping examples 
    */
    //create a mapping
    mapping(string => mapping(address => uint)) public metadataUri;
    //set a mapping
    //metadataUri[_stringURI][_address] = _uint;
     /*
    mapping examples 
    
    this address has price_bid[] and amount[] 
    */
    mapping (address => mapping (uint256 => uint256)) private executionEntries;

    string private greeting;

    constructor(string memory _greeting) {
        console.log("Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}