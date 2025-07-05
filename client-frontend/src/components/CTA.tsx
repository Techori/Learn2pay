import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#1a0a00] dark:to-black">
      {/* Background with gradient and grain effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff8000] to-[#3a1500] dark:from-[#1a0a00] dark:to-black">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6">
              Ready to Transform Your Fee Collection Process?
            </h2>

            <p className="text-gray-700 dark:text-white/80 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Join thousands of educational institutions that have simplified
              their fee management and improved collection rates with LARN2PAY.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-4 rounded-md inline-block w-full sm:w-auto dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-gray-900"
                >
                  Start Your Free Trial
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/demo"
                  className="bg-transparent hover:bg-orange-100 text-orange-600 border border-orange-600 font-medium px-8 py-4 rounded-md inline-block w-full sm:w-auto dark:bg-transparent dark:hover:bg-orange-900/20 dark:text-orange-400 dark:border-orange-400"
                >
                  Schedule a Demo
                </Link>
              </motion.div>
            </div>

            <motion.p
              className="text-gray-600 dark:text-white/70 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              No credit card required • Setup in 24 hours • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
