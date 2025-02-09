"use server"

import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "@/constants/nillionOrgConfig";

const GetRecordByID = async (_id) => {
    const SCHEMA_ID = process.env.SECRET_VAULT_JOB_LISTING_SCHEMA_ID;
    try {
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const filterById = {
            _id: _id,
        };

        const readRecord = await collection.readFromNodes(filterById);
        return readRecord

    } catch (error) {
        console.error('❌ Failed to use SecretVaultWrapper:', error.message);
    }
};

export default GetRecordByID;