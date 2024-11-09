/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './ManageUser.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from './redux/user/userSlice';
import { Sidebar } from '../components/Sidebar';


const ManageUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userInfo);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', role: '' });
  const [newUser, setNewUser] = useState({ email: '', password: '', user_name: '', role: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser?.role.toLowerCase() !== 'admin') {
      console.error('Access denied. Admins only.');
      return;
    }
    fetchUsers();
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      dispatch(setUserInfo(response.data.message));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ email: user.email, role: user.role });
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`http://localhost:3000/api/admin/users/${editingUser._id}`, formData, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        
      } else {
        // console.log(newUser)
        // console.log("maonj");
         await fetch("http://localhost:3000/api/admin/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify(newUser),
        });
        console.log("sushant")
      }
      setEditingUser(null);
      setFormData({ email: '', role: '' });
      console.log("hi");
      
      setNewUser({ email: '', password: '', user_name: '', role: '' });
      fetchUsers();
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error saving user:', error.response ? error.response.data : error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (currentUser?.role.toLowerCase() !== 'admin') {
    return <div className='manage-user__outer-div'>Access denied. Admins only.</div>;
  }

  return (
    <div className="flex items-start gap-12">
      <Sidebar />
    <div className='manage-user__outer-div'>
      <h1 className='manage-user__title'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Manage Users</h1>
      <button className='manage-user__button_Add_button' onClick={openModal}>Add User</button>
      <div className='manage-user__forms'>
        <form className='manage-user__form' onSubmit={handleSubmit}>
          <input
            className='manage-user__input'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <select
            className='manage-user__select'
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Farmer">Farmer</option>
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
          <button className='manage-user__button' type="submit">{editingUser ? 'Update' : 'Update'} User</button>
        </form>
      </div>
      <table className='manage-user__table'>
        <thead className='manage-user__thead'>
          <tr>
            <th className='manage-user__th'>Email</th>
            <th className='manage-user__th'>Role</th>
            <th className='manage-user__th'>Actions</th>
          </tr>
        </thead>
        <tbody className='manage-user__tbody'>
          {users && users.map((user) => (
            <tr key={user._id}>
              <td className='manage-user__td'>{user.email}</td>
              <td className='manage-user__td'>{user.role}</td>
              <td className='manage-user__td'>
                <button className='manage-user__button' onClick={() => handleEdit(user)}>Edit</button>
                <button className='manage-user__button' onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <h2>Add New User</h2>
            <form className='manage-user__form' onSubmit={handleSubmit}>
              <input
                className='manage-user__input'
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                placeholder="Email"
                required
              />
              <input
                className='manage-user__input'
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleNewUserChange}
                placeholder="Password"
                required
              />
              <input
                className='manage-user__input'
                type="text"
                name="user_name"
                value={newUser.user_name}
                onChange={handleNewUserChange}
                placeholder="Username"
                required
              />
              <select
                className='manage-user__select'
                name="role"
                value={newUser.role}
                onChange={handleNewUserChange}
                required
              >
                <option value="">Select Role</option>
                <option value="farmer">Farmer</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
              <button className='manage-user__button' type="submit">Add User</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManageUser;