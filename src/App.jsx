import { Routes, Route, Navigate, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "./components/layout/SmoothScroll";
import LangLayout from "./components/layout/LangLayout";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import PhotoPage from "./pages/Gallery/PhotoPage";

function PageRoutes() {
  return (
    <>
      <Route index element={<HomePage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="projects/:id" element={<ProjectsPage />} />
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="gallery/:slug" element={<PhotoPage />} />
    </>
  );
}

/**
 * What counts as "a different page" for transition purposes.
 *
 * The language prefix is dropped so switching between / and /fr swaps copy in
 * place instead of replaying a full page transition. Project deep links
 * collapse onto /projects because the gallery drives selection from state, not
 * navigation, so /projects/:id is the same page arrived at by a shared URL.
 *
 * /gallery/:slug deliberately does NOT collapse the same way. The projects case
 * works because the detail is a modal over the page that is already mounted. A
 * photo is its own page, so collapsing it would stop AnimatePresence swapping
 * GalleryPage for PhotoPage and leave the wrong component on screen.
 */
function routeKey(pathname) {
  const withoutLang = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";

  return withoutLang.replace(/^\/projects\/.+/, "/projects");
}

function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      {/*
        `initial` is deliberately left on. Setting it to false suppresses the
        initial state of every motion descendant on first load, which silently
        flattens all the whileInView scroll reveals down the page. They have no
        animate state to fall back on, so they simply render already revealed.
        The cost of leaving it on is that the first paint runs PageTransition's
        own fade, which is the page level entrance anyway.
      */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={routeKey(location.pathname)}>
          <Route path="/" element={<LangLayout />}>
            {PageRoutes()}
          </Route>
          <Route path="/fr" element={<LangLayout />}>
            {PageRoutes()}
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  );
}

export default App;
