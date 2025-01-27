import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Text Content Over Video */}
        <div className="relative w-full max-w-lg mx-auto lg:max-w-full">
          <div className="relative w-full h-0 pb-[56.25%] rounded-lg shadow-lg overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              loop
              autoPlay
              muted
              aria-label="About ScholarStream video"
            >
              <source src="/about.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 p-6 rounded-lg">
              <h2 className="text-4xl font-bold text-white mb-4">About ScholarStream</h2>
              <p className="text-lg text-white mb-4">
                ScholarStream empowers students worldwide with top-notch academic support, helping them unlock their full potential.
              </p>
              <a
                href="/signup"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 hover:bg-blue-700"
              >
                Sign Up for Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Additional Content */}
        <div className="max-w-3xl bg-white p-8 rounded-lg shadow-lg animate-fade-in">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">What Our Students Say</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <p className="italic text-gray-800">"ScholarStream helped me improve my grades significantly!"</p>
              <p className="mt-2 font-semibold text-blue-600">- Jane Doe</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <p className="italic text-gray-800">"The personalized support was exactly what I needed."</p>
              <p className="mt-2 font-semibold text-blue-600">- John Smith</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
