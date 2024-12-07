import React, { useEffect, useState } from 'react';
import { Job, JobStatus } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const fetchedJobs = await api.getJobs();
      setJobs(fetchedJobs);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const pollJob = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const job = await api.getJob(jobId);
        if (job.status !== JobStatus.PENDING) {
          setJobs(prev => prev.map(j => j.id === jobId ? job : j));
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Failed to poll job:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  };

  const createJob = async () => {
    try {
      const jobId = await api.createJob();
      const newJob: Job = {
        id: jobId,
        status: JobStatus.PENDING,
        createdAt: new Date().toISOString()
      };
      setJobs(prev => [...prev, newJob]);
      pollJob(jobId);
    } catch (err) {
      setError('Failed to create job');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const pendingJobs = jobs.filter(job => job.status === JobStatus.PENDING);
    pendingJobs.forEach(job => pollJob(job.id));
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Dashboard</h1>
      
      <button
        onClick={createJob}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Create New Job
      </button>

      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.id} className="border p-4 rounded">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Job ID: {job.id}</span>
              <span className={`px-2 py-1 rounded ${
                job.status === JobStatus.COMPLETED ? 'bg-green-200' :
                job.status === JobStatus.FAILED ? 'bg-red-200' :
                'bg-yellow-200'
              }`}>
                {job.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Created: {new Date(job.createdAt).toLocaleString()}
            </div>
            {job.completedAt && (
              <div className="text-sm text-gray-600">
                Completed: {new Date(job.completedAt).toLocaleString()}
              </div>
            )}
            {job.result && (
              <img 
                src={job.result} 
                alt="Food" 
                className="mt-2 w-full h-48 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;