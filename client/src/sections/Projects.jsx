import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import ModalBox from "../components/ModalBox";
import Menu from '../constants/Menu';
import "../scss/projects.scss";

const Projects = () => {
  const [items, setItems] = useState(Menu);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = project => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const filterItem = (categoryItem) => {
    const updatedItems = Menu.filter((curElem) => {
      return curElem.category === categoryItem;
    });

    setItems(updatedItems);
  };

  return (
    <>
      <section className="work container section" id='projects'>
        <h2 className="section-title" data-aos="fade-right">Python Activities</h2>
        <div className="work-filters">
          <span className="work-item" onClick={() => setItems(Menu)}>All</span>
          <span className="work-item" onClick={() => filterItem("Prelim")}>Prelim</span>
          <span className="work-item" onClick={() => filterItem("Midterm")}>Midterm</span>
          <span className="work-item" onClick={() => filterItem("Finals")}>Finals</span>
        </div>
        <div className="work-container grid">
          {items.length > 0 ? (
            items.map(category => (
              category.projects.map(project => (
                <motion.div
                  className="work-card"
                  key={project.id}
                  onClick={() => openModal(project)}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="work-thumbnail">
                    <img src={project.image} alt={project.title} className="work-img" />
                    <div className="work-mask"></div>
                  </div>

                  <span className="work-category">{category.category}</span>
                  <h3 className="work-title">{project.title}</h3>
                  <i className={`work-tech ${project.techStack}`}></i>
                </motion.div>
              ))
            ))
          ) : (
            <div className="no-projects">
              <i className="fa-solid fa-mug-saucer"></i>
              <h3>No projects for now in this category...</h3>
            </div>
          )}
        </div>
      </section>
      <AnimatePresence>
        {selectedProject && (
          <ModalBox 
            project={selectedProject} 
            onClose={closeModal} 
            btnLabel="Google Colab Link" 
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Projects