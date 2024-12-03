"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Here you would typically send the form data to your server
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
    setIsSubmitting(false);
    toast({
      title: "Form submitted!",
      description: "We'll get back to you soon.",
      message: "Form submitted!",
      type: "success",
      onDismiss: () => console.log("Toast dismissed"),
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Textarea placeholder="Your Message" required />
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