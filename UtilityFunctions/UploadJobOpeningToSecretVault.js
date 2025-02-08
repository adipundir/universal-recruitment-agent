"use server"
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "@/constants/nillionOrgConfig";

export const UploadJobOpeningToSecretVault = async (payload) => {
  const SCHEMA_ID = process.env.SECRET_VAULT_JOB_LISTING_SCHEMA_ID;
    try {
      const collection = new SecretVaultWrapper(
        orgConfig.nodes,
        orgConfig.orgCredentials,
        SCHEMA_ID
      );
      await collection.init();

      const dataWritten = await collection.writeToNodes(payload);

      const newIds = [
        ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
      ];
      console.log("created ids:", newIds);

      const dataRead = await collection.readFromNodes({});
      console.log(
        "📚 Read new records:",
        dataRead
      );
    } catch (error) {
      console.error("❌ Failed to use SecretVaultWrapper:", error.message);
    }
}


  
