import { useState, useEffect } from 'react';
import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase';

// Define a type for the job form state
interface JobForm {
  title: string;
  department: string;
  description: string;
  jobId: string | null;
}

// Define a type for the job data
interface Job {
  id: string;
  title: string;
  department: string;
  status: string;
  description: string;
}

// Define a type for the component props
interface JobManagementModalProps {
  closeJobModal: () => void;
  loadJobs: () => void;
  jobs: Job[];
}

export default function JobManagementModal({ closeJobModal, loadJobs, jobs }: JobManagementModalProps) {
  const [jobForm, setJobForm] = useState<JobForm>({
    title: '',
    department: 'graphic',
    description: '',
    jobId: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJobForm({ ...jobForm, [name]: value });
  };

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to manage jobs');
      return;
    }

    const jobData = {
      title: jobForm.title,
      department: jobForm.department,
      description: jobForm.description,
      status: 'open',
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
    };

    try {
      if (jobForm.jobId) {
        await updateDoc(doc(db, 'jobs', jobForm.jobId), {
          ...jobData,
          updatedAt: new Date().toISOString(),
          updatedBy: user.uid,
        });
        setJobForm({ ...jobForm, jobId: null });
      } else {
        await addDoc(collection(db, 'jobs'), jobData);
      }
      alert('Job saved successfully!');
      setJobForm({ title: '', department: 'graphic', description: '', jobId: null });
      loadJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Please try again.');
    }
  };

  const deleteJob = async (jobId: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to delete jobs');
      return;
    }

    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteDoc(doc(db, 'jobs', jobId));
        alert('Job deleted successfully!');
        loadJobs();
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Error deleting job. Please try again.');
      }
    }
  };

  return (
    <div id="jobManagementModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="relative my-10 mx-auto p-5 border w-auto max-w-[90%] bg-white rounded-md shadow-lg flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manage Jobs</h2>
            <button onClick={closeJobModal} className="text-gray-500 hover:text-gray-700">
             X
            </button>
          </div>

          <form onSubmit={handleJobSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="title"
                value={jobForm.title}
                onChange={handleInputChange}
                placeholder="Job Title"
                required
                className="w-full p-2 border rounded"
              />
              <select name="department" value={jobForm.department} onChange={handleInputChange} required className="w-full p-2 border rounded">
                <option value="graphic">Graphic Design</option>
                <option value="marketing">Marketing</option>
                <option value="administrative">Administrative</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>
            <textarea
              name="description"
              value={jobForm.description}
              onChange={handleInputChange}
              placeholder="Job Description"
              required
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              {jobForm.jobId ? 'Update Job' : 'Create Job'}
            </button>
          </form>
        </div>
        <div className="lg:ml-10">
          <div className="overflow-y-auto mt-4" style={{ maxHeight: '400px' }}>
            <h3 className="text-lg font-semibold mb-4">Existing Jobs</h3>
            <div id="jobsList" className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-gray-50 rounded-md shadow overflow-hidden">
                  <div className="p-4 flex justify-between items-center">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <div className="flex gap-2 ml-10">
                      <button onClick={() => setJobForm({ ...job, jobId: job.id })} className="text-blue-500 hover:text-blue-700">Edit</button>
                      <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
