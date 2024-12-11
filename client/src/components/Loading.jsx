import { motion } from "framer-motion"
import '../scss/loading.scss';

const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
    }
}

const Loading = () => {
  return (
    <div className="loading-container">
        <motion.svg
            width={100} height={30}
            viewBox="0 0 100 30"
        >
            <motion.circle cx={10} cy={7.5} r={5} fill="$first-color" animate={bounceAnimation} />
            <motion.circle cx={50} cy={7.5} r={5} fill="$first-color" animate={bounceAnimation} style={{ transitionDelay: '0.2s' }} />
            <motion.circle cx={90} cy={7.5} r={5} fill="$first-color" animate={bounceAnimation} style={{ transitionDelay: '0.4s' }}/>
        </motion.svg>
    </div>
  )
}

export default Loading