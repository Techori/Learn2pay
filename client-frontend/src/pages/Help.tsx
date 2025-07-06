import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calculator, CheckCircle, Users, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpCenterPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="py-16 text-center bg-orange-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Help Center</h1>
        <p className="text-lg mb-8">Find answers to your questions and get the support you need.</p>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">What is Larn2Pay?</h3>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              Larn2Pay is a digital platform simplifying fee payments for educational institutions and parents by offering EMI solutions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">How can I register as a parent or an institution?</h3>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              Registration is simple. Visit our Registration page and select your category to fill out the necessary details.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">What are the EMI terms?</h3>
            <p className="text-gray-700 dark:text-gray-400 mt-2">
              EMI terms are flexible and transparent. Calculate your EMI using our EMI Calculator available on the website.
            </p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">Need More Help?</h2>
        <div className="max-w-2xl mx-auto bg-white dark:bg-black p-6 rounded-lg shadow-lg">
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Contact our support team for further assistance.
          </p>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-400">
              <strong>Email:</strong> <a href="mailto:support@larn2pay.com" className="text-orange-600 dark:text-orange-400">support@larn2pay.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-orange-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="mb-6">Reach out to us for personalized support.</p>
        <Button
          onClick={() => navigate('/contact')}
          className="bg-orange-700 hover:bg-orange-500 px-6 py-3 rounded-lg dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-gray-900"
        >
          Contact Us
        </Button>
      </section>
    </div>
  );
};

export default HelpCenterPage;
