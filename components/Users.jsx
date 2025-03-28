import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/index.css";
import { fetchUsers, deleteUser, updateUser } from "../src/api"; 

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtered user list
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Search query
    const [deleteUserId, setDeleteUserId] = useState(null); // Tracks user to delete
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found, redirecting to login.");
            navigate("/");
        } else {
            loadUsers(page);
        }
    }, [page, navigate]);

    async function loadUsers(pageNum) {
        try {
            const data = await fetchUsers(pageNum);
            if (!data || !data.data) throw new Error("Invalid data format.");
            
            setUsers(data.data);
            setTotalPages(data.total_pages);
    
            // Store users from all pages
            const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
            const newUsers = [...existingUsers, ...data.data];
            const uniqueUsers = Array.from(new Map(newUsers.map(user => [user.id, user])).values());
    
            localStorage.setItem("allUsers", JSON.stringify(uniqueUsers));
            setFilteredUsers(data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setMessage({ type: "error", text: "Failed to fetch users. Please try again later." });
        }
    }
    
    
    function confirmDelete(userId) {
        setDeleteUserId(userId); // Open confirmation box
    }

    async function handleDelete() {
        if (!deleteUserId) return;

        try {
            await deleteUser(deleteUserId);
            setUsers(users.filter(user => user.id !== deleteUserId));
            setFilteredUsers(filteredUsers.filter(user => user.id !== deleteUserId));
            setMessage({ type: "success", text: `User ${deleteUserId} deleted successfully.` });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to delete user." });
        }

        setDeleteUserId(null); // Close confirmation box
    }

    function startEdit(user) {
        setEditingUser(user);
    }

    async function handleUpdate(event) {
        event.preventDefault();
        if (!editingUser.first_name.trim() || !editingUser.last_name.trim() || !editingUser.email.trim()) {
            setMessage({ type: "error", text: "All fields are required." });
            return;
        }

        try {
            const updatedUser = await updateUser(editingUser);
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setFilteredUsers(filteredUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setEditingUser(null);
            setMessage({ type: "success", text: "User updated successfully." });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update user." });
        }
    }

    function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Search across ALL pages
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || users;
    
    const filtered = allUsers.filter(user =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
}


    return (
        <div className="users-container">
            <h2>User List</h2>
            {message && <p className={`message ${message.type}`}>{message.text}</p>}

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
            />

            {/* Delete Confirmation Box */}
            {deleteUserId && (
                <div className="confirmation-box">
                    <p>Are you sure you want to delete this user?</p>
                    <button className="confirm" onClick={handleDelete}>Yes, Delete</button>
                    <button className="cancel" onClick={() => setDeleteUserId(null)}>Cancel</button>
                </div>
            )}

            {editingUser && (
                <div className="edit-form">
                    <h3>Edit User</h3>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            value={editingUser.first_name}
                            onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            value={editingUser.last_name}
                            onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                            required
                        />
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            required
                        />
                        <button type="submit">Update</button>
                        <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                    </form>
                </div>
            )}

            <div className="user-grid">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user.id} className="user-card">
                            <img src={user.avatar} alt={user.first_name} />
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                            <button className="edit-button" onClick={() => startEdit(user)}>Edit</button>
                            <button className="delete-button" onClick={() => confirmDelete(user.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
}
