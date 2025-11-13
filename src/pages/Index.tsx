import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SocialSidebar />
      <Hero />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
