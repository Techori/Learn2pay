mport "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Institute from "./pages/dashboards/instiute";
import Parent from "./pages/dashboards/parent";
import Referral from "./pages/dashboards/referral";
import Login from "./pages/login";
import Register from "./pages/register";
import Services from "./pages/services";
import Contact from "./pages/contact"; // Add this import
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/institute" element={<Institute />} />
        <Route path="/parent" element={<Parent />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} /> {/* Add this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
