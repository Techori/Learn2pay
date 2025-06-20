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
const PressPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-16 text-center bg-orange-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Press and Media</h1>
        <p className="text-lg mb-8">Stay updated with the latest news and updates about Learn2Pay.</p>
      </section>

      {/* Recent News Section */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Recent News</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg bg-gray-800">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Launch of EMI Payment Solution</h3>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Learn2Pay introduces a groundbreaking EMI solution for educational fee payments, simplifying processes for parents and institutions.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-gray-800">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Partnership with Leading Institutions</h3>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Collaborating with top schools and colleges to bring seamless fee management systems.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-gray-800">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Featured in Top Media Outlets</h3>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Learn2Pay has been featured in leading media outlets for its innovative approach to fee payments.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Media Contacts Section */}
      <section className="py-12 bg-gray-800 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Media Contacts</h2>
        <div className="max-w-2xl mx-auto bg-black p-6 rounded-lg shadow-lg">
          <p className="text-gray-400 mb-4">
            For press inquiries, interviews, or media kits, please reach out to our media relations team.
          </p>
          <div className="space-y-4">
            <p className="text-gray-400">
              <strong>Email:</strong> <a href="mailto:media@learn2pay.com" className="text-orange-500">media@learn2pay.com</a>
            </p>
            <p className="text-gray-400">
              <strong>Phone:</strong> +1 (800) 123-4567
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-orange-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Want to Learn More?</h2>
        <p className="mb-6">Connect with us for the latest updates and press releases.</p>
        <Button
          onClick={() => navigate('/contact')} 
          className="bg-orange-700 hover:bg-orange-500 px-6 py-3 rounded-lg"
        >
          Contact Us
        </Button>
      </section>
    </div>
  );
};

export default PressPage;
