const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "polygon.com" },
      { protocol: "https", hostname: "chainlink.com" },
      { protocol: "https", hostname: "ethereum.org" },
      { protocol: "https", hostname: "example.com" },
    ],
  },
};

export default nextConfig;
