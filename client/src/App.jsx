import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import About from './sections/About';
import Contact from './sections/Contact';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Work from './sections/Work';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
