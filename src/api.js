import axios from "axios";
export async function fetchUsers(pageNum) {
    try {
        const response = await axios.get(`https://reqres.in/api/users?page=${pageNum}`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching users");
    }
}

export async function deleteUser(userId) {
    try {
        await axios.delete(`https://reqres.in/api/users/${userId}`);
        return true; // Success
    } catch (error) {
        throw new Error("Failed to delete user");
    }
}

export async function updateUser(user) {
    try {
        const response = await axios.put(`https://reqres.in/api/users/${user.id}`, {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Failed to update user.");
    }
}
