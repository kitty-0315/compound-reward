// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "hardhat/console.sol";


contract CompoundingReward {
    address public currentDepositor;
    uint256 public lastDepositTime;
    uint256 public totalDeposited;
    uint256 public constant DEPOSIT_AMOUNT = 1 ether; // 1 AVAX
    uint256 public constant TIME_LIMIT = 6 hours;
    address public rewardWallet;
    uint256 public constant REWARD_PERCENTAGE = 5; // 5%

    constructor(address _rewardWallet) payable {
        require(msg.value == DEPOSIT_AMOUNT, "Initial deposit must be 1 AVAX");
        currentDepositor = msg.sender;
        lastDepositTime = block.timestamp;
        totalDeposited = msg.value;
        rewardWallet = _rewardWallet;
    }

    function deposit() external payable {
        require(msg.value == DEPOSIT_AMOUNT, "Deposit must be 1 AVAX");
        require(block.timestamp < lastDepositTime + TIME_LIMIT, "Claim period has ended, no more deposits allowed");

        // Transfer the reward percentage to the reward wallet
        uint256 rewardAmount = (msg.value * REWARD_PERCENTAGE) / 100;
        payable(rewardWallet).transfer(rewardAmount);

        // Update the total deposited amount
        totalDeposited += msg.value - rewardAmount;

        // Update the current depositor and last deposit time
        currentDepositor = msg.sender;
        lastDepositTime = block.timestamp;
    }

    function claim() external {
        require(msg.sender == currentDepositor, "Only the current depositor can claim");
        require(block.timestamp >= lastDepositTime + TIME_LIMIT, "Claim period has not ended yet");

        // Transfer the total deposited amount to the current depositor
        uint256 amountToClaim = totalDeposited;
        totalDeposited = 0;
        payable(currentDepositor).transfer(amountToClaim);

        // Reset the contract state
        currentDepositor = address(0);
        lastDepositTime = 0;
    }
}
