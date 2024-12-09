import axios from "axios";
import { useEffect, useState } from "react";
import EditProfileModal from "../components/modal/EditProfileModal";
import '../scss/profile.scss';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        birthday: '',
        age: 0,
        contact_number: '',
        email: ''
    });

    const [validationError, setValidationError] = useState({
        firstnameError: '',
        middlenameError: '',
        lastnameError: '',
        birthdayError: '',
        ageError: '',
        contactnumberErrror: '',
        emailError: ''
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
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/user-profile/update`, formData, {
                withCredentials: true,
            });
            if (response.status === 200) {
                alert('Profile updated successfully');
                fetchProfile();
                setIsEditing(false);
            }
        } catch (e) {
            console.log(`Error updating profile: ${e}`);
        }
    }

    return (
        <section className="profile container section">
            <div className="profile-form">
                <h2 className="section-title">My Profile</h2>
                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td className="table-data">First Name</td>
                            <td className="table-data">{formData.first_name}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Middle Name</td>
                            <td className="table-data">{formData.middle_name}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Last Name</td>
                            <td className="table-data">{formData.last_name}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Birthday</td>
                            <td className="table-data">{formData.birthday}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Age</td>
                            <td className="table-data">{formData.age}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Contact Number</td>
                            <td className="table-data">{formData.contact_number}</td>
                        </tr>
                        <tr>
                            <td className="table-data">Email</td>
                            <td className="table-data">{formData.email}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => setIsModalOpen(true)} className="edit-btn">
                    <i className="fas fa-edit"></i> Edit Profile
                </button>
                <EditProfileModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                />
            </div>
        </section>
    )
}

export default Profile