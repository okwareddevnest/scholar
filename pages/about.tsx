import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5 text-center">About Scholarstream</h1>
      <p className="mb-4 text-center text-lg">At Scholarstream, we are dedicated to providing high-quality academic writing services to students around the world. Our mission is to help students achieve their academic goals by offering expert assistance in their writing projects.</p>
      
      <h2 className="text-3xl font-semibold mb-2">Our Vision</h2>
      <p className="mb-4">To be the leading provider of academic writing services, empowering students to excel in their studies and achieve their dreams.</p>
      
      <h2 className="text-3xl font-semibold mb-2">Our Values</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">Integrity: We uphold the highest standards of honesty and transparency.</li>
        <li className="mb-2">Quality: We are committed to delivering exceptional work that meets our clients' needs.</li>
        <li className="mb-2">Customer Satisfaction: We prioritize our clients and strive to exceed their expectations.</li>
      </ul>
      
      <h2 className="text-3xl font-semibold mb-2">Our Team</h2>
      <p className="mb-4">Our team consists of experienced writers, editors, and researchers who are passionate about education and committed to delivering exceptional work. We understand the challenges students face and strive to provide personalized support tailored to each individual's needs.</p>
      
      <h2 className="text-3xl font-semibold mb-2">Testimonials</h2>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4">
        "Scholarstream helped me improve my grades significantly! Their writers are knowledgeable and professional." - Jane D.
      </blockquote>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4">
        "I was struggling with my thesis, but the support I received from Scholarstream was invaluable." - Mark T.
      </blockquote>
      
      <h2 className="text-3xl font-semibold mb-2">Our Services</h2>
      <p className="mb-4">We offer a wide range of services, including essay writing, research papers, dissertations, and more. Our goal is to ensure that every student receives the assistance they need to succeed in their studies.</p>
      
      <h2 className="text-3xl font-semibold mb-2">Why Choose Us?</h2>
      <p className="mb-4">Choosing Scholarstream means choosing quality, reliability, and professionalism. We are committed to maintaining the highest standards in our work and ensuring customer satisfaction.</p>
      
      <p className="mb-4 text-center">If you have any questions or would like to learn more about our services, please feel free to contact us at <a href="mailto:support@academicwrite.com" className="text-blue-500">support@academicwrite.com</a>.</p>
    </div>
  );
};

export default About;
