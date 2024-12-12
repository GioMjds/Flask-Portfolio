import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../scss/not-found.scss';

const NotFound = () => {
  return (
    <motion.section
      className="not-found container section"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="section-title"
      >
        Oops!! Page not found
      </motion.h2>
      <motion.p
        className="section-description"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        The page you&apos;re looking for does not exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link to="/" className='btn'>Back to Home</Link>
      </motion.div>
    </motion.section>
  )
}

export default NotFound