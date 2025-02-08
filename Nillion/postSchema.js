import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import schema from './JobOpeningsSchema.json' assert { type: 'json' };
import { orgConfig } from './nillionOrgConfig.js';

async function main() {
    console.log(orgConfig)
    try {
        const org = new SecretVaultWrapper(
          orgConfig.nodes,
          orgConfig.orgCredentials
        );
        await org.init();

        // Create a new collection schema for all nodes in the org
        const collectionName = "Job Openings";
        const newSchema = await org.createSchema(schema, collectionName);
        console.log('✅ New Collection Schema created for all nodes:', newSchema);
        console.log('👀 Schema ID:', newSchema[0].result.data);
    } catch (error) {
        console.error('❌ Failed to use SecretVaultWrapper:', error?.message);
        process.exit(1);
    }
}

main();