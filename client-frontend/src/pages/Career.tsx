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

const CarrerPage = () => {
  const navigate = useNavigate();
return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="py-16 text-center bg-orange-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg mb-8">Be a part of the Larn2Pay family and help revolutionize fee payments.</p>
      </section>

      {/* Open Positions Section */}
      <section className="py-12 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">Current Openings</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Software Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 dark:text-gray-400">
                Build and maintain our cutting-edge payment platform. Experience in React and Node.js required.
              </CardDescription>
               <button
      onClick={() => navigate('/Applynow')}
      className="mt-4 bg-orange-700 hover:bg-orange-500 w-full text-white dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-gray-900"
    >
      Apply Now
    </button>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Marketing Specialist</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 dark:text-gray-400">
                Drive our marketing campaigns and help expand our brand reach. Digital marketing experience preferred.
              </CardDescription>
              <button
      onClick={() => navigate('/Applynow')}
      className="mt-4 bg-orange-700 hover:bg-orange-500 w-full text-white dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-gray-900"
    >
      Apply Now
    </button>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Customer Support Executive</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 dark:text-gray-400">
                Assist our customers and ensure a smooth user experience. Strong communication skills required.
              </CardDescription>
              <button
      onClick={() => navigate('/Applynow')}
      className="mt-4 bg-orange-700 hover:bg-orange-500 w-full text-white dark:bg-orange-400 dark:hover:bg-orange-500 dark:text-gray-900"
    >
      Apply Now
    </button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">Why Join Larn2Pay?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <CardContent>
              <CardTitle className="text-gray-900 dark:text-white">Innovative Environment</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-400">
                Work with a team of passionate individuals striving to create innovative solutions for education.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <CardContent>
              <CardTitle className="text-gray-900 dark:text-white">Career Growth</CardTitle>
              <CardDescription className="text-gray-700 dark:text-gray-400">
                We invest in your growth with regular training sessions, mentorship, and career development opportunities.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-orange-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="mb-6">Join us in revolutionizing fee payments and empowering education.</p>
      </section>
    </div>
  );
};

export default CarrerPage;
