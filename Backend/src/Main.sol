// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/console.sol";
import "sismo-connect-solidity/SismoConnectLib.sol";
import "./oracle.sol";

contract Main is SismoConnect{

OptimisticOracleV3Interface oov3 =OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);
bytes32 public assertionId;


bytes16 private constant s_appId=0xc817321dbc144e7c79fbf1b00bea2147;
bytes16 private constant GITHUB_GROUP_ID =0x97bfe9ec07b8bfbe87079d6ce117ec7e;
bool private s_isImpersonationMode=false;
mapping(address=>mapping(uint256=>bool)) public s_vaultIdToAllowed;
mapping(bytes=>bool) public s_linksToAllowed;

constructor() SismoConnect(buildConfig(s_appId, s_isImpersonationMode)){
// Do someting.
}
function addVideo(string memory _check)public{
bytes memory _assertionClaim=bytes(_check);
assertTruth(_assertionClaim);
}
function getConfirmation(string memory _link)public{
settleAndGetAssertionResult(bytes(_link));
}

function allowedToWatch(bytes memory response)public returns (bool){
  verifyCred(response);
  return true; // Possible only if verifycred works.else revert.
}

function verifyCred(bytes memory response) private{
   SismoConnectVerifiedResult memory result= verifyResult(response);
    uint256 vaultId = SismoConnectHelper.getUserId(result, AuthType.VAULT);
s_vaultIdToAllowed[msg.sender][vaultId] =true;
}

function verifyResult(bytes memory response) private view returns(SismoConnectVerifiedResult memory result){
result = verify({
      responseBytes: response,
      auth:buildAuth({authType: AuthType.VAULT}),
      claim:buildClaim({groupId: GITHUB_GROUP_ID}),
      signature:  buildSignature({message: abi.encode(msg.sender)})
    });
}


///////////////////////////// ORACLE ///////////////////////////////

    function assertTruth(bytes memory _assertedClaim) private {
        assertionId = oov3.assertTruthWithDefaults(_assertedClaim, address(this));
    }
    function settleAndGetAssertionResult(bytes memory _link) public returns (bool) {
        bool check=oov3.settleAndGetAssertionResult(assertionId);
        s_linksToAllowed[_link]=check;
        return check;
    }
    function getAssertionResult() public view returns (bool) {
        return oov3.getAssertionResult(assertionId);
    }
    function getAssertion()
        public
        view
        returns (OptimisticOracleV3Interface.Assertion memory)
    {
        return oov3.getAssertion(assertionId);
    }
}