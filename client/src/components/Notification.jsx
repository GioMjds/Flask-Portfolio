/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import '../scss/notification.scss';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            className={`notification ${type}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="notification-content">
                {type === 'success' ? (
                    <FaCheckCircle className="icon" />
                ) : (
                    <FaTimesCircle className="icon" />
                )}
                <p>{message}</p>
            </div>
        </motion.div>
    )
}

export default Notification