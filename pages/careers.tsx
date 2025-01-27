import React from 'react';

const Careers = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Careers at AcademicWrite</h1>
      <p className="mb-4 text-center">Join our team and help students achieve their academic goals! We are always looking for talented individuals to join our growing company.</p>
      <h2 className="text-2xl font-semibold mb-2">Current Openings</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">Content Writer</li>
        <li className="mb-2">Customer Support Specialist</li>
        <li className="mb-2">Marketing Coordinator</li>
      </ul>
      <p className="mb-4 text-center">If you are interested in any of the positions listed above, please send your resume and cover letter to <a href="mailto:support@academicwrite.com" className="text-blue-500">support@academicwrite.com</a>.</p>
      <h2 className="text-2xl font-semibold mb-2">Why Work With Us?</h2>
      <p className="mb-4">At AcademicWrite, we value creativity, collaboration, and a passion for helping students succeed. We offer competitive salaries, flexible working hours, and opportunities for professional growth.</p>
      <div className="text-center mt-5">
        <a href="mailto:discounthomeworkhelper@gmail.com">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Apply Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default Careers;
