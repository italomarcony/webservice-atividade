import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5555/users").then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <ul>
        {user.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.age}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
