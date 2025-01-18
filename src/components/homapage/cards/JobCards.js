import { jobData } from "../../../data/jobData";

const JobCards = ({ title, company, location }) => {
  return (
    <div className="job-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
      <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-400">{company}</p>
      <p className="text-gray-500 dark:text-gray-400">{location}</p>
    </div>
  );
};

export default JobCards;

// const JobCards = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-800 px-5 relative">
//       {jobData.map((job, index) => (
//         <div
//           key={job.id}
//           className={`absolute card-design ${
//             index === 0 ? "rotate-[12deg]" : `-rotate-[${index * 18}deg]`
//           }`}
//         >
//           <div className="h-full flex flex-col justify-between bg-white p-4 rounded-lg shadow-lg">
//             <div className="card-text text-xl font-bold text-gray-800">
//               {job.title}
//             </div>
//             <div className="card-text text-gray-500 text-sm">{job.company}</div>
//             <div className="p-3 flex items-center justify-center w-full">
//               <img
//                 src={job.logo}
//                 alt={`${job.company} logo`}
//                 className="h-12 w-12 rounded-full object-cover"
//               />
//             </div>
//             <div className="card-text text-gray-700 text-sm">
//               {job.location}
//             </div>
//             <div className="mt-4 text-center">
//               <a
//                 href={`/job/${job.id}`}
//                 className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
//               >
//                 View Job
//               </a>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default JobCards;
