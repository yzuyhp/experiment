// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

//This is the original contract
contract MoonToken is Initializable,ERC20Upgradeable,OwnableUpgradeable,UUPSUpgradeable {
    function initialize() public initializer {//Dont forget the initializers to call manually, there are no constructors
        __ERC20_init("MoonToken", "CHANDRA");
        _mint(msg.sender, 10000000 * 10 ** decimals());
        __Ownable_init();
    }

    function _authorizeUpgrade(address newImplementation) internal onlyOwner override
    {}
}

//Now we want to upgrade the contract

contract MoonTokenV2 is Initializable,ERC20Upgradeable,OwnableUpgradeable,UUPSUpgradeable{
    function initialize() public initializer {
        __ERC20_init("MoonToken2", "CHANDRA2");
    }

    function changeSym() public {
       assembly {
            sstore(4, "CHANDRA2")
        }
    }

    function version() pure external returns (string memory){
        return "Version2";
    }

    function _authorizeUpgrade(address newImplementation) internal onlyOwner override
    {}
}