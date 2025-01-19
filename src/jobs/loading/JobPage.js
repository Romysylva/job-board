import Header from "../../components/Header/Header";
import JobList from "../JobList";
import JobDetails from "../JobDetailPage";

const JobPage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-200">
      <Header />
      <JobList />
      {/* <JobDetails /> */}
    </div>
  );
};

export default JobPage;
