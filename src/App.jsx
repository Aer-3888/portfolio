import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./components/Hero";
import ProjectList from "./components/home/ProjectList";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/layout/SmoothScroll"; 

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
          <ProjectList />

          <div className="w-full h-[20vh] bg-neutral-900 border-t border-neutral-800" />
          
        </motion.main>
      </SmoothScroll>

      <Footer />

    </div>
  );
}

export default App;