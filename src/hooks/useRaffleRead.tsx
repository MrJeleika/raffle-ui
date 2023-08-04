import { raffleAbi } from '@/abi/RaffleAbi';
import { erc20ABI, useContractRead } from 'wagmi';

interface Props {
  name: string;
  args?: any;
}

export const useRaffleRead = ({ name, args }: Props) => {
  const { data, isSuccess, isLoading } = useContractRead({
    address: '0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5',
    abi: raffleAbi,
    functionName: name,
    args: [...args],
    watch: true,
  });

  return { data, isLoading, isSuccess };
};
