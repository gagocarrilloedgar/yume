import { ThemeProvider } from "@mui/material/styles";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";

import { api } from "~/utils/api";

import { createEmotionCache } from "~/utils/createEmotionCache";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import { Layout } from "~/components/Layout";
import { theme } from "~/theme";
import { UserProvider } from "./profile";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps }
}: MyAppProps) => {
  // Check if the Component has a showBar property and use it
  const hideBar = Component?.defaultProps?.hideBar;
  const LayoutComponent = Component?.defaultProps?.layout ?? Layout;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <UserProvider>
            <CssBaseline />
            <LayoutComponent showBar={!hideBar}>
              <Component {...pageProps} />
              <SpeedInsights />
            </LayoutComponent>
          </UserProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default api.withTRPC(MyApp);
