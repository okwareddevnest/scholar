import { CheckCircle } from 'lucide-react';

const solutionsList = [
  "Customized study plans",
  "One-on-one tutoring sessions",
  "Comprehensive study materials",
  "Practice tests and quizzes",
  "Writing assistance and feedback",
  "Research guidance"
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionsList.map((solution, index) => (
            <div key={index} className="flex items-center p-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300 ease-in-out">
              <CheckCircle className="flex-shrink-0 h-6 w-6 mr-4" />
              <span className="text-lg font-medium">{solution}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}