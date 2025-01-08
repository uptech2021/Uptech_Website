import { useState, useEffect, ChangeEvent } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import { Job, JobForm, JobManagementModalProps } from "@/types/dashboard";
import { toast } from "react-toastify";
import SkeletonLoader from "./SkeletonLoader";

export default function JobManagementModal({
  closeJobModal,
  loadJobs,
}: JobManagementModalProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobForm, setJobForm] = useState<JobForm>({
    title: "",
    department: "",
    description: "",
    jobId: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobForm({ ...jobForm, [name]: value });
  };

  const handleEditorChange = (content: string) => {
    setJobForm({ ...jobForm, description: content });
  };

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to manage jobs");
      return;
    }

    const jobData = {
      title: jobForm.title,
      department: jobForm.department,
      description: jobForm.description,
      status: "open",
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
    };

    try {
      if (jobForm.jobId) {
        await updateDoc(doc(db, "jobs", jobForm.jobId), {
          ...jobData,
          updatedAt: new Date().toISOString(),
          updatedBy: user.uid,
        });
        setJobForm({ title: "", department: "", description: "", jobId: null });
      } else {
        await addDoc(collection(db, "jobs"), jobData);
      }
      alert("Job saved successfully!");
      setJobForm({ title: "", department: "", description: "", jobId: null });
      loadJobs();
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Error saving job. Please try again.");
    }
  };

  const handleEdit = (job: Job) => {
    setJobForm({
      title: job.title,
      department: job.department,
      description: job.description,
      jobId: job.id,
    });
  };

  const handleDelete = async (jobId: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to delete jobs");
      return;
    }

    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteDoc(doc(db, "jobs", jobId));
        alert("Job deleted successfully!");
        loadJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Error deleting job. Please try again.");
      }
    }
  };

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch(`/api/jobs`);

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log(data);
        setJobs(data.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          console.error(error);
        } else {
          toast.error("An known error occurred");
          console.error("Unexpected error", error);
        }
      }
    }
    loadJobs();
  }, []);

  return (
    <div
      id="jobManagementModal"
      className=" h-6/12 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative my-10 mx-auto p-5 border w-auto max-w-[90%] max-h-[90%] overflow-y-scroll bg-white rounded-md shadow-lg flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manage Jobs</h2>
            <button
              onClick={closeJobModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
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
              <select
                name="department"
                value={jobForm.department}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="Graphic design">Graphic Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Administrative">Administrative</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={jobForm.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "print",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "paste",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {jobForm.jobId ? "Update Job" : "Create Job"}
              </button>
            </div>
          </form>
          {jobForm.jobId && (
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() =>
                  setJobForm({
                    title: "",
                    department: "graphic",
                    description: "",
                    jobId: null,
                  })
                }
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel Edit
              </button>
            </div>
          )}
        </div>
        <div className="lg:ml-10 h-screen">
          <div className="job-list h-full">
            <h3>Existing Jobs</h3>
            <ul className="h-full overflow-y-auto">
              {jobs.length === 0 ? (
                <div className="flex flex-col gap-2">
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </div>
              ) : (
                jobs.map((job) => (
                  <li key={job.id} className="border border-gray-200 rounded-md bg-white p-4 mb-4 hover:bg-gray-100 transition duration-200 ease-in-out">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <p className="text-gray-600">Department: {job.department}</p>
                    <p className="text-gray-600">Status: {job.status}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 ease-in-out" onClick={() => handleEdit(job)}>Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 ease-in-out" onClick={() => handleDelete(job.id)}>Delete</button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
