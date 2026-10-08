import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emite los <meta> en el <head> para todos los clientes (SEO y Lighthouse).
  htmlLimitedBots: /.*/,
};

export default nextConfig;
