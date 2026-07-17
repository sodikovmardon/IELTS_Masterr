import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['dimmed-depletion-gravy.ngrok-free.dev', '*.ngrok-free.app', '*.ngrok.io'],
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
