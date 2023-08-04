import { useAccount, useConnect, useDisconnect, useWalletClient } from 'wagmi';

export const Navbar = () => {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { address, connector, isConnected } = useAccount();
  return (
    <div className="flex items-center justify-end px-20 py-5 font-bold text-black">
      <h1 className="mr-5">{address}</h1>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => (isConnected ? disconnect() : connect({ connector }))}
          className=" rounded border-2 border-black bg-yellow px-4 py-2 text-black"
        >
          {isConnected ? 'Disconnect' : 'Connect wallet'}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
    </div>
  );
};
