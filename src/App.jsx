import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SmoothScroll from "./components/layout/SmoothScroll";
import LangLayout from "./components/layout/LangLayout";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const ProjectsPage = lazy(() => import("./pages/Projects/ProjectsPage"));

function PageRoutes() {
  return (
    <>
      <Route index element={<HomePage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="projects/:id" element={<ProjectsPage />} />
    </>
  );
}

function App() {
  return (
    <SmoothScroll>
      <Suspense fallback={<div className="min-h-screen bg-neutral-900" />}>
        <Routes>
          <Route path="/" element={<LangLayout />}>
            {PageRoutes()}
          </Route>
          <Route path="/fr" element={<LangLayout />}>
            {PageRoutes()}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </SmoothScroll>
  );
}

export default App;
