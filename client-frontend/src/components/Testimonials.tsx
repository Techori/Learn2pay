import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage } from "../components/ui/Aavatar"; // Adjust the import path as needed

const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Principal, Delhi Public School",
    quote:
      "LARN2PAY has transformed our fee collection process completely. We've gone from 70% to 95% collection rate in just 3 months. The automated reminders and multiple payment options have made it incredibly easy for parents.",
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
            transformed their fee collection process with LARN2PAY
          </p>
        </motion.div>

        <div
          className="max-w-4xl mx-auto flex items-center justify-between gap-4 relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white dark:bg-black border-2 border-orange-500 shadow-lg transition-transform transition-colors duration-200 rounded-full w-14 h-14 flex items-center justify-center text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>

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
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 rounded-2xl p-10 md:p-14 shadow-2xl w-full min-h-[260px] flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full w-2 bg-orange-500 rounded-l-2xl opacity-80" />
                  <div>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-orange-500/60 mb-4"
                    >
                      <path
                        d="M14 16H6C6 9.4 11.4 4 18 4V10C16.4087 10 14.8826 10.6321 13.7574 11.7574C12.6321 12.8826 12 14.4087 12 16H14V24H6V16ZM34 16H26C26 9.4 31.4 4 38 4V10C36.4087 10 34.8826 10.6321 33.7574 11.7574C32.6321 12.8826 32 14.4087 32 16H34V24H26V16Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="text-xl md:text-2xl text-gray-900 dark:text-white mb-8 italic font-medium leading-relaxed break-words">
                      "{testimonials[current].quote}"
                    </p>
                  </div>
                  <div className="flex items-center mt-4 gap-5">
                    <Avatar name={testimonials[current].name} className="w-14 h-14">
                      <AvatarImage src={testimonials[current].image} alt={testimonials[current].name} />
                    </Avatar>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg md:text-xl truncate">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base truncate">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white dark:bg-black border-2 border-orange-500 shadow-lg transition-transform transition-colors duration-200 rounded-full w-14 h-14 flex items-center justify-center text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex justify-center mt-8 gap-3 z-10">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-4 h-4 rounded-full border-2 border-orange-500 transition-all duration-300 flex items-center justify-center focus:outline-none ${
                current === index ? "bg-orange-500 scale-110 shadow-lg" : "bg-white dark:bg-gray-800"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;