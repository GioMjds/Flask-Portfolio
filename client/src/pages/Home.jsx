import Me from "../assets/mimic4.jpg";
import HeaderSocials from '../components/HeaderSocials';
import ScrollDown from '../components/ScrollDown';
import "../scss/home.scss";
import About from "../sections/About";
import Resume from "../sections/Resume";

const Home = () => {
  return (
    <>
      <section className="home container">
        <div className="intro">
          <img src={Me} className="home-img" data-aos="zoom-out" />
          <h1 className="home-name" data-aos="zoom-out">Gio Majadas</h1>
          <span className="home-education" data-aos="zoom-out">Front-End Developer</span>
          <HeaderSocials />
          <ScrollDown />
        </div>
      </section>
      <About id="about" />
      <Resume id="resume" />
    </>
  )
}

export default Home