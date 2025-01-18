import React from "react";

const OpenPositions = () => {
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      location: "Remote",
      postedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Product Manager",
      location: "New York, NY",
      postedDate: "1 week ago",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-sm text-gray-400">Posted: {job.postedDate}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OpenPositions;
