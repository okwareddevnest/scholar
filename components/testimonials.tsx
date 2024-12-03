import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah J.",
    avatar: "SJ",
    text: "The quality of the research paper I received was outstanding. It greatly helped me in my studies and improved my understanding of the subject.",
    university: "Harvard University",
    country: "USA",
    level: "Ph.D. Candidate"
  },
  {
    name: "Michael T.",
    avatar: "MT",
    text: "I was impressed by the depth of knowledge and the timely delivery. The tutor's expertise in statistics was evident, and it significantly boosted my project's quality.",
    university: "University of Toronto",
    country: "Canada",
    level: "Master's Student"
  },
  {
    name: "Emily R.",
    avatar: "ER",
    text: "The editing service transformed my dissertation. The attention to detail was remarkable, and it helped me refine my arguments effectively.",
    university: "University of Oxford",
    country: "UK",
    level: "Doctoral Researcher"
  },
  {
    name: "David L.",
    avatar: "DL",
    text: "ScholarStream's assistance with my complex engineering assignments was invaluable. Their explanations were clear and helped me grasp difficult concepts.",
    university: "Massachusetts Institute of Technology",
    country: "USA",
    level: "Undergraduate"
  },
  {
    name: "Sophia C.",
    avatar: "SC",
    text: "The literature review support I received was exceptional. It helped me structure my research effectively and identify key areas for further investigation.",
    university: "University of Melbourne",
    country: "Australia",
    level: "Ph.D. Student"
  },
  {
    name: "James W.",
    avatar: "JW",
    text: "As an international student, I found ScholarStream's language support incredibly helpful. It improved my academic writing skills significantly.",
    university: "University of British Columbia",
    country: "Canada",
    level: "Master's Student"
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-500">{testimonial.level}</p>
                    <p className="text-sm text-gray-500">{testimonial.university}, {testimonial.country}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

