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