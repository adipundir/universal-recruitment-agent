const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "polygon.com" },
      { protocol: "https", hostname: "chainlink.com" },
      { protocol: "https", hostname: "ethereum.org" },
    ],
  },
};

export default nextConfig;
