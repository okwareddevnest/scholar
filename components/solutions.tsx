import Image from "next/image";
import { CheckCircle } from "lucide-react";
import imageSrc from "../public/images/5.jpg"; // Adjust the path as necessary

const solutionsList: string[] = [
  "Customized study plans",
  "One-on-one tutoring sessions",
  "Comprehensive study materials",
  "Practice tests and quizzes",
  "Writing assistance and feedback",
  "Research guidance",
];

const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Solutions Text and List */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center md:text-left">
            Our Solutions
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center md:text-left">
            Explore a wide range of tailored services designed to enhance your academic success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutionsList.map((solution, index) => (
              <div
                key={index}
                className="flex items-center p-6 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <div className="flex-shrink-0 bg-white rounded-full p-2">
                  <CheckCircle className="h-6 w-6 text-teal-500" />
                </div>
                <span className="ml-4 text-white font-medium text-lg">{solution}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={imageSrc} // Use the imported image source
            alt="Students engaging with solutions"
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default Solutions;
