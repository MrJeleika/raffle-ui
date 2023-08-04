import { Deposit } from '@/components/Deposit/Deposit';
import { DrawWinner } from '@/components/DrawWinner/DrawWinner';
import { Navbar } from '@/components/Nav/Navbar';
import { Pool } from '@/components/Pool/Pool';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address, connector, isConnected } = useAccount();
  return (
    <>
      <Navbar />
      <div className="container relative mx-auto max-w-6xl  p-10 font-semibold">
        {isConnected && (
          <div>
            <Pool />
            <Deposit />
            <DrawWinner />
          </div>
        )}
      </div>
    </>
  );
}
