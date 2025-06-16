import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedCounter = ({
  from,
  to,
  duration = 2,
}: {
  from: number;
  to: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * (to - from) + from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [from, to, duration]);

  return <>{count.toLocaleString()}</>;
};

const Stats = () => {
  const stats = [
    {
      title: "Educational Institutions",
      value: 15000,
      prefix: "",
      suffix: "+",
    },
    {
      title: "Collection Rate",
      value: 95,
      prefix: "",
      suffix: "%",
    },
    {
      title: "Transaction Success Rate",
      value: 99.8,
      prefix: "",
      suffix: "%",
    },
    {
      title: "Students Served",
      value: 2.5,
      prefix: "",
      suffix: "M+",
      isDecimal: true,
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="text-orange-500">Thousands</span> of
            Educational Institutions
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            From small coaching centers to large universities, we're helping
            institutions across the country modernize their fee collection
            processes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)",
              }}
            >
              <div className="text-4xl font-bold mb-2 text-white">
                {stat.prefix}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.isDecimal ? (
                    <>
                      <AnimatedCounter from={0} to={Math.floor(stat.value)} />.
                      {(stat.value % 1).toFixed(1).substring(2)}
                    </>
                  ) : (
                    <AnimatedCounter from={0} to={stat.value} />
                  )}
                </motion.span>
                <span className="text-orange-500">{stat.suffix}</span>
              </div>
              <p className="text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
