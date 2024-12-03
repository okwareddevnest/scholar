import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative py-40 h-screen text-center text-white overflow-hidden"> {/* Increased padding and set height */}
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/Faiz.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Empower Your Academic Journey with ScholarStream</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          From essays to dissertations, math problems to coding challenges - we&apos;re your all-in-one academic support system. Let our expert tutors guide you towards academic excellence.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="#contact">Start Excelling Today</Link>
        </Button>
      </div>
    </section>
  );
}