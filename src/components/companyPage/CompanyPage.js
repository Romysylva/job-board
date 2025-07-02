import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import Sidebar from "./SideNav";
import Header from "../Header/Header";
import ApplicationForm from "../applicaions/ApplicationForm";
import AnalyticsDashBoard from "./AnalyticsDashBoard";
import JobForm from "../../jobs/JobForm"; // Import JobForm

const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [user, setUser] = useState(null || []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!id) {
        setError("Company not found!");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/companies/${id}`
        );
        setCompany(response.data);
        setJobs(response.data.jobs || []);
      } catch (err) {
        console.error(
          "Error fetching company details:",
          err.response?.data.message || err.message
        );
      }
    };
    fetchCompanyDetails(id);
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.data || {});
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };
    fetchUser();
  }, []);

  const handJobSelect = (job) => {
    setShowApplicationForm(false);
    setSelectedJob(job);
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const toggleJobForm = () => {
    setShowJobForm((prev) => !prev);
  };

  // const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];

  if (error) return <p>{error}</p>;
  if (!company) return <p>Loading... ✴</p>;

  return (
    <>
      <Header />
      <div className="company-page dark:bg-gray-900 dark:text-gray-300">
        {user && Array.isArray(user.roles) && user.roles.length > 0 && (
          <Sidebar
            userRole={user.roles.toString()}
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onPostJobClick={toggleJobForm}
          />
        )}

        <main className="content main-content dark:bg-gray-900 dark:text-gray-300">
          {company && (
            <>
              {company.logo && (
                <div
                  className="parallax-banner"
                  style={{
                    backgroundImage: `url("http://localhost:5000/${company.logo.replace(
                      /\\/g,
                      "/"
                    )}")`,
                  }}
                >
                  <header className="company-header">
                    {company ? (
                      <>
                        <img
                          src={
                            `http://localhost:5000/${company.logo}` ||
                            "/images/default-company-logo.png"
                          }
                          alt="Company Logo"
                        />
                        <h1 className="text-center text-4xl">{company.name}</h1>
                        <div className="mt-8">
                          <h2>About {company.name}</h2>
                          <p>{company.about}</p>
                          <p>Company Location: {company.location}</p>
                        </div>
                      </>
                    ) : (
                      <p>Loading company details...</p>
                    )}
                  </header>
                </div>
              )}
              <div className="company-info">
                <p>{company.description}</p>
              </div>

              {/* Show Analytics Dashboard only for Admin/Manager */}
              {(user?.roles?.includes("admin") ||
                user?.roles?.includes("manager")) && (
                <AnalyticsDashBoard companyId={id} />
              )}

              <section className="current-job">
                {selectedJob ? (
                  <>
                    <h2 className="p-2 text-xl">Current Job</h2>
                    <h3>{selectedJob.title}</h3>
                    <p>Location: {selectedJob.location}</p>
                    <p>Salary: {selectedJob.salary}</p>
                    <button onClick={handleApply} className="add-review-btn">
                      Apply Now
                    </button>
                    {showApplicationForm && (
                      <ApplicationForm
                        isOpen={showApplicationForm}
                        onClose={() => setShowApplicationForm(false)}
                        jobId={selectedJob._id}
                      />
                    )}
                  </>
                ) : (
                  <p className="p-2 text-xl text-center">
                    Select a job to view details.
                  </p>
                )}
              </section>

              <section className="jobs-list dark:bg-gray-900 dark:text-gray-300">
                <h2 className="text-center text-2xl">Available Jobs</h2>
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="job-card dark:bg-gray-900 dark:text-gray-300"
                    onClick={() => handJobSelect(job)}
                  >
                    <h3>Job Title: {job.title}</h3>
                    <p>Job description: {job.description}</p>
                    <p>Job location: {job.location}</p>
                    <p>Salary: {job.salary}</p>

                    <button
                      onClick={() => handleApply(job)}
                      className="add-review-btn"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </section>
            </>
          )}

          {/* Job Form Modal */}
          {showJobForm && (
            <JobForm
              companyId={id}
              onClose={toggleJobForm}
              refreshJobs={() => setShowJobForm(false)}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default CompanyPage;
