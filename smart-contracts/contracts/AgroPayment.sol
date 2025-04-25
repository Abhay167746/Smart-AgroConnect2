// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract AgroPayment {
    address public buyer;
    address public farmer;
    uint public amount;
    bool public qualityApproved;

    enum State { Pending, Approved, Rejected }
    State public currentState;

    constructor(address _farmer) payable {
        buyer = msg.sender;
        farmer = _farmer;
        amount = msg.value;
        currentState = State.Pending;
    }

    function approveQuality() public {
        require(currentState == State.Pending, "Already resolved");
        qualityApproved = true;
        currentState = State.Approved;
        payable(farmer).transfer(amount);
    }

    function rejectQuality() public {
        require(currentState == State.Pending, "Already resolved");
        currentState = State.Rejected;
        payable(buyer).transfer(amount);
    }

    function getState() public view returns (string memory) {
        if (currentState == State.Pending) return "Pending";
        if (currentState == State.Approved) return "Approved";
        return "Rejected";
    }
}
