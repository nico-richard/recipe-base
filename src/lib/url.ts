import { isServer } from "solid-js/web";

export const getBaseUrl = () => {
  if (isServer) {
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  }
  return "";
};
