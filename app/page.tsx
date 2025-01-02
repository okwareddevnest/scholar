import Navbar from '../components/navbar'; // Import the Navbar component
import Hero from '../components/hero'; // Adjusted path
import About from '../components/about'; // Adjusted path
import Services from '../components/services'; // Adjusted path
import Solutions from '../components/solutions'; // Corrected path
import Features from '../components/features'; // Adjusted path
import Testimonials from '../components/testimonials'; // Adjusted path
import ContactForm from '../components/contact-form'; // Adjusted path
import Footer from '../components/footer'; // Adjusted path
import Link from 'next/link'; // Import Link from next/link
import FAQ from '../components/FAQ'; // Import the FAQ component
import Chatbot from '../components/chatbot'; // Import the Chatbot component

// Define the Home component
const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Include the Navbar at the top of the page */}
      <main className="flex-grow">
        <Hero />
        <About /> {/* Add the About component here */}
        <Services />
        <Solutions /> {/* Include the Solutions component */}
        <Features />
        <Testimonials />
        <ContactForm />
        <Link href="/feedback">Go to Feedback</Link> {/* Add link to Feedback page */}
        <FAQ /> {/* Add the FAQ component here */}
      </main>
      <Footer />
      <Chatbot /> {/* Add the Chatbot component here */}
    </div>
  );
}

export default Home;