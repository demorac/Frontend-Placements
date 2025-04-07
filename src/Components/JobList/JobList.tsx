import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { TextInput, Pagination } from "@mantine/core";
import Jobx from "./Jobx";

// Define Job interface (adjust fields to match your backend model)
interface Job {
  id: string;
  jobTitle: string;
  jobStatus: string;
  // Add other fields like jobDescription, companyName, etc. if needed
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
      .catch((err) => console.error("❌ Error fetching jobs:", err));
  }, []);

  // Filter only ACTIVE jobs and match job title
  const filteredJobs = jobs
    .filter((job) => job.jobStatus === "ACTIVE")
    .filter((job) =>
      job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination
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
          paginatedJobs.map((job) => <Jobx key={job.id} {...job} />)
        ) : (
          <p className="text-gray-500">No active jobs found.</p>
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
