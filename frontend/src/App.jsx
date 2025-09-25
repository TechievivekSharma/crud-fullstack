import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost/backend/api.php";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  // Fetch users
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Add user
  const addUser = () => {
    axios
      .post(API_URL, form)
      .then(() => {
        setForm({ name: "", email: "" }); // reset form
        return axios.get(API_URL); // refetch users
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error adding user:", err));
  };

  // Delete user
  const deleteUser = (id) => {
    axios
      .delete(API_URL, { data: { id } }) // note: axios DELETE me body ko "data" me pass karte hai
      .then(() => axios.get(API_URL))
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PHP + React CRUD (Axios)</h1>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={addUser}>Add User</button>

      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => deleteUser(u.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
