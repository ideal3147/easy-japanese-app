// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000, // ← 1秒ごとに変更検知する
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
