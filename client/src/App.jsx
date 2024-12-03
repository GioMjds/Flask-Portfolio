/* eslint-disable react/prop-types */
import AOS from "aos"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import './App.scss'
import About from "./sections/About"
import Home from "./sections/Home"
import Sidebar from "./components/Sidebar"
import Resume from "./sections/Resume"
import Portfolio from "./sections/Portfolio"
import Contact from "./sections/Contact"
import Certificates from "./sections/Certificates"
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./contexts/AuthContext"

const App = () => {
  AOS.init({
    duration: 600,
    delay: 300,
  });

  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <AuthProvider>
      <BrowserRouter>
      <MainContent isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
      </BrowserRouter>
    </AuthProvider>
  )
}

const MainContent = ({ isDesktop, isTablet, isMobile }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <main className={`main ${isMobile ? "mobile" : ""} ${isTablet ? "tablet" : ""} ${isDesktop ? "desktop" : ""}`}>
      {isAuthenticated && <Sidebar />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home id="home" /> : <Login />} />
          <Route path="/about" element={isAuthenticated ? <About id="about" /> : <Login />} />
          <Route path="/resume" element={isAuthenticated ? <Resume id="resume" /> : <Login />} />
          <Route path="/certificates" element={isAuthenticated ? <Certificates id="certificates" /> : <Login />} />
          <Route path="/portfolio" element={isAuthenticated ? <Portfolio id="portfolio" /> : <Login />} />
          <Route path="/contact" element={isAuthenticated ? <Contact id="contact" /> : <Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
