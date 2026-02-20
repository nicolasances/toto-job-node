/**
 * Simple Cloud Run Job - Hello World
 * 
 * This job runs on Google Cloud Run and outputs a hello world message.
 */

import { SimpleAgent } from "./agent/SimpleAgent";

async function main() {
    console.log('🚀 Starting Cloud Run Job...');
    
    const timestamp = new Date().toISOString();
    const taskIndex = process.env.CLOUD_RUN_TASK_INDEX || '0';
    const taskAttempt = process.env.CLOUD_RUN_TASK_ATTEMPT || '0';
    
    console.log(`Triggering Simple Agent`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Task Index: ${taskIndex}`);
    console.log(`Task Attempt: ${taskAttempt}`);

    await new SimpleAgent().handleMessage(`let melk, breadn, spaghetti ris kicks`);
    
    console.log('✅ Job completed successfully!');
}

// Run the job
main()
    .then(() => {
        console.log('Job finished');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Job failed:', error);
        process.exit(1);
    });
