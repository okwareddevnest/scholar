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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally handle success (e.g., show a success message)
      alert('Message sent successfully!');
    } catch (error) {
      alert('There was an error sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <Input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            required 
            value={formData.name} 
            onChange={handleChange} 
          />
          <Input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            required 
            value={formData.email} 
            onChange={handleChange} 
          />
          <Textarea 
            name="message" 
            placeholder="Your Message" 
            required 
            value={formData.message} 
            onChange={handleChange} 
          />
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md transition duration-200" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </section>
  );
}