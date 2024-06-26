export const depositeAbi = [
  {
    name: 'deposit',
    type: 'function',
    stateMutability: 'payable',
    outputs: [],
  },
] as const

export const claimAbi = [
  {
    name: 'claim',
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
  },
] as const