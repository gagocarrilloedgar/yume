import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "~/env.mjs";

export const Metrics = () => {
  return <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID} />;
};
