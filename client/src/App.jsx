/* eslint-disable react/prop-types */
import AOS from "aos"
import { useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import './App.scss'
import Sidebar from "./components/Sidebar"
import { MyProvider, useMyContext } from "./contexts/MyContext"
import ProtectedRoutes from "./contexts/ProtectedRoutes"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import About from "./sections/About"
import Certificates from "./sections/Certificates"
import Contact from "./sections/Contact"
import Home from "./sections/Home"
import Projects from "./sections/Projects"
import Resume from "./sections/Resume"

const App = () => {
  AOS.init({
    duration: 600,
    delay: 300,
  });

  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <MyProvider>
      <MainContent isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
    </MyProvider>
  )
}

const MainContent = ({ isDesktop, isTablet, isMobile }) => {
  const { isAuthenticated, setIsAuthenticated } = useMyContext();

  useEffect(() => {
    const session = localStorage.getItem('session_id');

    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <main className={`main ${isMobile ? "mobile" : ""} ${isTablet ? "tablet" : ""} ${isDesktop ? "desktop" : ""}`}>
        {isAuthenticated ? (
          <>
            <Sidebar />
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Home id="home" />
              <About id="about" />
              <Resume id="resume" />
              <Certificates id="certificates" />
              <Projects id="projects" />
              <Contact id="contact" />
            </ProtectedRoutes>
          </>
        ) : (
          <Login />
        )}
      </main>
    </>
  )
}

export default App
