"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Assume submission logic here
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        {submitted && (
          <p 
            style={{
              opacity: 1,
              transition: 'opacity 0.5s ease-in',
              animation: 'fadeIn 0.5s forwards',
              color: 'green', 
              marginBottom: '16px'
            }}
          >
            Thank you for your message!
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-4">
            <Input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-4">
            <Textarea 
              name="message" 
              placeholder="Your Message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
        <p>Email: discounthomeworkhelper@gmail.com</p>
        <p>Phone: +92 340 1258059</p>
        <p>Follow us on social media!</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">We are here to help you!</p>
        </div>
      </div>
    </div>
  );
}