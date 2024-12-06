"use client";

import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah J.",
    avatar: "/avatars/sarah.jpg",
    text: "ScholarStream's research paper assistance was outstanding. It greatly improved my understanding of the subject.",
    university: "Harvard University",
    country: "USA",
    level: "Ph.D. Candidate"
  },
  {
    name: "Michael T.",
    avatar: "/avatars/michael.jpg",
    text: "The depth of knowledge and timely delivery impressed me. Their expertise in statistics significantly boosted my project's quality.",
    university: "University of Toronto",
    country: "Canada",
    level: "Master's Student"
  },
  {
    name: "Emily R.",
    avatar: "/avatars/emily.jpg",
    text: "ScholarStream's editing service transformed my dissertation. Their attention to detail helped refine my arguments effectively.",
    university: "University of Oxford",
    country: "UK",
    level: "Doctoral Researcher"
  },
  {
    name: "David L.",
    avatar: "/avatars/david.jpg",
    text: "The assistance with complex engineering assignments was invaluable. Clear explanations helped me grasp difficult concepts.",
    university: "Massachusetts Institute of Technology",
    country: "USA",
    level: "Undergraduate"
  },
  {
    name: "Sophia C.",
    avatar: "/avatars/sophia.jpg",
    text: "The literature review support was exceptional. It helped me structure my research effectively and identify key areas for investigation.",
    university: "University of Melbourne",
    country: "Australia",
    level: "Ph.D. Student"
  },
  {
    name: "James W.",
    avatar: "/avatars/james.jpg",
    text: "As an international student, ScholarStream's language support improved my academic writing skills significantly.",
    university: "University of British Columbia",
    country: "Canada",
    level: "Master's Student"
  },
  {
    name: "Olivia K.",
    avatar: "/avatars/olivia.jpg",
    text: "The personalized study plan they created for me was a game-changer. My grades have improved dramatically.",
    university: "Stanford University",
    country: "USA",
    level: "Undergraduate"
  },
  {
    name: "Liam P.",
    avatar: "/avatars/liam.jpg",
    text: "Their math tutoring sessions helped me overcome my fear of calculus. I now feel confident tackling complex problems.",
    university: "ETH Zurich",
    country: "Switzerland",
    level: "Master's Student"
  },
  {
    name: "Ava M.",
    avatar: "/avatars/ava.jpg",
    text: "ScholarStream's guidance on my thesis was invaluable. Their insights helped shape my research in meaningful ways.",
    university: "London School of Economics",
    country: "UK",
    level: "Ph.D. Candidate"
  },
  {
    name: "Noah C.",
    avatar: "/avatars/noah.jpg",
    text: "The coding tutorials were clear and practical. I was able to complete my computer science project ahead of schedule.",
    university: "University of California, Berkeley",
    country: "USA",
    level: "Undergraduate"
  }
];

export default function Testimonials() {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll1 = scrollRef1.current;
    const scroll2 = scrollRef2.current;
    if (scroll1 && scroll2) {
      const scrollWidth1 = scroll1.scrollWidth / 2;
      const scrollWidth2 = scroll2.scrollWidth / 2;
      const animationDuration1 = scrollWidth1 / 30;
      const animationDuration2 = scrollWidth2 / 25; // Slightly different speed for variety

      scroll1.style.setProperty('--scroll-width', `${scrollWidth1}px`);
      scroll1.style.setProperty('--animation-duration', `${animationDuration1}s`);
      scroll2.style.setProperty('--scroll-width', `${scrollWidth2}px`);
      scroll2.style.setProperty('--animation-duration', `${animationDuration2}s`);
    }
  }, []);

  const renderTestimonials = (start: number, end: number) => (
    <>
      {testimonials.slice(start, end).map((testimonial, index) => (
        <Card key={index} className="flex-shrink-0 w-[300px] mx-2 my-4">
          <CardHeader className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.university}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic">&ldquo;{testimonial.text}&rdquo;</p>
            <p className="text-xs text-gray-500 mt-2">{testimonial.level} - {testimonial.country}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );

  return (
    <section id="testimonials" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        <div className="relative">
          <div 
            ref={scrollRef1}
            className="flex space-x-4 overflow-hidden mb-8"
            style={{
              width: '200%',
              display: 'flex',
            }}
          >
            <div className="flex space-x-4 animate-scroll">
              {renderTestimonials(0, 5)}
            </div>
            <div className="flex space-x-4 animate-scroll" aria-hidden="true">
              {renderTestimonials(0, 5)}
            </div>
          </div>
          <div 
            ref={scrollRef2}
            className="flex space-x-4 overflow-hidden"
            style={{
              width: '200%',
              display: 'flex',
            }}
          >
            <div className="flex space-x-4 animate-scroll-reverse">
              {renderTestimonials(5, 10)}
            </div>
            <div className="flex space-x-4 animate-scroll-reverse" aria-hidden="true">
              {renderTestimonials(5, 10)}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse var(--animation-duration) linear infinite;
        }
      `}</style>
    </section>
  );
}