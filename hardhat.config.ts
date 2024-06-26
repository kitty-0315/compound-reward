import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PRIVATE_KEY = vars.get("PRIVATE_KEY")

console.log(PRIVATE_KEY)

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    avax: {
      url: "https://api.avax-test.network/ext/C/rpc",
      gasPrice: 2250000000,
      chainId: 43113,
      accounts: [PRIVATE_KEY]
    },
    fantom: {
      url: "https://rpc.testnet.fantom.network",
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
