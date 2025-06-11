import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  School,
  BookOpen,
  GraduationCap,
  Music,
  Palette,
  CheckCircle,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <School className="h-16 w-16 text-orange-500" />,
      title: "Schools & Colleges",
      description:
        "Complete fee management solution for educational institutions",
      features: [
        "Student registration & management",
        "Class-wise fee structure",
        "Parent communication portal",
        "Attendance tracking",
        "Exam management",
        "Transport fee management",
      ],
    },
    {
      icon: <BookOpen className="h-16 w-16 text-orange-500" />,
      title: "Coaching Centers",
      description: "Streamlined billing and management for coaching institutes",
      features: [
        "Batch-wise fee collection",
        "Course management",
        "Student performance tracking",
        "Mock test management",
        "Study material distribution",
        "Progress monitoring",
      ],
    },
    {
      icon: <GraduationCap className="h-16 w-16 text-orange-500" />,
      title: "Universities",
      description:
        "Enterprise-grade solutions for large educational institutions",
      features: [
        "Multi-campus management",
        "Department-wise billing",
        "Scholarship management",
        "Hostel fee collection",
        "Library management",
        "Alumni network",
      ],
    },
    {
      icon: <Music className="h-16 w-16 text-orange-500" />,
      title: "Music & Arts Academies",
      description: "Specialized billing for creative learning institutes",
      features: [
        "Instrument rental management",
        "Performance event organization",
        "Progress tracking",
        "Recital management",
        "Grade certification",
        "Competition enrollment",
      ],
    },
    {
      icon: <Palette className="h-16 w-16 text-orange-500" />,
      title: "Skills Training Centers",
      description: "Professional course management and fee collection",
      features: [
        "Material cost tracking",
        "Project-based billing",
        "Certification management",
        "Portfolio creation",
        "Skill assessment",
        "Industry partnerships",
      ],
    },
  ];

  const coreFeatures = [
    "Automated Payment Collection",
    "Multi-Gateway Integration",
    "Multi-language Support",
    "Real-time Analytics",
    "SMS & Email Alerts",
    "AI-Powered Insights",
    "Secure Payment Processing",
    "Mobile App Access",
    "Custom Branding",
    "24/7 Customer Support",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="py-20 px-4">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Customized fee collection and management solutions for various
              types of educational institutions worldwide
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl mb-2 text-white">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    ss
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-gray-300"
                      >
                        <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300"
                    onClick={() => navigate("/contact")}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Core Features Section */}
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/50 rounded-2xl p-12 mb-20 border border-orange-500/20 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-4 border border-orange-500/20 rounded-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 group"
                >
                  <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm font-medium text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-orange-600/20 rounded-2xl p-12 text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Get the Perfect Solution for Your Institution
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Talk to our experts and discover how Lern2Pay can fulfill your
              specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="px-8 py-4 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/contact")}
              >
                Book Free Consultation
              </Button>
              <Button className="px-8 py-4 text-lg border-orange-500 text-orange-400 hover:bg-orange-500/10 transform hover:scale-105 transition-all duration-300">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
