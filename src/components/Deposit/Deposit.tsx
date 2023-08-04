import { getContract } from 'viem';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWalletClient,
  erc20ABI,
} from 'wagmi';
import { useState } from 'react';
import {
  prepareWriteContract,
  writeContract,
  getWalletClient,
} from '@wagmi/core';

import { useApprove } from '@/hooks/useApprove';
import { raffleAbi } from '@/abi/RaffleAbi';
import { MATICabi } from '@/abi/MATICabi';
import { TokenButton } from '../tokenButton/tokenButton';
import { formatERC20 } from '@/utils/intex';

export const Deposit = () => {
  const { address } = useAccount();
  const [token, setToken] = useState<keyof typeof tokens>(
    '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  );
  const [amount, setAmount] = useState('0');

  const tokens = {
    '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0': 'MATIC',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 'WETH',
  };

  // ! ЕБЛАН НЕ РАБОТАЕТ С ЮСДТ СУКА ИДИОТ

  const { data: balance } = useContractRead({
    address: token,
    abi: MATICabi,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
    enabled: Boolean(address),
  });

  const {
    write: approve,
    isSuccess: isApproveSuccess,
    isLoading: isApproveLoading,
  } = useApprove({
    token,
    amount,
  });

  const { config } = usePrepareContractWrite({
    address: '0x38628490c3043E5D0bbB26d5a0a62fC77342e9d5',
    abi: raffleAbi,
    functionName: 'deposit',
    args: [BigInt(Number(amount) * 10 ** 18), token],
    enabled: Boolean(address) && Boolean(balance) && isApproveSuccess,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
  });

  return (
    <div>
      <div className="mb-5 flex">
        <TokenButton
          setToken={setToken}
          color="purple-500"
          token="0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
        >
          Matic
        </TokenButton>
        <TokenButton
          setToken={setToken}
          color="slate-500"
          token="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        >
          WETH
        </TokenButton>
      </div>
      <h2>
        Balance: {formatERC20(balance)} {tokens[token]}
      </h2>
      <input
        type="number"
        name="amount"
        id=""
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Balance: ${formatERC20(balance)} ${tokens[token]}`}
        className="mr-5 w-[300px] rounded border-2 border-black  px-5 py-2 text-black"
        min={0}
        max={formatERC20(balance)}
      />

      {!isApproveSuccess ? (
        <button
          className="text-bold rounded border-2 border-black bg-yellow px-4 py-2 text-black"
          disabled={!approve}
          onClick={() => approve?.()}
        >
          Approve
        </button>
      ) : (
        <button
          className="text-bold rounded border-2 border-black bg-yellow px-4 py-2 text-black"
          disabled={!write || isLoading}
          onClick={() => write?.()}
        >
          Deposit
        </button>
      )}
    </div>
  );
};
