"use server"
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "@/constants/nillionOrgConfig";

const getAllJobOpenings = async () => {
    const SCHEMA_ID = process.env.SECRET_VAULT_JOB_LISTING_SCHEMA_ID;
    try {
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const dataRead = await collection.readFromNodes({});
        const filteredJobListings = dataRead.map(({ candidates, ...job }) => ({
            ...job,
            candidates: candidates ? candidates?.length : 0,
        }));

        return filteredJobListings
    } catch (error) {
        console.error("❌ Failed to Fetch Job Openings", error.message);
    }
}

export default getAllJobOpenings



