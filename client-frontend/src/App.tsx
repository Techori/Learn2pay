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
import Applynow from "./pages/Applynow";
import Press from "./pages/Press";
import Help from "./pages/Help";
import Privacy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiesPolicy from "./pages/CookiesPolicy";
import Teams from "./pages/Teams";
import Pricing from "./pages/Pricing";
import DashboardRouter from "./components/DashboardRouter";
import LearnMore from "./pages/LearnMore";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/Toaster";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
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
          <Route path="/applynow" element={<Applynow />} />
          <Route path="/cookiespolicy" element={<CookiesPolicy />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
          <Route path="/help" element={<Help />} />
          <Route path="/press" element={<Press />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
