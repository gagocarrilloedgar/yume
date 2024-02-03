import { GoogleAnalytics } from "@next/third-parties/google";

export const Metrics = () => {
  const analyticsId = process.env.GOOGLE_ANALYTICS_ID;

  return analyticsId && <GoogleAnalytics gaId={analyticsId} />;
};
