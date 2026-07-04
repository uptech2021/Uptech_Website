import { useState, useEffect, ChangeEvent } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Editor } from "@tinymce/tinymce-react";
import { X, Pencil, Trash2 } from "lucide-react";
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
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm flex justify-center items-center p-4"
    >
      <div className="bg-paper rounded-card shadow-card-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Navy header */}
        <div className="bg-navy rounded-t-card px-6 py-5 flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">
            {jobForm.jobId ? "Edit Job" : "Create Job"}
          </h2>
          <button
            onClick={closeJobModal}
            className="text-white/70 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 p-6">
          {/* Left panel: Form */}
          <div>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={jobForm.title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    required
                    className="bg-mist border border-line rounded-card-sm focus:border-brand focus:ring-2 focus:ring-brand/20 px-4 py-3 w-full text-ink transition"
                  />
                </div>
                <div>
                  <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={jobForm.department}
                    onChange={handleInputChange}
                    required
                    className="bg-mist border border-line rounded-card-sm focus:border-brand focus:ring-2 focus:ring-brand/20 px-4 py-3 w-full text-ink transition"
                  >
                    <option value="Graphic design">Graphic Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Engineering">Engineering</option>
                    <option value="General Opportunities">General Opportunities</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-ink-soft text-sm font-semibold uppercase tracking-wider block mb-2">
                  Description
                </label>
                <div className="border border-line rounded-card-sm overflow-hidden">
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
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-brand text-white rounded-full shadow-glow-blue hover:bg-brand-deep px-6 py-2.5 font-bold transition"
                >
                  {jobForm.jobId ? "Update Job" : "Create Job"}
                </button>
                {jobForm.jobId && (
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
                    className="bg-transparent text-ink-soft border border-line rounded-full hover:bg-mist px-6 py-2.5 font-bold transition"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right panel: Existing Jobs */}
          <div className="mt-6 lg:mt-0">
            <h3 className="text-ink text-lg font-bold mb-4">Existing Jobs</h3>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {jobs.length === 0 ? (
                <div className="flex flex-col gap-3">
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-mist border border-line rounded-card-sm p-4 hover:border-brand/30 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-ink font-semibold truncate">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-on-blue text-brand-deep">
                            {job.department}
                          </span>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-mist-2 text-ink-soft'
                          }`}>
                            {job.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => handleEdit(job)}
                          className="text-brand hover:bg-mist-2 border border-transparent hover:border-brand/30 rounded-full p-2 transition"
                          title="Edit job"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-full p-2 transition"
                          title="Delete job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
