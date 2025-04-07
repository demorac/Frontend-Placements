import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { TextInput, Pagination } from "@mantine/core";

// Define job structure from your backend response
interface Job {
  id: number;
  jobTitle: string;
  company: string;
  // Add more fields if needed: about, applicants, etc.
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    getAllJobs()
      .then((data) => {
        console.log("✅ Jobs fetched:", data);
        setJobs(data);
      })
      .catch((err) => {
        console.error("❌ Error fetching jobs:", err);
      });
  }, []);

  // Filter by job title
  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div className="w-full px-4 md:w-4/5 mx-auto">
      <h2 className="text-2xl font-semibold mb-5 text-center md:text-left">
        All Jobs
      </h2>

      <TextInput
        placeholder="Search job by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border rounded-xl shadow-md bg-white hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-bold">{job.jobTitle}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No jobs found.</p>
        )}
      </div>

      {filteredJobs.length > itemsPerPage && (
        <div className="flex justify-center mt-8">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setActivePage}
            color="brightSun.4"
          />
        </div>
      )}
    </div>
  );
};

export default JobList;
