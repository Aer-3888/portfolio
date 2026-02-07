import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/layout/SmoothScroll";
import AboutPage from "./pages/About/AboutPage";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";

function App() {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </SmoothScroll>
  );
}

export default App;
