import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import UpdateModal from "../components/modal/UpdateModal";
import '../scss/profile.scss';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempFormData, setTempFormData] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        birthday: '',
        age: 0,
        contact_number: '',
        email: ''
    });

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/user-profile/profile', {
                withCredentials: true,
            });
            if (response.status === 200) {
                const formattedBirthday = new Date(response.data.birthday).toISOString().split('T')[0];
                setFormData({
                    first_name: response.data.first_name,
                    middle_name: response.data.middle_name,
                    last_name: response.data.last_name,
                    birthday: formattedBirthday,
                    age: response.data.age,
                    contact_number: response.data.contact_number,
                    email: response.data.email.trim()
                });
                setTempFormData({
                    first_name: response.data.first_name,
                    middle_name: response.data.middle_name,
                    last_name: response.data.last_name,
                    birthday: formattedBirthday,
                    age: response.data.age,
                    contact_number: response.data.contact_number,
                    email: response.data.email.trim()
                });
                console.table(response.data)
            }
        } catch (e) {
            alert(`Error fetching profile: ${e}`);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setTempFormData({ ...tempFormData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/user-profile/update_profile`, tempFormData, {
                withCredentials: true,
            });
            if (response.status === 200) {
                fetchProfile();
            }
            setFormData(tempFormData);
            setIsModalOpen(false);
        } catch (e) {
            console.log(`Error updating profile: ${e}`);
        }
    }

    return (
        <section className="profile container section">
            <div className="profile-form">
                <h2 className="section-title" data-aos="fade-right">My Profile</h2>
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td className="table-data">First Name</td>
                            <td className="table-data">{formData?.first_name}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Middle Name</td>
                            <td className="table-data">{formData?.middle_name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Last Name</td>
                            <td className="table-data">{formData?.last_name}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Birthday</td>
                            <td className="table-data">{formData?.birthday}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Age</td>
                            <td className="table-data">{formData?.age}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Contact Number</td>
                            <td className="table-data">{formData?.contact_number}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Email</td>
                            <td className="table-data">{formData?.email}</td>
                        </tr>
                    </tbody>
                </table>
                <motion.button 
                    onClick={() => setIsModalOpen(true)} 
                    className="edit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <i className="fas fa-edit"></i> Edit Profile
                </motion.button>
            </div>
            <AnimatePresence>
                {isModalOpen && (
                    <UpdateModal
                        onClose={() => setIsModalOpen(false)}
                        formData={tempFormData}
                        handleChange={handleChange}
                        handleSave={handleSave}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

export default Profile