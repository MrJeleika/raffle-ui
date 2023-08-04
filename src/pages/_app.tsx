import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { localhost } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public';
import { wrapper } from '@/redux/app/store';
import { Provider } from 'react-redux';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: false,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <title>Raffle</title>
      </Head>
      <Provider store={store}>
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
      </Provider>
    </>
  );
}
