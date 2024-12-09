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

const EditProfileModal = ({ isOpen, onClose, formData, handleChange, handleSave }) => {
    if (!isOpen) return null;

    

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
                <h2 className="section-title">Edit Profile</h2>
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td className="table-data">First Name</td>
                            <td>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="table-data">Middle Name</td>
                            <td>
                                <input
                                    type="text"
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="table-data">Last Name</td>
                            <td>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="table-data">Birthday</td>
                            <td>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="table-data">Age</td>
                            <td>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="table-data">Contact Number</td>
                            <td>
                                <input
                                    type="text"
                                    name="contact_number"
                                    value={formData.contact_number}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="table-data">Email</td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal-buttons">
                    <motion.button
                        className="modal-confirm"
                        onClick={handleSave}
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

export default EditProfileModal