/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import '../../scss/modal.scss';
import { motion } from 'framer-motion';

const CreateModal = ({ onClose, onSubmit, formData, handleChange }) => {
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
        <h2>Add User</h2>
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            name="first_name" 
            placeholder="First Name" 
            value={formData.first_name} 
            onChange={handleChange} 
            required
          />
          <input 
            type="text" 
            name="middle_name" 
            placeholder="Middle Name" 
            value={formData.middle_name} 
            onChange={handleChange}
            required
          />
          <input 
            type="text" 
            name="last_name" 
            placeholder="Last Name" 
            value={formData.last_name} 
            onChange={handleChange}
            required
          />
          <input 
            type="date" 
            name="birthday" 
            value={formData.birthday} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="number" 
            name="age" 
            placeholder="Age"
            value={formData.age}
            onChange={handleChange} 
            required
          />
          <input 
            type="text" 
            name="contact_number" 
            placeholder="Contact Number" 
            value={formData.contact_number} 
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">
            Add User
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CreateModal