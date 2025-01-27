import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of academic writing services do you offer?",
      answer: "We offer a variety of academic writing services, including essays, research papers, dissertations, and more."
    },
    {
      question: "How do I place an order?",
      answer: "You can place an order by filling out the order form on our website, specifying your requirements and deadline."
    },
    {
      question: "What is your revision policy?",
      answer: "We offer free revisions within a certain timeframe after the order is completed. Please refer to our revision policy for more details."
    },
    {
      question: "How do you ensure the quality of your writers?",
      answer: "We have a rigorous selection process for our writers, ensuring they have the necessary qualifications and experience in their respective fields."
    },
    {
      question: "Is my personal information kept confidential?",
      answer: "Yes, we take your privacy seriously and ensure that all personal information is kept confidential and secure."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span>{openIndex === index ? '-' : '+'}</span>
          </div>
          {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
