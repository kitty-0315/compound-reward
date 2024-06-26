import { http, createConfig } from 'wagmi'
import { fantomTestnet } from 'wagmi/chains'
// import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

// const projectId = "8330413b91b00028e086053f73464557"

export const config = createConfig({
  chains: [fantomTestnet, ],
  // connectors: [
  //   injected(),
  //   walletConnect({ projectId }),
  //   metaMask(),
  //   safe(),
  // ],
  transports: {
    [fantomTestnet.id]: http(),
  },
})