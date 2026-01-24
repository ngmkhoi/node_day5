const queueModel = require('../models/queue.model');

class QueueService {
    async addJob(type, payload) {
        try {
            console.log(type)
            console.log(payload)
            const jobId = await queueModel.create(type, payload)
            console.log(`Job added with ID: ${jobId}`)
            return jobId
        } catch (error) {
            console.error('Error adding job:', error)
            throw error;
        }
    }

    async getNextjob() {
       return await queueModel.findOnePending();
    }

    async markProcessing(jobId) {
        await queueModel.markProcessing(jobId);
        console.log(`🔄 Job ${jobId} is now processing...`);
    }

    async markCompleted(jobId) {
        await queueModel.markCompleted(jobId);
        console.log(`✅ Job ${jobId} completed successfully`);
    }

    async markFailed(jobId, error) {
        await queueModel.markFailed(jobId);
        console.error(`❌ Job ${jobId} failed:`, error.message);
    }

    async processJob(job, tasks) {
        const taskHandler = tasks[job.type]
        if (!taskHandler) {
            throw new Error(`No task handler found for job type: ${job.type}`);
        }
        const payload = typeof job.payload === 'string'
            ? JSON.parse(job.payload)
            : job.payload;

        await taskHandler(payload)
    }
}

module.exports = new QueueService();