import { createWalletClient, custom } from 'viem';
import { localhost } from 'viem/chains';

const [account] = await window.ethereum.request({
  method: 'eth_requestAccounts',
});

export const walletClient = createWalletClient({
  account,
  chain: localhost,
  transport: custom(window.ethereum),
});
