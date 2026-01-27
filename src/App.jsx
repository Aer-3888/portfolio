import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/About/AboutPage";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
