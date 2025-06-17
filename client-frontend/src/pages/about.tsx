import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Globe, Heart } from 'lucide-react';
import Footer from '../components/Footer';
import AboutUI from '../components/ui/aboutui'; // Use the actual file name casing
import Navbar from '@/components/Navbar';
const About: React.FC = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-gray-300" />,
      title: "Security First",
      description: "We prioritize the security of your data and transactions with bank-grade encryption.",
    },
    {
      icon: <Users className="h-8 w-8 text-gray-300" />,
      title: "Customer Success",
      description: "Your success is our success. We're committed to helping you achieve your goals.",
    },
    {
      icon: <Globe className="h-8 w-8 text-gray-300" />,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions for fee management.",
    },
    {
      icon: <Heart className="h-8 w-8 text-gray-300" />,
      title: "Community",
      description: "We believe in building strong relationships with our educational partners.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      description: "10+ years in fintech and education technology",
      image: "👨‍💼",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      description: "Expert in payment systems and security",
      image: "👩‍💻",
    },
    {
      name: "Amit Patel",
      role: "Head of Product",
      description: "Focused on user experience and innovation",
      image: "👨‍🔬",
    },
    {
      name: "Neha Singh",
      role: "Head of Operations",
      description: "Ensuring smooth operations and customer success",
      image: "👩‍💼",
    },
  ];

  const milestones = [
    {
      year: "2020",
      event: "Learn2Pay founded with a vision to transform fee collection",
    },
    {
      year: "2021",
      event: "Launched AI-powered defaulter prediction system",
    },
    {
      year: "2022",
      event: "Reached 1,000+ educational institutions",
    },
    {
      year: "2023",
      event: "Processed ₹100M+ in fee collections",
    },
    {
      year: "2024",
      event: "Expanded to serve 10,000+ institutions nationwide",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            About Learn2Pay
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize fee collection for educational institutions across India,
            making it smarter, faster, and more efficient than ever before.
          </p>
        </div>
      </section>

      {/* About UI Section */}
      <AboutUI
        values={values}
        team={team}
        milestones={milestones}
        onStart={() => navigate('/register')}
        onContact={() => navigate('/contact')}
      />

      <Footer />
    </div>
  );
};

export default About;
