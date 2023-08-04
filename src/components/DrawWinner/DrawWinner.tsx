import { raffleAbi } from '@/abi/RaffleAbi';
import { useRaffleRead } from '@/hooks/useRaffleRead';
import { useRaffleWrite } from '@/hooks/useRaffleWrite';
import { IPoolUser } from '@/types/types';
import { useEffect, useState } from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';

export const DrawWinner = () => {
  const [winnerIndex, setWinnerIndex] = useState<null | number>(null);
  const [winner, setWinner] = useState<IPoolUser>();

  const { write, isSuccess, isLoading } = useRaffleWrite({
    name: 'selectRandomNum',
    args: [],
  });
  const { data: poolUsers } = useRaffleRead({ name: 'getPoolUsers', args: [] });

  const {
    data: randomNum,
    isSuccess: isSuccessRandomNum,
    isLoading: isLoadingRandomNum,
  } = useContractRead({
    address: '0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5',
    abi: raffleAbi,
    functionName: 'randomNum',
    args: [],
    watch: true,
  });

  const { data: playedTokens } = useRaffleRead({
    name: 'getPlayedTokens',
    args: [],
  });

  const { config } = usePrepareContractWrite({
    address: '0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5',
    abi: raffleAbi,
    functionName: 'selectWinner',
    args: [winnerIndex, randomNum],
    enabled:
      poolUsers &&
      poolUsers.length > 0 &&
      randomNum > 0 &&
      winnerIndex !== null,
  });

  const { write: writeWinner, isSuccess: a } = useContractWrite({
    ...config,
    onSuccess: () => {
      setWinnerIndex(null);
    },
  });
  console.log(winnerIndex);

  const selectWinner = () => {
    for (let i = 0; i < poolUsers.length; i++) {
      if (poolUsers[i].from < randomNum && poolUsers[i].to >= randomNum) {
        return i;
      }
    }
    return 0;
  };

  useEffect(() => {
    if (randomNum) {
      console.log('winner selected');
      const index = selectWinner();
      console.log(index);
      console.log(randomNum);

      setWinnerIndex(index);
      setWinner(poolUsers[index]);
    }
  }, [randomNum]);

  return (
    <div>
      {winner && <h1>Congratz {winner.user}</h1>}
      <button
        onClick={() => write?.()}
        className="mt-5 w-full rounded border-2 border-background py-3 text-lg font-bold uppercase"
      >
        Select winner
      </button>
      <button
        onClick={() => writeWinner?.()}
        disabled={!writeWinner}
        className="mt-5 w-full rounded border-2 border-background py-3 text-lg font-bold uppercase"
      >
        Send money
      </button>
    </div>
  );
};
