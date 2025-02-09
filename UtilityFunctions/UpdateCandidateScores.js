"use server"

import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "@/constants/nillionOrgConfig";
import transformObject from "./TransformRecord";


const UpdateCandidateScores = async (jobID, email, scores) => {
    const SCHEMA_ID = process.env.SECRET_VAULT_JOB_LISTING_SCHEMA_ID;

    console.log("Data in Update Candidate fxn", jobID, email, scores)

    try {
        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );
        await collection.init();

        const filterById = {
            _id: jobID,
        };
        const readOriginalRecord = (await collection.readFromNodes(filterById))[0];
        console.log('📚 Read original record:', readOriginalRecord);

        let updatedRecord = readOriginalRecord.candidates.map((candidate) => {
            if (candidate.candidateEmail == email){
                candidate.interviewScores = scores
            }
            return candidate
        })

        updatedRecord = transformObject(updatedRecord)
        
        console.log("Updated Record in Update Candidate Scores", updatedRecord)

        const updatedData = await collection.updateDataToNodes(
            updatedRecord,
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

export default UpdateCandidateScores;