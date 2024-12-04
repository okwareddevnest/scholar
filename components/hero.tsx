import { Button } from "@/components/ui/button";
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 md:py-40 h-screen text-center text-white overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        aria-label="Background video showcasing academic support"
      >
        <source src="/videos/9198351-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Removed overlay to ensure no color on the background */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-white opacity-70 z-10"></div> */}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col justify-center h-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Empower Your Academic Journey with ScholarStream
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          From essays to dissertations, math problems to coding challenges - we&apos;re your all-in-one academic support system. Let our expert tutors guide you towards academic excellence.
        </p>
        <div className="flex justify-center"> {/* Centering the button */}
          <Button asChild size="default" className="bg-blue-600 hover:bg-blue-700">
            <Link href="#contact" className="text-white">Start Excelling Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;