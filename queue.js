require('dotenv').config();
const queueService = require('./src/services/queue.service');
const tasks = require('./src/tasks');

const POLL_INTERVAL = 5000
let isProcessing = false

async function processNextJob() {
    if(isProcessing) return

    try {
        isProcessing = true;
        const job = await queueService.getNextjob()

        if (!job) {
            console.log('⏳ No pending jobs. Waiting...');
            return;
        }

        await queueService.markProcessing(job.id)
        await queueService.processJob(job, tasks);
        await queueService.markCompleted(job.id);
    } catch (error) {
        console.error('❌ Error processing job:', error);

        // Nếu có job đang xử lý thì đánh dấu failed
        if (job) {
            await queueService.markFailed(job.id, error);
        }
    } finally {
        isProcessing = false;
    }
}

async function startQueueWorker() {
    console.log('🚀 Queue worker started');
    console.log(`📊 Polling interval: ${POLL_INTERVAL}ms\n`);

    // Poll queue liên tục
    setInterval(processNextJob, POLL_INTERVAL);

    // Xử lý ngay lần đầu
    processNextJob();
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Queue worker shutting down...');
    process.exit(0);
});

startQueueWorker();

