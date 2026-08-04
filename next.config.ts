import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: false,
  turbopack: {
    root: path.join(__dirname),
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
