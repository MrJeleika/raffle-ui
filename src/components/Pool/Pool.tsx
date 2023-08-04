import { raffleAbi } from '@/abi/RaffleAbi';
import { useRaffleRead } from '@/hooks/useRaffleRead';
import { IPoolUser } from '@/types/types';
import { formatUSD } from '@/utils/intex';
import { useContractRead } from 'wagmi';

export const Pool = () => {
  const { data: poolUsers } = useRaffleRead({ name: 'getPoolUsers', args: [] });
  const { data: poolBalance } = useRaffleRead({
    name: 'totalPoolBalance',
    args: [],
  });

  console.log(poolUsers);

  return (
    <div className="bg-white">
      <h1 className="mb-5 text-4xl font-semibold">Raffle pool</h1>
      <h2 className="mb-5 text-xl">
        Total pool balance{' '}
        <span className="font-bold text-lime-700">
          {formatUSD(poolBalance)}
        </span>
      </h2>
      <div className="mb-5 w-full rounded border-2 border-background p-5">
        {poolUsers ? (
          poolUsers.map((poolUser: IPoolUser, key: number) => (
            <div className="mb-2 flex justify-between p-5 shadow-md" key={key}>
              <div className="mr-4">{poolUser.user}</div>
              <div className="mr-4">
                Amount: {formatUSD(poolUser.to - poolUser.from)}
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-2xl">Pool is empty</h1>
            <h2 className="mb-10">Be first to enter!</h2>
          </div>
        )}
      </div>
    </div>
  );
};
