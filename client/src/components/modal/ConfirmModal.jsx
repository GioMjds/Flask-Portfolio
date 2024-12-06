/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { useEffect } from "react";
import '../../scss/modal.scss';

const ConfirmModal = ({ onConfirm, onClose, prompt }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleEsc = e => {
            if (e.key === 'Escape') onClose();
        }

        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEsc);
        }
    }, [onClose]);

  return (
    <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
    >
        <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
        >
            <h2>{prompt}</h2>
            <div className="modal-buttons">
                <motion.button
                    className="modal-confirm"
                    onClick={onConfirm}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Log Out
                </motion.button>
                <motion.button
                    className="modal-cancel"
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    No
                </motion.button>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default ConfirmModal