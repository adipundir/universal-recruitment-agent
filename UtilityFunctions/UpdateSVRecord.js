"use server"

import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "@/constants/nillionOrgConfig";

// sample new Record
// const recordUpdate = {
// years_in_web3: { $allot: 3 },
// responses: [
//     { rating: 3, question_number: 1 },
//     { rating: 3, question_number: 2 },
// ],
// };

const updateSVRecord = async (newRecord, _id) => {
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

        const readOriginalRecord = await collection.readFromNodes(filterById);
        console.log('📚 Read original record:', readOriginalRecord);

        const updatedData = await collection.updateDataToNodes(
            newRecord,
            filterById
        );

        console.log(
            '📚 Find record(s) with filter and update nodes with recordUpdate:',
            updatedData.map((n) => n.result.data)
        );

        const readUpdatedRecord = await collection.readFromNodes(filterById);
        console.log('📚 Read updated record:', readUpdatedRecord);

        // await collection.flushData();
    } catch (error) {
        console.error('❌ Failed to use SecretVaultWrapper:', error.message);
    }
};

export default updateSVRecord;