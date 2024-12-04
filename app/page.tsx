import Navbar from '../components/navbar'; // Import the Navbar component
import Hero from '../components/hero'; // Adjusted path
import About from '../components/about'; // Adjusted path
import Services from '../components/services'; // Adjusted path
import Solutions from '../components/solutions'; // Corrected path
import Features from '../components/features'; // Adjusted path
import Testimonials from '../components/testimonials'; // Adjusted path
import ContactForm from '../components/contact-form'; // Adjusted path
import Footer from '../components/footer'; // Adjusted path

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
      </main>
      <Footer />
    </div>
  );
}

export default Home;