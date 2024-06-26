import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";


const CompoundRewardModule = buildModule("CompoundingRewardModule", (m) => {
  const rewardWallet = "0x57E2E2E06Fb0dDc9B9C65309a8ed33F138328180"

  const reward = m.contract("CompoundingReward", [rewardWallet], {
    value: ethers.parseEther("1.0")
  });

  return { reward };
});

export default CompoundRewardModule;
