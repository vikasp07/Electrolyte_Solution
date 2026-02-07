import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";
import Clients from "./components/Vendors/Vendors";
import Certifications from "./components/Certifications/Certifications";
import Blog from "./components/Blog/Blog";
import "./App.css";
// Admin pages (isolated)
import AdminLogin from "./admin/pages/Login";
import AdminBlogList from "./admin/pages/BlogList";
import AdminBlogEditor from "./admin/pages/BlogEditor";
import AdminContactSubmissions from "./admin/pages/ContactSubmissions";
import { ProtectedRoute } from "./admin/routes";

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin routes - isolated namespace */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/blogs"
              element={
                <ProtectedRoute>
                  <AdminBlogList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blogs/new"
              element={
                <ProtectedRoute>
                  <AdminBlogEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/blogs/:id/edit"
              element={
                <ProtectedRoute>
                  <AdminBlogEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contact-submissions"
              element={
                <ProtectedRoute>
                  <AdminContactSubmissions />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
