import { MATICabi } from '@/abi/MATICabi';
import { raffleAbi } from '@/abi/RaffleAbi';
import { useEffect, useState } from 'react';
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi';

interface Props {
  name: string;
  args?: any;
}

export const useRaffleWrite = ({ name, args }: Props) => {
  const { config } = usePrepareContractWrite({
    address: '0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5',
    abi: raffleAbi,
    functionName: name,
    args: [...args],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
  });
  return { data, isLoading, isSuccess, write };
};
