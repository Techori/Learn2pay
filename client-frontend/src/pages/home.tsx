
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white min-h-screen overflow-hidden"
      >
        <main>
          <Hero />
          <Stats />
          <Features />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Home;
