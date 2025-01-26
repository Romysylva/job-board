import React from "react";
import Header from "./Header/Header";
import CompanyInfoPage from "./companyInfo/CompanyInfoPage";
import JobDescriptionPage from "./jobDescription/JobDescriptionPAge";
import ApplyNowSidebar from "./applyNow/ApplyNowSideBar";

const jobData = {
  title: "Software Engineer",
  type: "Full-Time",
  location: "San Francisco, CA",
  postedDate: "2025-01-11",
  company: {
    name: "Tech Innovations Inc.",
    logo: "https://unsplash.com/photos/a-golden-letter-p-on-a-green-background-ecQIWxL6Ihc",
    description:
      "Tech Innovations Inc. is a leading software development company specializing in cutting-edge solutions for businesses.",
    website: "https://techinnovations.com",
  },
  description:
    "As a Software Engineer, you will design, develop, and maintain software solutions, collaborating with a team of talented professionals.",
  responsibilities: [
    "Develop and maintain high-quality software applications.",
    "Collaborate with cross-functional teams to define, design, and ship new features.",
    "Identify and correct bottlenecks and fix bugs.",
    "Continuously discover, evaluate, and implement new technologies to maximize development efficiency.",
  ],
  requirements: [
    "Bachelor's degree in Computer Science or a related field.",
    "2+ years of experience in software development.",
    "Proficient in JavaScript, React, and Node.js.",
    "Strong understanding of software design principles and best practices.",
  ],
  perks: [
    "Competitive salary and benefits package.",
    "Flexible work hours and remote work options.",
    "Health and wellness programs.",
    "Opportunities for professional development and growth.",
  ],
  deadline: "2025-02-01",
};
const JobDetailsPages = () => {
  const {
    title,
    type,
    location,
    postedDate,
    company,
    description,
    responsibilities,
    requirements,
    perks,
    deadline,
  } = jobData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6 flex-grow mb-[50px]">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Title Section */}
          <section className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
            <h1 className="text-2xl font-bold dark:text-white">{title}</h1>
            <div className="mt-2 flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full">
                {type}
              </span>
              <span>{location}</span>
              <span>{postedDate}</span>
            </div>
          </section>

          {/* Company Info */}
          <CompanyInfoPage
            logo={company.logo}
            name={company.name}
            description={company.description}
            website={company.website}
          />

          {/* Job Description */}
          <JobDescriptionPage
            description={description}
            responsibilities={responsibilities}
            requirements={requirements}
            perks={perks}
          />
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          <ApplyNowSidebar
            deadline={deadline}
            onApply={() =>
              alert("Apply Now functionality not implemented yet!")
            }
            onSave={() => alert("Save Job functionality not implemented yet!")}
          />
        </aside>
      </main>
    </div>
  );
};

export default JobDetailsPages;
