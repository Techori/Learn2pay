import React, { useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
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

const BlogPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="py-16 text-center bg-orange-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Simplifying Fee Payments, One EMI at a Time</h1>
        <p className="text-lg mb-8">Helping parents and institutions with seamless fee management.</p>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 px-4 md:px-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">Benefits</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg bg-white dark:bg-black text-gray-900 dark:text-white">
            <CardContent>
              <CardTitle className="text-orange-600 dark:text-orange-400">For Parents</CardTitle>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-400">
                <li>Reduced financial stress during fee deadlines.</li>
                <li>Flexible monthly repayment options.</li>
                <li>Transparent EMI terms.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-lg bg-white dark:bg-black text-gray-900 dark:text-white">
            <CardContent>
              <CardTitle className="text-orange-600 dark:text-orange-400">For Institutions</CardTitle>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-400">
                <li>Guaranteed timely fee payments.</li>
                <li>Streamlined financial operations.</li>
                <li>Reduced administrative workload.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-orange-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        
        <p className="mb-6">Join thousands of parents and institutions simplifying fee payments.</p>
       <Button
                    className="px-8 py-4 text-base bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-bold rounded-xl shadow-lg"
                    onClick={() => navigate("/register")}
                  >
                    Get started
                  </Button>
      </section>
    </div>
  );
};

export default BlogPage;
