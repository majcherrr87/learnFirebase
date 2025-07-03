import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

type User = {
  id: string;
  name: string;
  age: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newAge, setNewAge] = useState<number>(0);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...(doc.data() as Omit<User, "id">),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  const addUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };

  const updateUser = async (id: string, age: number) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async (id: string) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(e) => setNewAge(Number(e.target.value))}
      />
      <button onClick={addUser}>Add User</button>

      {users.map(({ id, name, age }) => (
        <div key={id}>
          <h2>name {name}</h2>
          <h2>age {age}</h2>
          <button onClick={() => updateUser(id, age)}>Increase Age</button>
          <button onClick={() => deleteUser(id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
}

export default App;

// https://www.youtube.com/watch?v=jCY6DH8F4oc&list=PLpPqplz6dKxUfvM22GXRvYA4s-mvJE0XF&index=1
