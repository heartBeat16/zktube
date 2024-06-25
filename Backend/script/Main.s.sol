// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {Main} from "src/Main.sol";

contract DeployMain is Script {
  function run() public {
    vm.startBroadcast();
    Main main = new Main();
    console.log("Main Contract deployed at", address(main));
    vm.stopBroadcast();
  }
}
