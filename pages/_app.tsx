import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot className="select-none">
          <Component {...pageProps} />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </>;
}
