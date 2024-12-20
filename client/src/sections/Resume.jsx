import Card from "../components/Card";
import Data from "../constants/Data";
import "../scss/resume.scss";

const Resume = () => {
  return (
    <section className="resume container section" id="resume">
      <h2 className="section-title" data-aos="fade-right">Resume</h2>
      <div className="resume-container grid">
        <div className="timeline grid" data-aos="fade-right">
          {Data.map((val, id) => {
            if (val.category === "education") {
              return (
                <Card
                  key={id}
                  icon={val.icon}
                  title={val.title}
                  year={val.year}
                  desc={val.desc}
                />
              )
            }
          })}
        </div>
        <div className="timeline grid" data-aos="fade-left">
          {Data.map((val, index) => {
            if (val.category === "experience") {
              return (
                <Card
                  key={index}
                  icon={val.icon}
                  title={val.title}
                  year={val.year}
                  desc={val.desc}
                />
              )
            }
          })}
        </div>
      </div>
    </section>
  )
}

export default Resume