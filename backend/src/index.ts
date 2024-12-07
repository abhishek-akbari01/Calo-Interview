import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { JobService } from './services/jobService';
import { ErrorResponse, JobResponse } from './types';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const jobService = new JobService();

app.use(cors());
app.use(express.json());

// server health
app.get('/', async (req, res) => {
    try {
        res.json("Server is healthy!")
    } catch (error) {
        const response: ErrorResponse = { error: 'Failed to fetch jobs' };
        res.status(500).json(response);
    }
});

// Create a new job
app.post('/jobs', async (req, res) => {
    try {
        const jobId = await jobService.createJob();
        res.status(201).json({ id: jobId });
    } catch (error) {
        const response: ErrorResponse = { error: 'Failed to create job' };
        res.status(500).json(response);
    }
});

// Get all jobs
app.get('/jobs', async (req, res) => {
    try {
        const jobs = await jobService.getJobs();
        res.json(jobs);
    } catch (error) {
        const response: ErrorResponse = { error: 'Failed to fetch jobs' };
        res.status(500).json(response);
    }
});

// Get specific job
app.get('/jobs/:id', async (req, res) => {
    try {
        const job = await jobService.getJob(req.params.id);
        if (!job) {
            res.status(404).json({ error: 'Job not found' });
            return;
        }
        res.json(job);
    } catch (error) {
        const response: ErrorResponse = { error: 'Failed to fetch job' };
        res.status(500).json(response);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});