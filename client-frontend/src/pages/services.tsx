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
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  ClipboardList,
  MessageCircle,
  CalendarCheck,
  FileText,
  Bus,
  Layers,
  TrendingUp,

  Home,

  Globe,
  Languages,
  BarChart2,
  Bell,
  ShieldCheck,
  Smartphone,
  Headphones,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
const featureIcons: Record<string, any> = {
  "Student registration & management": Users,
  "Class-wise fee structure": ClipboardList,
  "Parent communication portal": MessageCircle,
  "Attendance tracking": CalendarCheck,
  "Exam management": FileText,
  "Transport fee management": Bus,
  "Batch-wise fee collection": Layers,
  "Student performance tracking": TrendingUp,
  "Multi-campus management": Home,
  "Department-wise billing": ClipboardList,
  "Scholarship management": FileText,
  "Hostel fee collection": Home,
};

// Unique icons for each core feature
const coreFeatureIcons: Record<string, any> = {
  "Automated Payment Collection": CreditCard,
  "Multi-Gateway Integration": Globe,
  "Multi-language Support": Languages,
  "Real-time Analytics": BarChart2,
  "SMS & Email Alerts": Bell,
  "Secure Payment Processing": ShieldCheck,
  "Mobile App Access": Smartphone,
  "24/7 Customer Support": Headphones,
};

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <School className="h-16 w-16 text-orange-500 drop-shadow-lg" />,
      title: "Schools & Colleges",
      description:
        "Complete fee management solution for educational institutions",
      features: [
        "Student registration & management",
        "Class-wise fee structure",
        "Parent communication portal",
        "Transport fee management",
      ],
    },
    {
      icon: <BookOpen className="h-16 w-16 text-orange-500 drop-shadow-lg" />,
      title: "Coaching Centers",
      description: "Streamlined billing and management for coaching institutes",
      features: [
        "Batch-wise fee collection",
        "Automated Fee Reminders",
        "Discount and Scholarship Management",
        "Automated Fee Reminders",
      ],
    },
    {
      icon: (
        <GraduationCap className="h-16 w-16 text-orange-500 drop-shadow-lg" />
      ),
      title: "Universities",
      description:
        "Enterprise-grade solutions for large educational institutions",
      features: [
        "Multi-campus management",
        "Department-wise billing",
        "Scholarship management",
        "Hostel fee collection",
      ],
    },
  ];

  const coreFeatures = [
    "Automated Payment Collection",
    "Multi-Gateway Integration",
    "Multi-language Support",
    "Real-time Analytics",
    "SMS & Email Alerts",
    "Secure Payment Processing",
    "Mobile App Access",
    "24/7 Customer Support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-950 text-white">
      <Navbar />
      <div className="py-20 px-4">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 drop-shadow-lg">
              Our Services
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Customized fee collection and management solutions for various
              types of educational institutions worldwide
            </p>
            <div className="flex justify-center mt-8">
              <span className="inline-block w-32 h-1 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 shadow-lg"></span>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 border-0 shadow-xl rounded-3xl group relative overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2 text-white font-bold tracking-wide drop-shadow">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-orange-200 font-medium mb-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => {
                      const Icon = featureIcons[feature] || CheckCircle;
                      return (
                        <li
                          key={i}
                          className="flex items-center text-base text-orange-100 font-medium"
                        >
                          <Icon className="h-5 w-5 text-orange-400 mr-2 flex-shrink-0 drop-shadow" />
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 font-semibold text-lg py-3 rounded-xl shadow-lg"
                    onClick={() => navigate("/contact")}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Core Features Section */}
          <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/70 rounded-2xl p-12 mb-20 border border-orange-500/30 shadow-xl animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-12 text-orange-300 tracking-wide drop-shadow">
              Core Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreFeatures.map((feature, index) => {
                const Icon = coreFeatureIcons[feature] || Zap;
                return (
                  <div
                    key={index}
                    className="text-center p-6 border border-orange-500/20 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/60 hover:border-orange-400 hover:bg-orange-500/10 transition-all duration-300 group shadow-md"
                  >
                    <Icon className="h-10 w-10 text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow" />
                    <p className="text-lg font-semibold text-orange-100">
                      {feature}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-orange-600/20 rounded-2xl p-12 text-center animate-fade-in shadow-lg">
            <h2 className="text-4xl font-bold mb-4 text-orange-200 drop-shadow">
              Get the Perfect Solution for Your Institution
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Talk to our experts and discover how Lern2Pay can fulfill your
              specific requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="px-8 py-4 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 font-bold rounded-xl shadow"
                onClick={() => navigate("/contact")}
              >
                Book Free Consultation
              </Button>
              <Button className="px-8 py-4 text-lg border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10 transform hover:scale-105 transition-all duration-300 font-bold rounded-xl shadow">
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
