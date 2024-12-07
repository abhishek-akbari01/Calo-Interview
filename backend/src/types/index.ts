export interface Job {
    id: string;
    status: JobStatus;
    createdAt: string;
    completedAt?: string;
    result?: string;
}

export enum JobStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export interface CreateJobResponse {
    id: string;
}

export interface JobResponse {
    id: string;
    status: JobStatus;
    result?: string;
}

export interface ErrorResponse {
    error: string;
}