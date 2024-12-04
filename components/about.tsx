import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4 relative z-10 flex flex-wrap justify-between">
        <div className="max-w-3xl text-left bg-white p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-4xl font-bold mb-6 text-blue-600">About ScholarStream</h2>
          <p className="mb-6 text-gray-700 leading-relaxed animate-fade-in">
            ScholarStream is dedicated to empowering students worldwide with top-notch academic support.
          </p>
          <p className="mb-6 text-gray-700 leading-relaxed animate-fade-in delay-200">
            Our mission is to make quality education accessible to all, helping students achieve their academic goals and unlock their full potential.
          </p>
          <p className="text-gray-700 leading-relaxed animate-fade-in delay-400">
            Founded by a team of passionate educators and industry experts, ScholarStream combines cutting-edge technology with personalized learning approaches to deliver an unparalleled educational experience.
          </p>
        </div>
        <div className="relative max-w-md w-full mb-6"> {/* Container for the video */}
          <video className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg" loop autoPlay muted>
            <source src="/about.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white bg-black bg-opacity-50 rounded-lg">
            <p className="text-lg font-semibold animate-fade-in delay-600">
              Experience the difference that high-quality, personalized academic support can make in your educational journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;