import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Job, JobStatus } from '../types';

export class JobService {
    private dataPath: string;

    constructor() {
        this.dataPath = path.join(__dirname, '../../../jobs.json');
    }

    private async readJobs(): Promise<Job[]> {
        try {
            const data = await fs.readFile(this.dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            await this.writeJobs([]);
            return [];
        }
    }

    private async writeJobs(jobs: Job[]): Promise<void> {
        await fs.writeFile(this.dataPath, JSON.stringify(jobs, null, 2));
    }

    async createJob(): Promise<string> {
        const jobs = await this.readJobs();
        const newJob: Job = {
            id: uuidv4(),
            status: JobStatus.PENDING,
            createdAt: new Date().toISOString()
        };

        jobs.push(newJob);
        await this.writeJobs(jobs);

        // Start processing the job
        this.processJob(newJob.id).catch(console.error);

        return newJob.id;
    }

    async getJobs(): Promise<Job[]> {
        return this.readJobs();
    }

    async getJob(id: string): Promise<Job | null> {
        const jobs = await this.readJobs();
        return jobs.find(job => job.id === id) || null;
    }

    private async processJob(jobId: string): Promise<void> {
        // Random delay between 5 seconds and 5 minutes (with 5-second steps)
        // const delay = 5000;
        const delay = Math.floor(Math.random() * 60) * 5000 + 5000;
        console.log("delay--", delay)

        await new Promise(resolve => setTimeout(resolve, delay));

        try {
            const response = await axios.get('https://api.unsplash.com/photos/random', {
                params: {
                    query: 'food',
                    client_id: process.env.UNSPLASH_ACCESS_KEY
                }
            });

            const jobs = await this.readJobs();
            const jobIndex = jobs.findIndex(job => job.id === jobId);

            if (jobIndex !== -1) {
                jobs[jobIndex].status = JobStatus.COMPLETED;
                jobs[jobIndex].completedAt = new Date().toISOString();
                jobs[jobIndex].result = response.data.urls.regular;
                await this.writeJobs(jobs);
            }
        } catch (error) {
            const jobs = await this.readJobs();
            const jobIndex = jobs.findIndex(job => job.id === jobId);

            if (jobIndex !== -1) {
                jobs[jobIndex].status = JobStatus.FAILED;
                jobs[jobIndex].completedAt = new Date().toISOString();
                await this.writeJobs(jobs);
            }
        }
    }
}