console.log(process.env.SECRET_VAULT_PRIVATE_KEY);
export const orgConfig = {
  // demo org credentials
  // in a production environment, make sure to put your org's credentials in environment variables
  orgCredentials: {
    secretKey: process.env.SECRET_VAULT_PRIVATE_KEY,
    orgDid: "did:nil:testnet:nillion15jaqslf8m9rv208wg3sad7ge29hpyxleyaj2q7",
  },
  // demo node config
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
