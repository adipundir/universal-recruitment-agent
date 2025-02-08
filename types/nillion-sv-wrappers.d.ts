declare module "nillion-sv-wrappers" {
  export class SecretVaultWrapper {
    constructor(nodes: any, orgCredentials: any);
    init(): Promise<void>;
    createSchema(schema: any, collectionName: string): Promise<any>;
  }
}
