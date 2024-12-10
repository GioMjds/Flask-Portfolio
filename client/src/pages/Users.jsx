import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ConfirmModal from '../components/modal/ConfirmModal';
import CreateModal from '../components/modal/CreateModal';
import UpdateModal from '../components/modal/UpdateModal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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
    setFormData({
      id: user.id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      birthday: user.birthday,
      age: user.age,
      contact_number: user.contact_number,
      email: user.email
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    setUserIdToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/users/delete_user/${userIdToDelete}`);
      fetchUsers();
      setIsConfirmOpen(false);
    } catch (e) {
      console.log(`Error deleting user: ${e}`)
    }
  }

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/users/update_user/${formData.id}`,formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        fetchUsers();
      }
      resetForm();
    } catch (e) {
      console.log(`Error updating user: ${e}`);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:5000/users/add_user', formData);
    fetchUsers();
    resetForm();
    setIsCreateModalOpen(false);
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
    setIsModalOpen(false);
    setIsCreateModalOpen(false);
  };

  return (
    <section className="users section">
      <h2 className='section-title'>List of Users</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Birthday</th>
            <th>Age</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.middle_name || 'N/A'}</td>
                <td>{user.last_name}</td>
                <td>{user.birthday}</td>
                <td>{user.age}</td>
                <td>{user.contact_number}</td>
                <td>{user.email}</td>
                <td>
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
              <td colSpan="8">No users found...</td>
            </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="add-user-button btn"
      >
        <i className="fas fa-add"></i> Add User
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <UpdateModal
            onClose={resetForm}
            formData={formData}
            handleChange={handleChange}
            handleSave={handleUpdateSubmit}
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
      </AnimatePresence>
    </section>
  );
};

export default Users;