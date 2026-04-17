import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/layout/SmoothScroll";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const ProjectsPage = lazy(() => import("./pages/Projects/ProjectsPage"));

function App() {
  return (
    <SmoothScroll>
      <Suspense fallback={<div className="min-h-screen bg-neutral-900" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Suspense>
    </SmoothScroll>
  );
}

export default App;
