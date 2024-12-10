/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
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
import { useEffect, useState } from "react";

const UpdateModal = ({ onClose, formData, handleChange, handleSave }) => {
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

    const handleConfirm = () => {
        const errors = handleValidation();
        setValidationErrors(errors);

        if (Object.values(errors).every(error => !error)) {
            handleSave();
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
                <h2>Edit Profile</h2>
                <table className="profile-table">
                    <tbody>
                        <tr className="table-row">
                            <td className="table-data-modal">First Name</td>
                            <td>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.firstNameError && <p className="error">{validationErrors.firstNameError}</p>}
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className="table-data-modal">Middle Name</td>
                            <td>
                                <input
                                    type="text"
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.middleNameError && <p className="error">{validationErrors.middleNameError}</p>}
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className="table-data-modal">Last Name</td>
                            <td>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.lastNameError && <p className="error">{validationErrors.lastNameError}</p>}
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className="table-data-modal">Birthday</td>
                            <td>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.birthdayError && <p className="error">{validationErrors.birthdayError}</p>}
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className="table-data-modal">Age</td>
                            <td>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.ageError && <p className="error">{validationErrors.ageError}</p>}
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className="table-data-modal">Contact Number</td>
                            <td>
                                <input
                                    type="text"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.contactNumberError && <p className="error">{validationErrors.contactNumberError}</p>}
                            </td>
                        </tr>
                        <tr className="table-row">
                            <td className="table-data-modal">Email</td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {validationErrors.emailError && <p className="error">{validationErrors.emailError}</p>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal-buttons">
                    <motion.button
                        className="modal-confirm"
                        style={{ backgroundColor: 'hsl(43, 100%, 45%)' }}
                        onClick={handleConfirm}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Update Profile
                    </motion.button>
                    <motion.button
                        className="modal-cancel"
                        onClick={onClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Cancel
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default UpdateModal