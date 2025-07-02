import React from "react";
import Slider from "react-slick";

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
