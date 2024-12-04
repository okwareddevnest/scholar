import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="relative h-screen bg-gray-50"> {/* Set height to full viewport */}
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/9198351-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above the video */}
        <h2 className="text-3xl font-bold text-center mb-12 text-white">About ScholarStream</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-6 text-white">
            ScholarStream is dedicated to empowering students worldwide with top-notch academic support. Our mission is to make quality education accessible to all, helping students achieve their academic goals and unlock their full potential.
          </p>
          <p className="text-white">
            Founded by a team of passionate educators and industry experts, ScholarStream combines cutting-edge technology with personalized learning approaches to deliver an unparalleled educational experience.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;