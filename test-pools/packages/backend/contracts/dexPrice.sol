// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/*

Razor Network contract , build an interface 


*/
interface IResultManager {
    function getCollectionID(bytes32 _name) external view returns (uint16);

    function getResult(bytes32 _name) external view returns (uint256, int8);

    function getResultFromID(uint16 _id) external view returns (uint256, int8);

    function getActiveCollections() external view returns (uint16[] memory);

    function getCollectionStatus(uint16 _id) external view returns (bool);
}

contract DataFeed {
    IResultManager internal resultManager;

    constructor() {
        resultManager = IResultManager(0x455b3ef0167ecD30Ed7E431eA7b9162b16FE9566);// whispering testnet 
    }


    ///@dev using the hash of collection name, clients can query collection id with respect to its hash,
    ///check https://razorscan.io/governance/datafeeds for a full list of active collection names
    ///@param _name bytes32 hash of the collection name
    ///@return collection ID
    function getCollectionID(bytes32 _name)
    public
    view
    returns (uint16) {
       (uint16 id) = resultManager.getCollectionID(_name);
       return id;
    }

    /// @notice fetch collection result by name
    /// @param _name bytes32 hash of the collection name
    /// @return result of the collection and its power
    /// @return power
    function getResult(bytes32 _name)
        public
        view
        returns (uint256, int8)
    {
        (uint256 result, int8 power) = resultManager.getResult(_name);
        return (result, power);
    }


    ///@return ids of active collections in the oracle
    function getActiveCollections()
    public
    view
    returns (uint16[] memory) {
        (uint16[] memory activeCollectionIds) = resultManager.getActiveCollections();
        return activeCollectionIds;
    }

    /// @notice fetch collection result by Id
    /// @param _id collection ID
    /// @return result of the collection and its power
    /// @return power
    function getResultFromID(uint16 _id)
    public
    view
    returns (uint256, int8) {
        (uint256 result, int8 power) = resultManager.getResultFromID(_id);
        return (result, power);
    }


     /// @notice fetch collection status using id
     /// @param _id collection ID
     /// @return status of the collection
    function getCollectionStatus(uint16 _id) public view returns (bool) {
        return resultManager.getCollectionStatus(_id);
    }
}

