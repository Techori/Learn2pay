import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Teams = () => {
  const teamMembers = [
    {
      name: 'Akshat Dubey',
      position: 'Project manager',
      Email : 'akshatdubey1020@gmail.com',
    },
    {
     name: 'Brijesh Singh',
      position: 'Project manager',
      Email : 'akshatdubey1020@gmail.com',
    },
    {
      name: 'Priyanshi Mishra',
      position: 'Frontend Developer',
      Email : 'priyanshi.mishra1974@gmail.com',
    },
     {
      name: 'Amrishra Singh ',
      position: 'Frontend Developer',
      Email : 'amrisharajput99@gmail.com ',
    },
      {
      name: 'Harshit Agarwal', 
      position: 'Frontend Developer',
      Email : 'harshit.23171@gmail.com',
    },
      {
      name: 'Pratik Pandey ',
      position: 'Payment gateway integration',
      Email : 'pratikpandey9691@gmail.com',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Our Team</h1>
        <p className="text-lg text-gray-400 text-center mb-12">
          Meet the talented individuals driving the success of Learn2Pay.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-gray-800 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-orange-500">{member.name}</CardTitle>
                <p className="text-sm text-gray-400">{member.position}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{member.Email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
