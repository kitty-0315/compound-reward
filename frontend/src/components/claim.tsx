import * as React from 'react'
import { type BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'


import { claimAbi as abi } from '../config/abi'

export function Claim() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    writeContract({
      address: '0x4cf1fAFa2B4bd874C19FCC8E7Dd1D0E9B1EbFf79',
      abi,
      functionName: 'claim',
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  return (
    <form onSubmit={submit}>
      <button type="submit" disabled={isPending}>{isPending ? 'Confirming...' : 'Claim'}</button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  )
}