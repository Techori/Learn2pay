import React from 'react';

type Value = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
};

type Milestone = {
  year: string;
  event: string;
};

interface AboutUIProps {
  values: Value[];
  team: TeamMember[];
  milestones: Milestone[];
  onStart: () => void;
  onContact: () => void;
}

const cardClass =
  "bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-md p-8 text-center text-white transition hover:scale-105";

const AboutUI: React.FC<AboutUIProps> = ({
  values,
  team,
  milestones,
  onStart,
  onContact,
}) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Values Section */}
      <section className="mb-16">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-orange-400">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide everything we do</p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className={cardClass}>
              <div className="mb-4 flex justify-center">{v.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{v.title}</h3>
              <p className="text-gray-300">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-orange-400">Meet Our Team</h2>
            <p className="text-xl text-gray-300">The passionate people behind Learn2Pay</p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className={cardClass}>
              <span className="text-6xl mb-4 block">{member.image}</span>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-orange-400 font-semibold mb-2">{member.role}</p>
              <p className="text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Section */}
      <section className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-orange-400">Our Journey</h2>
            <p className="text-xl text-gray-300">Key milestones in our growth story</p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {milestones.map((m, i) => (
            <div key={i} className={cardClass + " flex flex-col items-center"}>
              <span className="font-bold text-orange-300 text-3xl mb-2">{m.year}</span>
              <span className="text-gray-300">{m.event}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="flex space-x-4 justify-center mt-8">
        <button
          onClick={onStart}
          className="bg-orange-500 px-6 py-2 rounded text-white font-bold hover:bg-orange-600 transition"
        >
          Get Started
        </button>
        <button
          onClick={onContact}
          className="border border-orange-500 px-6 py-2 rounded text-orange-500 font-bold hover:bg-orange-600 hover:text-white transition"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUI;