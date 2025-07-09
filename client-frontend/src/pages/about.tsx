import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Globe, Heart } from 'lucide-react';
import Footer from '../components/Footer';
import AboutUI from '../components/ui/AboutUi'; // Use the actual file name casing
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
              event: "Larn2Pay founded with a vision to transform fee collection",
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
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            <span className="font-bold">
              <span className="text-[#FF7F1A]">LARN</span>
              <span className="text-gray-900 dark:text-white">2PAY</span>
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
             Behind every successful payment on Larn2Pay is a team of passionate educators-turned-technologists at 
            <span className="text-orange-400 font-semibold"> Rishishwar Industry Private Limited</span>. 
            We understand the daily struggles of educational institutions because we've lived them. From late-night 
            fee collection calls to managing complex spreadsheets, we've been there
          </p>
        </div>
      </section>
{/* Mission & Vision */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600/10 via-orange-500/5 to-orange-600/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
              <CardHeader>
                <Target className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-2xl text-white">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  We believe education should be accessible to everyone, but financial barriers shouldn't get in the way. 
                  That's why we created Larn2Pay - to help schools focus on teaching while we handle the money stuff. 
                  Our goal is simple: make fee collection so smooth that administrators can sleep peacefully, knowing 
                  parents can pay easily and students aren't stressed about finances.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
              <CardHeader>
                <Award className="h-12 w-12 text-orange-500 mb-4" />
                <CardTitle className="text-2xl text-white">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  We dream of a world where every child can focus on learning instead of worrying about school fees. 
                  Our vision is to become the trusted friend of every educational institution in India - from the small 
                  coaching center in rural villages to the biggest universities in metros. We want to make advanced 
                  payment technology so affordable and easy that every school can use it.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
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
