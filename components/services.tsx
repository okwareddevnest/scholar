"use client";

import { useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenLine, BookOpen, GraduationCap, Sparkles, Calculator, Globe, BarChart, Code, BookOpenCheck, FileSearch, Microscope, Lightbulb } from 'lucide-react';

const services = [
  {
    title: "Essay Writing",
    description: "Custom essays tailored to your specific requirements and academic level.",
    icon: PenLine,
    badge: "Popular"
  },
  {
    title: "Research Papers",
    description: "In-depth research papers on various topics with proper citations and references.",
    icon: BookOpen
  },
  {
    title: "Thesis & Dissertations",
    description: "Comprehensive support for your thesis or dissertation project.",
    icon: GraduationCap
  },
  {
    title: "Editing & Proofreading",
    description: "Polishing your academic work to ensure clarity, coherence, and correctness.",
    icon: Sparkles
  },
  {
    title: "Math Problem Solving",
    description: "Step-by-step solutions for complex mathematical problems.",
    icon: Calculator
  },
  {
    title: "Language Learning Support",
    description: "Assistance with language assignments and translations.",
    icon: Globe
  },
  {
    title: "Statistics & Data Analysis",
    description: "Expert help with statistical analysis and data interpretation.",
    icon: BarChart
  },
  {
    title: "Programming Assignments",
    description: "Coding help and explanations for various programming languages.",
    icon: Code
  },
  {
    title: "Literature Reviews",
    description: "Comprehensive literature reviews for research projects.",
    icon: BookOpenCheck
  },
  {
    title: "Case Studies",
    description: "In-depth analysis and writing of business and academic case studies.",
    icon: FileSearch
  },
  {
    title: "Lab Reports",
    description: "Detailed and accurate lab reports for science courses.",
    icon: Microscope
  },
  {
    title: "Creative Writing",
    description: "Assistance with creative writing projects and storytelling.",
    icon: Lightbulb
  }
];

export default function Services() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth / 2;
      const animationDuration = scrollWidth / 10; // Adjust speed here (higher number = slower)

      scrollContainer.style.setProperty('--scroll-width', `${scrollWidth}px`);
      scrollContainer.style.setProperty('--animation-duration', `${animationDuration}s`);
    }
  }, []);

  return (
    <section id="services" className="py-20 bg-purple-50 overflow-hidden" aria-labelledby="services-title">
      <div className="container mx-auto px-4">
        <h2 id="services-title" className="text-3xl font-bold text-center mb-12 text-purple-800">Our Services</h2>
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-hidden"
            style={{
              width: '200%',
              display: 'flex',
            }}
          >
            <div className="flex space-x-4 animate-scroll">
              {services.map((service, index) => (
                <Card key={index} className="flex-shrink-0 w-[300px] relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                      <service.icon className="h-8 w-8 text-purple-500" aria-hidden="true" />
                      {service.badge && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-purple-800">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-700">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex space-x-4 animate-scroll" aria-hidden="true">
              {services.map((service, index) => (
                <Card key={index} className="flex-shrink-0 w-[300px] relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                      <service.icon className="h-8 w-8 text-purple-500" aria-hidden="true" />
                      {service.badge && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-purple-800">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-700">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 h-full w-1/12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" aria-hidden="true"></div>
          <div className="absolute top-0 right-0 h-full w-1/12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" aria-hidden="true"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }
      `}</style>
    </section>
  );
}