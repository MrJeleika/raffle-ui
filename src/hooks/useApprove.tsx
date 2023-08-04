import { MATICabi } from '@/abi/MATICabi';
import { useEffect, useState } from 'react';
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi';

interface Props {
  token: `0x${string}`;
  amount: bigint | string;
}

export const useApprove = ({ token, amount }: Props) => {
  const { config } = usePrepareContractWrite({
    address: token,
    abi: MATICabi,
    functionName: 'approve',
    args: [
      '0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5',
      BigInt(Number(amount) * 10 ** 18),
    ],
    enabled: Boolean(token) && Boolean(amount),
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
  });
  return { data, isLoading, isSuccess, write };
};
