import { Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
