const TestimonialsCard = ({ name, feedback }) => {
  return (
    <div className="testimonial-card bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800">
      <p className="feedback text-lg italic text-gray-600 dark:text-gray-200">
        "{feedback}"
      </p>
      <p className="name text-blue-600 font-semibold mt-4 dark:text-gray-400">
        - {name}
      </p>
    </div>
  );
};

export default TestimonialsCard;
