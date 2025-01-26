import Header from "../../components/Header/Header";
import JobList from "../JobList";

const JobPage = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-200">
      <Header />
      <JobList />
    </div>
  );
};

export default JobPage;
