import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";
import { TextInput, Pagination } from "@mantine/core";
import Jobx from "./Jobx";

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
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

  // ✅ Filter only by search term now (removed jobStatus check)
  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Jobx key={job.id} {...job} />
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
