import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Headphones,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institute: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    setFormData({
      name: "",
      email: "",
      phone: "",
      institute: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-orange-500" />,
      title: "Email Us",
      details: "support@lern2pay.com",
      description: "Get support within 24 hours",
    },
    {
      icon: <Phone className="h-6 w-6 text-orange-500" />,
      title: "Call Us",
      details: "+91 1234 567 890",
      description: "Mon-Fri 9AM-6PM IST",
    },
    {
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      title: "Visit Us",
      details: "Mumbai, Maharashtra, India",
      description: "Schedule an appointment",
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      title: "Business Hours",
      details: "9:00 AM - 6:00 PM",
      description: "Monday to Friday",
    },
  ];

  const supportTypes = [
    {
      icon: <MessageSquare className="h-8 w-8 text-orange-500" />,
      title: "Sales Inquiry",
      description: "Learn about our fee management solutions",
    },
    {
      icon: <Headphones className="h-8 w-8 text-orange-500" />,
      title: "Technical Support",
      description: "Get help with your existing account",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Partnership",
      description: "Explore partnership opportunities",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-950 text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-12 w-12 text-orange-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto leading-relaxed">
            Have questions about our fee management solutions? We're here to
            help you transform your institution's payment process.
          </p>
          <Button
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl shadow transition"
            onClick={() => {
              const formSection = document.getElementById(
                "contact-form-section"
              );
              if (formSection) {
                formSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <ArrowRight className="w-6 h-6" />
            <span>Contact Our Team</span>
          </Button>
        </div>
      </section>

      {/* Compact Contact Form */}
      <section
        id="contact-form-section"
        className="py-8 px-2 flex justify-center items-center"
      >
        <Card className="w-full max-w-xl mx-auto bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-orange-500/20 shadow-2xl backdrop-blur-xl animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Send className="h-6 w-6 text-orange-400" />
              <CardTitle className="text-xl text-white">Contact Us</CardTitle>
            </div>
            <CardDescription className="text-gray-300">
              We usually respond within a business day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Full Name *"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                  required
                />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Email Address *"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Phone"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                />
                <Input
                  id="institute"
                  value={formData.institute}
                  onChange={(e) =>
                    handleInputChange("institute", e.target.value)
                  }
                  placeholder="Institute"
                  className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Your Message *"
                rows={4}
                className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-orange-500"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="h-5 w-5" />
              </Button>
              {submitted && (
                <div className="text-center text-green-400 font-semibold mt-2 animate-fade-in">
                  Thank you! Your message has been sent.
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Contact Info & Support Types */}
      <section className="py-10 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">{info.icon}</div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-orange-400 font-medium">
                          {info.details}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Support Types */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              How Can We Help?
            </h2>
            <div className="space-y-3">
              {supportTypes.map((type, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 hover:border-orange-500/50 hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">{type.icon}</div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {type.title}
                        </h3>
                        <p className="text-gray-300">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 px-4 bg-gradient-to-r from-orange-600/10 via-orange-500/5 to-orange-600/10">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300">
              Quick answers to common questions about our fee management system
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">
                  How secure are the payments?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We use bank-grade security with 256-bit SSL encryption and are
                  PCI DSS compliant. All transactions are processed through
                  secure payment gateways.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">
                  What payment methods do you support?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We support UPI, UPI AutoPay, credit/debit cards, net banking,
                  wallets, and NEFT/RTGS transfers for maximum convenience.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">
                  How quickly can we get started?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Setup takes just 24-48 hours after document verification. Our
                  team will help you migrate your existing student data
                  seamlessly.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">
                  Do you provide training and support?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes! We provide comprehensive training for your staff and 24/7
                  customer support to ensure smooth operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of educational institutions already using Lern2Pay
            for their fee management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="px-8 py-4 text-base bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-bold rounded-xl shadow-lg"
              onClick={() => navigate("/register")}
            >
              Register Your Institute
            </Button>
            <Button
              className="px-8 py-4 text-base border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10 font-bold rounded-xl shadow"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
