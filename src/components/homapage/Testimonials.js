// import TestimonialsCard from "./cards/TestimonialsCard";

// const Testimonials = () => {
//   return (
//     <section className="testimonials py-16 bg-white bg-gray-50 dark:bg-gray-900">
//       <h2 className="text-3xl text-center font-semibold mb-8 dark:text-white">
//         What Our Users Say
//       </h2>
//       <div className="testimonial-cards grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto ">
//         <TestimonialsCard
//           name="John Doe"
//           feedback="This platform helped me land my dream job!"
//         />
//         <TestimonialsCard
//           name="Jane Smith"
//           feedback="Amazing experience, highly recommended."
//         />
//       </div>
//     </section>
//   );
// };
// export default Testimonials;

import React from "react";
import Slider from "react-slick";

// const TestimonialsCarousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: true,
//   };

//   return (
//     <section className="testimonials py-16 bg-white bg-gray-50 dark:bg-gray-900">
//       <h2 className="text-3xl text-center font-semibold mb-8 dark:text-white">
//         What Our Users Say
//       </h2>
//       <div className="testimonial-carousel">
//         <Slider {...settings}>
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="testimonial-card">
//               <p className="testimonial-feedback">"{testimonial.feedback}"</p>
//               <h3 className="testimonial-name">{testimonial.name}</h3>
//               <p className="testimonial-role">{testimonial.role}</p>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsCarousel;

const TestimonialCarousel = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section className="testimonials py-16 bg-white bg-gray-50 dark:bg-gray-900 dark:text-gray-50">
      <h2 className="text-3xl text-center font-semibold mb-8 dark:text-white">
        What Our Users Say
      </h2>
      <div className="testimonial-carousel">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
              // className="flex flex-col items-center text-center"
            >
              <img
                src={testimonial.profileImage}
                alt={`${testimonial.name}'s profile`}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
              />
              <p className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-300">
                "{testimonial.feedback}"
              </p>
              <div className="mt-3">
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-300">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {testimonial.position} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
