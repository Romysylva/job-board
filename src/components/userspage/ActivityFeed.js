import React from "react";

const ActivityFeed = () => {
  const savedJobs = ["Software Engineer", "Product Manager"];
  const applications = ["UX Designer", "Backend Developer"];
  const reviews = [
    "Great company to work for!",
    "Enjoyed the interview process.",
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Activity Feed
      </h2>

      {/* Saved Jobs */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Saved Jobs
        </h3>
        <ul className="space-y-2">
          {savedJobs.map((job, index) => (
            <li
              key={index}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {job}
            </li>
          ))}
        </ul>
      </section>

      {/* Applications */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Applications
        </h3>
        <ul className="space-y-2">
          {applications.map((job, index) => (
            <li
              key={index}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {job}
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Reviews
        </h3>
        <ul className="space-y-2">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {review}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ActivityFeed;
