console.log(process.env.SECRET_VAULT_PRIVATE_KEY);
export const orgConfig = {
  // org credentials
  orgCredentials: {
    secretKey: "3ba1994f38ece43c5f2e29050e0f7cf9f886309dc0f869ec362390d531161ea2",
    orgDid: "did:nil:testnet:nillion15jaqslf8m9rv208wg3sad7ge29hpyxleyaj2q7",
  },
  // node config
  nodes: [
    {
      url: "https://nildb-zy8u.nillion.network",
      did: "did:nil:testnet:nillion1fnhettvcrsfu8zkd5zms4d820l0ct226c3zy8u",
    },
    {
      url: "https://nildb-rl5g.nillion.network",
      did: "did:nil:testnet:nillion14x47xx85de0rg9dqunsdxg8jh82nvkax3jrl5g",
    },
    {
      url: "https://nildb-lpjp.nillion.network",
      did: "did:nil:testnet:nillion167pglv9k7m4gj05rwj520a46tulkff332vlpjp",
    },
  ],
};
