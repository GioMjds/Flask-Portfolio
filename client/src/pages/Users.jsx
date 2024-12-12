import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ConfirmModal from '../components/modal/ConfirmModal';
import CreateModal from '../components/modal/CreateModal';
import UserUpdateModal from '../components/modal/UserUpdateModal';
import Notification from '../components/Notification';
import '../scss/users.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    birthday: '',
    age: 0,
    contact_number: '',
    email: '',
  });
  const [isUserUpdateModalOpen, setIsUserUpdateModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/users/show_users', {
        withCredentials: true,
      });
      setUsers(response.data.data);
      console.table(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (user) => {
    const formattedBirthday = new Date(user.birthday).toISOString().split('T')[0];
    setFormData({
      id: user.id,
      first_name: user?.first_name,
      middle_name: user?.middle_name,
      last_name: user?.last_name,
      birthday: formattedBirthday,
      age: user?.age,
      contact_number: user?.contact_number,
      email: user?.email
    });
    setIsUserUpdateModalOpen(true);
  };

  const handleDelete = async (id) => {
    setUserIdToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/users/delete_user/${userIdToDelete}`);
      fetchUsers();
      setNotification({ message: 'User successfully deleted!', type: 'deleted', visible: true });
      setIsConfirmOpen(false);
    } catch (e) {
      setNotification({ message: 'Error deleting user!', type: 'error', visible: true });
      console.log(`Error deleting user: ${e}`)
    }
  }

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/users/update_user/${formData.id}`, {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        birthday: formData.birthday,
        age: formData.age,
        contact_number: formData.contact_number,
        email: formData.email
      }, {
        withCredentials: true,
      });
      if (response.status === 200) {
        fetchUsers();
        setNotification({ message: 'User updated successfully!', type: 'success', visible: true });
      }
      setFormData({
        id: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        birthday: '',
        age: 0,
        contact_number: '',
        email: '',
      });
      resetForm();
      setIsUserUpdateModalOpen(false);
    } catch (e) {
      console.log(`Error updating user: ${e}`);
      setNotification({ message: e.response?.data?.error || 'User not updated!', type: 'error', visible: true });
    }
  };

  const handleCreateSubmit = async () => {
    try {
      const formattedBirthday = new Date(formData.birthday).toISOString().split('T')[0];
      const response = await axios.post('http://127.0.0.1:5000/users/add_user', {
        ...formData,
        birthday: formattedBirthday
      }, {
        withCredentials: true,
      });
      fetchUsers();
      resetForm();
      setNotification({ message: response.data.success, type: 'success', visible: true });
      setIsCreateModalOpen(false);
    } catch (e) {
      resetForm();
      console.log(`Error creating user: ${e}`);
      setNotification({ message: e.response?.data?.error || 'User not added!', type: 'error', visible: true });
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      birthday: '',
      age: 0,
      contact_number: '',
      email: '',
    });
    setIsCreateModalOpen(false);
    setIsUserUpdateModalOpen(false);
  };

  return (
    <section className="users container section">
      <h2 className='section-title' data-aos="fade-right">List of Users</h2>
      <table className='table-container'>
        <thead className='table-header'>
          <tr className='table-row'>
            <th className='table-cell'>First Name</th>
            <th className='table-cell'>Middle Name</th>
            <th className='table-cell'>Last Name</th>
            <th className='table-cell'>Birthday</th>
            <th className='table-cell'>Age</th>
            <th className='table-cell'>Contact Number</th>
            <th className='table-cell'>Email</th>
            <th className='table-cell'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.filter(user => user.id !== 2).map((user) => (
              <tr key={user.id} className='table-row'>
                <td className='table-data'>{user.first_name}</td>
                <td className='table-data'>{user.middle_name}</td>
                <td className='table-data'>{user.last_name}</td>
                <td className='table-data'>{user.birthday}</td>
                <td className='table-data'>{user.age}</td>
                <td className='table-data'>{user.contact_number}</td>
                <td className='table-data'>{user.email}</td>
                <td className='table-data'>
                  <button onClick={() => handleEdit(user)} className="edit-button">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="delete-button">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No users found...</td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="add-user-button"
      >
        <i className="fas fa-plus-circle"></i>  Add User
      </button>

      <AnimatePresence>
        {isUserUpdateModalOpen && (
          <UserUpdateModal
            onClose={resetForm}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleUpdateSubmit}
          />
        )}

        {isCreateModalOpen && (
          <CreateModal
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {isConfirmOpen && (
          <ConfirmModal
            onConfirm={confirmDelete}
            action='Delete User'
            prompt='Are you sure you want to delete this user?'
            onClose={() => setIsConfirmOpen(false)}
          />
        )}

        {notification.visible && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: '', type: '', visible: false })}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Users;