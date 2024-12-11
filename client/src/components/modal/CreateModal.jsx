/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../../scss/modal.scss';
import {
  validateFirstName,
  validateMiddleName,
  validateLastName,
  validateBirthday,
  validateAge,
  validateContactNumber,
  validateEmail
} from '../../constants/validation.js';
import { motion } from 'framer-motion';

const CreateModal = ({ onClose, onSubmit, formData, handleChange }) => {
  const [validationErrors, setValidationErrors] = useState({});
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

  const handleValidation = () => {
    const errors = {};
    errors.firstNameError = validateFirstName(formData.first_name)
    errors.middleNameError = validateMiddleName(formData.middle_name)
    errors.lastNameError = validateLastName(formData.last_name);
    errors.birthdayError = validateBirthday(formData.birthday, formData.age);
    errors.ageError = validateAge(formData.age);
    errors.contactNumberError = validateContactNumber(formData.contact_number);
    errors.emailError = validateEmail(formData.email);
    return errors;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const errors = handleValidation();
    setValidationErrors(errors);

    if (Object.values(errors).every(error => !error)) {
      onSubmit();
      onClose();
    }
  }

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
        <form onSubmit={handleConfirm} className='add-user-form'>
          <label className='add-form-label'>Your First Name:</label>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className='add-form-input'
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          {validationErrors.firstNameError && <p className="error">{validationErrors.firstNameError}</p>}
          <label className='add-form-label'>Your Middle Name:</label>
          <input
            type="text"
            name="middle_name"
            placeholder="Middle Name"
            className='add-form-input'
            value={formData.middle_name || 'N/A'}
            onChange={handleChange}
          />
          {validationErrors.middleNameError && <p className="error">{validationErrors.middleNameError}</p>}
          <label className='add-form-label'>Your Last Name:</label>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className='add-form-input'
            value={formData.last_name}
            onChange={handleChange}
          />
          {validationErrors.lastNameError && <p className="error">{validationErrors.lastNameError}</p>}
          <label className='add-form-label'>Your Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            className='add-form-input'
            onChange={handleChange}
          />
          {validationErrors.birthdayError && <p className="error">{validationErrors.birthdayError}</p>}
          <label className='add-form-label'>Your Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            className='add-form-input'
            value={formData.age}
            onChange={handleChange}
          />
          {validationErrors.ageError && <p className="error">{validationErrors.ageError}</p>}
          <label className='add-form-label'>Your Contact Number:</label>
          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            className='add-form-input'
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
          {validationErrors.contactNumberError && <p className="error">{validationErrors.contactNumberError}</p>}
          <label className='add-form-label'>Your Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className='add-form-input'
            value={formData.email}
            onChange={handleChange}
            required
          />
          {validationErrors.emailError && <p className="error">{validationErrors.emailError}</p>}
          <div className="modal-buttons">
            <motion.button
              className="modal-confirm"
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className="fas fa-plus-circle"></i> Add User
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              className="modal-cancel"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CreateModal