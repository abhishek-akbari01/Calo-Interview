import axios from 'axios';
import { Job } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const api = {
    createJob: async (): Promise<string> => {
        const response = await axios.post<{ id: string }>(`${API_URL}/jobs`);
        return response.data.id;
    },

    getJobs: async (): Promise<Job[]> => {
        const response = await axios.get<Job[]>(`${API_URL}/jobs`);
        return response.data;
    },

    getJob: async (id: string): Promise<Job> => {
        const response = await axios.get<Job>(`${API_URL}/jobs/${id}`);
        return response.data;
    }
};