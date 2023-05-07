import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

export default function App({ Component, pageProps }: AppProps) {
  return <FluentProvider theme={teamsLightTheme}><Component {...pageProps} /></FluentProvider>
}
