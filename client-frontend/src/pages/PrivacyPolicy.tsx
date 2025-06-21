import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom'; 
import footer from '../components/Footer';
const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-16 text-center bg-orange-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-lg mb-8">Your privacy is important to us. Learn how we handle your data.</p>
      </section>

      {/* Policy Details Section */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Our Commitment</h2>
        <div className="max-w-3xl mx-auto text-gray-400">
          <p className="mb-4">
            At Learn2Pay, we are committed to protecting your personal information and ensuring your experience with us is safe and secure.
          </p>
          <p className="mb-4">
            This Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>
        </div>
      </section>

      {/* Key Sections */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Key Points</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-orange-500 mb-4">Data Collection</h3>
            <p className="text-gray-400">
              We collect information to provide better services, including data you provide and data collected automatically.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-orange-500 mb-4">Data Usage</h3>
            <p className="text-gray-400">
              Your information is used to enhance our services, ensure security, and deliver personalized experiences.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-orange-500 mb-4">Data Protection</h3>
            <p className="text-gray-400">
              We implement robust measures to protect your information from unauthorized access and misuse.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-800 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Contact Us</h2>
        <div className="max-w-2xl mx-auto text-gray-400">
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please reach out to us.
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:privacy@learn2pay.com" className="text-orange-500">privacy@learn2pay.com</a>
          </p>
          <p>
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
