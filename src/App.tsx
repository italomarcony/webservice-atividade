import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../src/services/index";

function App() {
  const [user, setUser] = useState([]);

  // metodo get
  useEffect(() => {
    api.get("http://localhost:5555/users").then((response) => {
      setUser(response.data);
    });
  }, []);

  // post

  const addUser = () => {
    const userName = document.getElementById("userName") as HTMLInputElement;
    const userAge = document.getElementById("userAge") as HTMLInputElement;

    const newUser = {
      name: userName.value,
      age: userAge.value,
    };

    if (userName.value == "" || userAge.value == "") {
      alert("Please enter a name and age");
    } else {
      api.post("http://localhost:5555/users", newUser).then((response) => {
        setUser([...user, response.data]);
      });
    }
  };

  // delete
  const deleteUser = async (id: any) => {
    await api.delete(`http://localhost:5555/users/${id}`);
  };

  // update

  const updateUser = async (id: number) => {
    const updatedName = document.getElementById(
      `updatedName${id}`
    ) as HTMLInputElement;
    const updatedAge = document.getElementById(
      `updatedAge${id}`
    ) as HTMLInputElement;

    const updatedUser = {
      name: updatedName.value,
      age: updatedAge.value,
    };

    await axios.put(`http://localhost:5555/users/${id}`, updatedUser);
    const newUsers = user.filter((user: any) => user.id !== id);
    setUser(newUsers);
  };

  return (
    <>
      <h1>Users</h1>
      <ul>
        <div>
          <div>
            {user.map((user: any) => (
              <div key={user.id}>
                <span>
                  {user.name} - {user.age}{" "}
                </span>
                <input type="text" id={`updatedName${user.id}`} />
                <input type="number" id={`updatedAge${user.id}`} />
                <button onClick={() => updateUser(user.id)}>Update</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            ))}
          </div>
          <div>
            <input type="text" id="userName" />
            <input type="number" id="userAge" />
            <button onClick={addUser}>Add User</button>
          </div>
        </div>
      </ul>
    </>
  );
}

export default App;
