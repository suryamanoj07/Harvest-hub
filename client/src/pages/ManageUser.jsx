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
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    role: ''
  });
  const [newUser, setNewUser] = useState({ email: '', password: '', username: '', role: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage the visibility of the edit modal
  const [filterRole, setFilterRole] = useState('all'); // State to manage the selected role filter
  const [searchTerm, setSearchTerm] = useState(''); // State to manage the search term
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const usersPerPage = 10; // Number of users to display per page

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
    setFormData({
      email: user.email,
      username: user.user_name,
      role: user.role
    });
    setIsEditModalOpen(true); // Open the edit modal
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
        await axios.post('http://localhost:3000/api/admin/users', newUser, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
      }
      setEditingUser(null);
      setFormData({
        email: '',
        username: '',
        role: ''
      });
      setNewUser({ email: '', password: '', username: '', role: '' });
      fetchUsers();
      setIsModalOpen(false); // Close the modal after submission
      setIsEditModalOpen(false); // Close the edit modal after submission
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

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const exportToCSV = () => {
    const csvRows = [];
    const headers = ['Email', 'Username', 'Role'];
    csvRows.push(headers.join(','));

    users.forEach(user => {
      const row = [
        user.email,
        user.user_name || '',
        user.role
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users
    .filter((user) => filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase())
    .filter((user) => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (user.user_name && user.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  if (currentUser?.role.toLowerCase() !== 'admin') {
    return <div className='manage-user__outer-div'>Access denied. Admins only.</div>;
  }

  return (
    <div className="flex items-start gap-12">
      <Sidebar />
      <div className='manage-user__outer-div'>
        <h1 className='manage-user__title'>Manage Users</h1>
        <div className='manage-user__button-container'>
          <button className='manage-user__button_Add_button' onClick={openModal}>Add User</button>
          <button className='manage-user__button_Add_button' onClick={exportToCSV}>Export to CSV</button>
        </div>
        <div className='manage-user__controls'>
          <select className='manage-user__select' value={filterRole} onChange={handleFilterChange}>
            <option value="all">All Roles</option>
            <option value="farmer">Farmer</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            className="manage-user__input"
            placeholder="Search by email or username"
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
            {currentUsers.map((user) => (
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
        <div className='pagination'>
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          ))}
        </div>

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
                  name="username"
                  value={newUser.username}
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

        {isEditModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={closeEditModal}>&times;</span>
              <h2>Edit User</h2>
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
                <input
                  className='manage-user__input'
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
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
                <button className='manage-user__button' type="submit">Update User</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;