import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import footer from '../components/Footer';
const TermsOfService = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-16 text-center bg-orange-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-lg mb-8">Understand our terms and conditions for using Learn2Pay services.</p>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Introduction</h2>
        <p className="text-gray-300 mb-6">
          Welcome to Learn2Pay. By accessing and using our services, you agree to the following terms and conditions.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-orange-500">Usage of Services</h2>
        <p className="text-gray-300 mb-6">
          Our platform is designed to simplify fee payment processes. Any misuse of our services is strictly prohibited.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-orange-500">User Responsibilities</h2>
        <ul className="list-disc ml-6 text-gray-300 mb-6">
          <li>Provide accurate and up-to-date information during registration.</li>
          <li>Ensure timely payment of EMIs.</li>
          <li>Abide by all applicable laws and regulations.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-6 text-orange-500">Privacy Policy</h2>
        <p className="text-gray-300 mb-6">
          Please refer to our <a href="/privacy" className="text-orange-500">Privacy Policy</a> for details on how we handle your data.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-orange-500">Termination of Services</h2>
        <p className="text-gray-300 mb-6">
          We reserve the right to suspend or terminate accounts in case of violations of our terms.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-orange-500">Limitation of Liability</h2>
        <p className="text-gray-300 mb-6">
          Learn2Pay shall not be held liable for any indirect or consequential damages arising from the use of our services.
        </p>

        <h2 className="text-2xl font-bold mb-6 text-orange-500">Governing Law</h2>
        <p className="text-gray-300 mb-6">
          These terms are governed by the laws of the jurisdiction where Learn2Pay operates.
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-orange-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
        <p className="mb-6">Contact us for further details or queries about our terms of service.</p>
        <button className="bg-orange-700 hover:bg-orange-500 px-6 py-3 rounded-lg">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default TermsOfService;
