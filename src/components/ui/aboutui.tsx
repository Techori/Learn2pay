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
  "bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-xl shadow-lg p-8 text-center text-white transition hover:scale-105 border border-orange-500/10";

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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 drop-shadow">
            Our Values
          </h2>
          <p className="text-xl text-gray-300">The principles that guide everything we do</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className={cardClass + " group"}>
              <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{v.title}</h3>
              <p className="text-gray-300">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 drop-shadow">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-300">The passionate people behind Learn2Pay</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className={cardClass + " group"}>
              <span className="text-6xl mb-4 block group-hover:scale-125 transition-transform duration-300">{member.image}</span>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-orange-400 font-semibold mb-2">{member.role}</p>
              <p className="text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-600 drop-shadow">
            Our Journey
          </h2>
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <button
          onClick={onStart}
          className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 rounded-xl text-white font-bold hover:from-orange-600 hover:to-orange-700 shadow-lg transition"
        >
          Get Started
        </button>
        <button
          onClick={onContact}
          className="w-full sm:w-auto border-2 border-orange-500 px-8 py-3 rounded-xl text-orange-400 font-bold hover:bg-orange-500/10 hover:text-white transition shadow"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUI;
