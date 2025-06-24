import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Services from "./pages/services";
import Contact from "./pages/contact";
import About from "./pages/about";
import Demo from "./pages/demo";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import Press from "./pages/Press";
import Help from "./pages/Help";
import Privacy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Pricing from "./pages/Pricing";
import ParentDashboard from "./pages/dashboards/parent";
import InstituteDashboard from "./pages/dashboards/Institute";
import LearnMore from "./components/LearnMore";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/Toaster";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/career" element={<Career />} />
            <Route path="/help" element={<Help />} />
            <Route path="/press" element={<Press />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/learn-more/:type" element={<LearnMore />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <InstituteDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
