import { useEffect, useState } from 'react';
import axios from 'axios';
import '../scss/users.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    age: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/show_users');
      setUsers(response.data.data);
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
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete_user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://127.0.0.1:5000/update_user/${formData.id}`, formData);
    fetchUsers();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      birthday: '',
      age: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
    });
    setIsEditing(false);
  };

  return (
    <section className="users section">
      <h2 className='section-title'>List of Users</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input type="hidden" name="id" value={formData.id} />
        <div className="table-container">
          <div className="table-header">
            <div className="table-row">
              <div className="table-cell">First Name</div>
              <div className="table-cell">Middle Name</div>
              <div className="table-cell">Last Name</div>
              <div className="table-cell">Birthday</div>
              <div className="table-cell">Age</div>
              <div className="table-cell">Contact Number</div>
              <div className="table-cell">Email</div>
              <div className="table-cell">Username</div>
              <div className="table-cell">Password</div>
              <div className="table-cell">Actions</div>
            </div>
          </div>
          <div className="table-body">
            {users.length > 0 ? (
              users.map((user) => (
                <div className="table-row" key={user.id}>
                  <div className="table-cell">
                    <input
                      type="text"
                      name="firstName"
                      value={isEditing && formData.id === user.id ? formData.firstName : user.firstName}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="text"
                      name="middleName"
                      value={isEditing && formData.id === user.id ? formData.middleName : user.middleName}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="text"
                      name="lastName"
                      value={isEditing && formData.id === user.id ? formData.lastName : user.lastName}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="date"
                      name="birthday"
                      value={isEditing && formData.id === user.id ? formData.birthday : user.birthday}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="number"
                      name="age"
                      value={isEditing && formData.id === user.id ? formData.age : user.age}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="text"
                      name="contactNumber"
                      value={isEditing && formData.id === user.id ? formData.contactNumber : user.contactNumber}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="email"
                      name="email"
                      value={isEditing && formData.id === user.id ? formData.email : user.email}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="text"
                      name="username"
                      value={isEditing && formData.id === user.id ? formData.username : user.username}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type={isEditing ? 'text': 'password'}
                      name="password"
                      value={isEditing && formData.id === user.id ? formData.password : user.password}
                      onChange={handleChange}
                      disabled={!(isEditing && formData.id === user.id)}
                    />
                  </div>
                  <div className="table-cell">
                    <button 
                      type={isEditing ? 'submit' : 'button'}
                      className='btn-edit'
                      onClick={() => handleEdit(user)}
                    >
                      {isEditing && formData.id === user.id ? (
                        <i className="fas fa-floppy-disk"></i>
                      ) : (
                        <i className="fas fa-edit"></i>
                      )}
                    </button>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className="table-row">
                <div className="table-cell" colSpan="9">No users found</div>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default Users;