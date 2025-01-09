import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="max-w-3xl text-left bg-white p-8 rounded-lg shadow-lg mb-6 animate-fade-in">
          <h2 className="text-4xl font-bold mb-6 text-blue-600">About ScholarStream</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            ScholarStream is dedicated to empowering students worldwide with top-notch academic support.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Our mission is to make quality education accessible to all, helping students achieve their academic goals and unlock their full potential.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Founded by a team of passionate educators and industry experts, we strive to provide personalized assistance tailored to each student's needs.
          </p>
          
          {/* Testimonials Section */}
          <h3 className="text-2xl font-semibold mt-8">What Our Students Say</h3>
          <div className="mt-4">
            <p className="italic">"ScholarStream helped me improve my grades significantly!" - Jane Doe</p>
            <p className="italic">"The personalized support was exactly what I needed." - John Smith</p>
          </div>

          {/* Call to Action */}
          <div className="mt-6">
            <a href="/signup" className="inline-block bg-blue-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
              Sign Up for Our Services
            </a>
          </div>
        </div>
        
        <div className="relative max-w-md w-full mb-6">
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
};

export default About;