import React from 'react';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:to-gray-900 text-gray-900 dark:text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 dark:text-orange-400 mb-8">Cookies Policy</h1>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          This Cookies Policy explains how Larn2Pay uses cookies and similar technologies to recognize you when you visit our websites, including
          <span className="text-orange-500"> www.larn2pay.com</span>. It explains what these technologies are and why we use them, as well as your rights to control their use.
        </p>

        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">What are cookies?</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website
          owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>

        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">Why do we use cookies?</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          We use cookies for several reasons. Some cookies are required for technical reasons for our Websites to operate, and we refer to these as
          "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience
          on our Websites. Third parties serve cookies through our Websites for advertising, analytics, and other purposes.
        </p>

        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">Types of cookies we use</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-6">
          <li><strong>Essential Cookies:</strong> Necessary for the website to function.</li>
          <li><strong>Performance and Analytics Cookies:</strong> Help us understand website usage and improve user experience.</li>
          <li><strong>Advertising Cookies:</strong> Used to make advertising messages more relevant to you.</li>
        </ul>

        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">Your choices regarding cookies</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-6">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the
          Cookie Consent Manager, which can be found in the footer of our website. Essential cookies cannot be rejected as they are strictly necessary
          to provide you with services.
        </p>

        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">Contact us</h2>
        <p className="text-gray-700 dark:text-gray-400">
          If you have any questions about our use of cookies or other technologies, please email us at{' '}
          <a href="mailto:privacy@larn2pay.com" className="text-orange-500">privacy@larn2pay.com</a>.
        </p>
      </div>
    </div>
  );
};

export default CookiesPolicy;
