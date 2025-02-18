// components/FAQ.tsx
"use client"; // Ensure this directive is at the top
import React, { useState } from 'react';
import './FAQ.css'; // Import CSS for styles

import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const faqs = [
  {
    question: 'How does Scholar work?',
    answer: 'Scholar connects you with expert tutors and academic resources through our platform. You can schedule one-on-one sessions, join group studies, or access our comprehensive learning materials.',
  },
  {
    question: 'What subjects do you cover?',
    answer: 'We cover a wide range of academic subjects including Mathematics, Sciences, Languages, Humanities, and more. Our tutors are experts in their respective fields.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Our pricing varies based on the service you choose. One-on-one tutoring starts at $50/hour, while group sessions are available from $30/session. Check our Services section for detailed pricing.',
  },
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy! Simply sign up for an account, browse our services, and book your first session. Our team will match you with the perfect tutor for your needs.',
  },
  {
    question: 'What if I need to cancel a session?',
    answer: 'We understand that plans change. You can cancel or reschedule a session up to 24 hours before the scheduled time without any penalty.',
  },
  {
    question: 'Is there a satisfaction guarantee?',
    answer: 'Yes! We offer a 100% satisfaction guarantee. If you\'re not satisfied with your session, we\'ll either provide a free replacement session or refund your payment.',
  },
];

export default function FAQ() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
            }}
          >
            Find answers to common questions about our services
          </Typography>
        </Box>

        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                '&:before': {
                  display: 'none',
                },
                boxShadow: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}