/* eslint-disable react/prop-types */
import AOS from "aos"
import { useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.scss'
import Sidebar from "./components/Sidebar"
import { MyProvider, useMyContext } from "./contexts/MyContext"
import ProtectedRoutes from "./contexts/ProtectedRoutes"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Projects from "./sections/Projects"
import Certificates from "./sections/Certificates"
import Users from "./pages/Users"
import NotFound from "./sections/NotFound"

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
      <BrowserRouter>
        <MainContent isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} />
      </BrowserRouter>
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
  }, [setIsAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <main className={`main ${isMobile ? "mobile" : ""} ${isTablet ? "tablet" : ""} ${isDesktop ? "desktop" : ""}`}>
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Projects />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/users" element={<Users />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProtectedRoutes>
          </main>
        </>
      ) : (
        <Login />
      )}
    </>
  )
}

export default App
