import { CheckCircle } from 'lucide-react';

const features = [
  "100% Original Content",
  "Expert Writers with Advanced Degrees",
  "On-time Delivery",
  "24/7 Customer Support",
  "Unlimited Revisions",
  "Strict Confidentiality"
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 bg-gray-50">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        aria-label="Background video showcasing features"
      >
        <source src="/videos/istockphoto-857194046-640_adpp_is.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <CheckCircle className="text-green-500 h-8 w-8" />
              <span className="text-lg font-medium text-gray-800">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}