import { CheckCircle } from 'lucide-react'

const features = [
  "100% Original Content",
  "Expert Writers with Advanced Degrees",
  "On-time Delivery",
  "24/7 Customer Support",
  "Unlimited Revisions",
  "Strict Confidentiality"
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

