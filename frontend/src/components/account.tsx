import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { Deposit } from './deposit'
import { Claim } from './claim'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <div className=' flex flex-col gap-5 my-5'>
        <Deposit />
        <Claim />
      </div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}