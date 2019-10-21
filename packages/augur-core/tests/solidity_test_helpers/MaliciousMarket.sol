pragma solidity 0.5.10;

import 'ROOT/reporting/IMarket.sol';
import 'ROOT/reporting/IUniverse.sol';
import 'ROOT/trading/IShareToken.sol';
import 'ROOT/trading/ICash.sol';


contract MaliciousMarket {
    IMarket private victimMarket;
    uint256 public getNumTicks = 1;

    constructor(IMarket _market) public {
        victimMarket = _market;
    }

    function getNumberOfOutcomes() public view returns (uint256) {
        return victimMarket.getNumberOfOutcomes();
    }

    function getUniverse() public view returns (IUniverse) {
        return victimMarket.getUniverse();
    }
}
