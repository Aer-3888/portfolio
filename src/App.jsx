import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./pages/home/Hero/Hero";
import ProjectList from "./pages/home/Projects/ProjectList";
import Footer from "./pages/home/Footer/Footer";
import SmoothScroll from "./layout/SmoothScroll"; 
import HobbySection from "./pages/home/Profile/HobbySection";

function App() {
  const { scrollYProgress } = useScroll();

  const curve = useTransform(scrollYProgress, [0.85, 1], ["50% 50px", "0% 0px"]);

  return (
    <div className="relative bg-neutral-900">
      
      <SmoothScroll>
        <motion.main 
          style={{ 
              borderBottomLeftRadius: curve, 
              borderBottomRightRadius: curve 
          }}
          className="relative z-10 bg-neutral-900 shadow-2xl mb-[100vh] overflow-hidden"
        >
          <Hero />
          <HobbySection />
          <ProjectList />

          <div className="w-full h-[20vh] bg-neutral-900 border-t border-neutral-800" />
          
        </motion.main>
      </SmoothScroll>

      <Footer />

    </div>
  );
}

export default App;