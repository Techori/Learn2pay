import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Principal, Delhi Public School",
    quote:
      "LEARN2PAY has transformed our fee collection process completely. We've gone from 70% to 95% collection rate in just 3 months. The automated reminders and multiple payment options have made it incredibly easy for parents.",
    image: "https://source.unsplash.com/m75zSXCgJPo/80x80",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Finance Director, St. Mary's College",
    quote:
      "The analytics dashboard gives us instant visibility into our cash flow. Instead of chasing payments, we can now focus on improving our educational programs. The support team is also very responsive.",
    image: "https://source.unsplash.com/u3WmDyKGsrY/80x80",
  },
  {
    id: 3,
    name: "Sunil Patel",
    role: "Admin Head, Bright Future Academy",
    quote:
      "Setting up was incredibly simple - our entire fee structure was configured within 24 hours. Parents love the receipt system and automated notifications. It's been a game-changer for our institution.",
    image: "https://source.unsplash.com/rDEOVtE7vOs/80x80",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current, isAutoPlaying]);

  return (
    <section className="py-24 bg-gray-50 dark:bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-orange-100 dark:bg-[#130900] opacity-30"></div>
        <div className="absolute top-0 left-1/2 w-40 h-40 bg-orange-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-orange-500 rounded-full filter blur-[120px] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What <span className="text-orange-500">Institutions</span> Say About Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Join thousands of satisfied educational institutions that have
            transformed their fee collection process with LEARN2PAY
          </p>
        </motion.div>

        <div
          className="max-w-4xl mx-auto relative flex items-center"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="z-20 absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-full p-2 text-white
              sm:left-0 left-2 sm:-translate-y-1/2 -translate-y-1/2 sm:static sm:relative"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            style={{ left: undefined }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>

          {/* Testimonial Card */}
          <div className="w-full flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 md:p-10 shadow-xl w-full min-h-[220px] flex flex-col justify-between overflow-hidden">
                  <div>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-orange-500/40 mb-4"
                    >
                      <path
                        d="M14 16H6C6 9.4 11.4 4 18 4V10C16.4087 10 14.8826 10.6321 13.7574 11.7574C12.6321 12.8826 12 14.4087 12 16H14V24H6V16ZM34 16H26C26 9.4 31.4 4 38 4V10C36.4087 10 34.8826 10.6321 33.7574 11.7574C32.6321 12.8826 32 14.4087 32 16H34V24H26V16Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="text-lg text-gray-900 dark:text-white mb-6 italic break-words">
                      "{testimonials[current].quote}"
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-orange-500 flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="z-20 absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm border border-gray-700 rounded-full p-2 text-white
              sm:right-0 right-2 sm:-translate-y-1/2 -translate-y-1/2 sm:static sm:relative"
            onClick={nextSlide}
            aria-label="Next testimonial"
            style={{ right: undefined }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2 z-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                current === index ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;