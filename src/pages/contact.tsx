
import React, { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Users,
  Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTA from '../components/CTA';

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institute: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      institute: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-orange-500" />,
      title: "Email Us",
      details: "support@lern2pay.com",
      description: "Get support within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6 text-orange-500" />,
      title: "Call Us",
      details: "+91 1234 567 890",
      description: "Mon-Fri 9AM-6PM IST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-orange-500" />,
      title: "Visit Us",
      details: "Mumbai, Maharashtra, India",
      description: "Schedule an appointment"
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      title: "Business Hours",
      details: "9:00 AM - 6:00 PM",
      description: "Monday to Friday"
    }
  ];

  const supportTypes = [
    {
      icon: <MessageSquare className="h-8 w-8 text-orange-500" />,
      title: "Sales Inquiry",
      description: "Learn about our fee management solutions"
    },
    {
      icon: <Headphones className="h-8 w-8 text-orange-500" />,
      title: "Technical Support",
      description: "Get help with your existing account"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Partnership",
      description: "Explore partnership opportunities"
    }
  ];
 
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header /> */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have questions about our fee management solutions? We're here to help you transform 
            your institution's payment process.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
                <CardDescription className="text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-white">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 9876543210"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="institute" className="text-white">Institute Name</Label>
                      <Input
                        id="institute"
                        value={formData.institute}
                        onChange={(e) => handleInputChange('institute', e.target.value)}
                        placeholder="Your institute name"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)} required>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">{info.icon}</div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                            <p className="text-orange-400 font-medium">{info.details}</p>
                            <p className="text-gray-400 text-sm">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">How Can We Help?</h2>
                <div className="space-y-4">
                  {supportTypes.map((type, index) => (
                    <Card key={index} className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">{type.icon}</div>
                          <div>
                            <h3 className="font-semibold text-white mb-1">{type.title}</h3>
                            <p className="text-gray-300">{type.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600/10 via-orange-500/5 to-orange-600/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Quick answers to common questions about our fee management system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">How secure are the payments?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We use bank-grade security with 256-bit SSL encryption and are PCI DSS compliant. 
                  All transactions are processed through secure payment gateways.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">What payment methods do you support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We support UPI, UPI AutoPay, credit/debit cards, net banking, wallets, 
                  and NEFT/RTGS transfers for maximum convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">How quickly can we get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Setup takes just 24-48 hours after document verification. 
                  Our team will help you migrate your existing student data seamlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-white">Do you provide training and support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes! We provide comprehensive training for your staff and 24/7 customer support 
                  to ensure smooth operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of educational institutions already using Lern2Pay for their fee management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" 
              onClick={() => navigate('/register-institute')}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg border-orange-500 text-orange-400 hover:bg-orange-500/10"
              onClick={() => navigate('/auth')}
            >
              Login to Dashboard
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
