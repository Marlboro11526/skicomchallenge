import './Form.css';
import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState(null);
    const [sortedBy, setSortedBy] = useState("");
    const [frequencies, setFrequencies] = useState({});

    const fetchData = async () => {
        await fetch("http://localhost:8000/users")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(console.log);
  }

  const sortUsers = type => {
    let sortedUsers = [];
    switch(type){
      case "first":
        sortedUsers = [...users.sort((a,b) => a.first_name > b.first_name ? 1 : -1)]; 
        break;
      case "last":
        sortedUsers = [...users.sort((a,b) => a.last_name > b.last_name ? 1 : -1)]; 
        break;
      case "email": 
        sortedUsers = [...users.sort((a,b) => a.email > b.email ? 1 : -1)]; 
        break;
      case "resort": 
        sortedUsers = [...users.sort((a,b) => a.favorite_resort > b.favorite_resort ? 1 : -1)]; 
        break;
      default: break;
    }
    setSortedBy(type);
    setUsers(sortedUsers); 

  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let reduction = users && users.reduce((sums, user) => {
      sums[user.favorite_resort] = (sums[user.favorite_resort] || 0) + 1;
      return sums;
  }, []);

  setFrequencies(reduction);
}, [users])

  return (
<>
<table className="table-auto">
  <thead>
    <tr>
      <th onClick={() => sortUsers("first")}>First Name {sortedBy === "first" ? "▼" : ""}</th>
      <th onClick={() => sortUsers("last")}>Last Name {sortedBy === "last" ? "▼" : ""}</th>

      <th onClick={() => sortUsers("email")}>Email Address {sortedBy === "email" ? "▼" : ""}</th>
      <th onClick={() => sortUsers("resort")}>Favorite Resort {sortedBy === "resort" ? "▼" : ""}</th>
    </tr>
  </thead>
  <tbody>
  {users && users.map(item => <tr key={item._id.$oid}>
    <td>{item.first_name}</td>
    <td>{item.last_name}</td>
    <td>{item.email}</td>
    <td>{item.favorite_resort}</td>
  </tr>)}
    
  </tbody>
</table>

<table className="table-auto">
  <thead>
    <tr>
      <th>Resort</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>

  {frequencies && Object.entries(frequencies).map(([key, value]) => (
    <tr key={key}>
      <td>{key}</td>
      <td>{value}</td>
    </tr>
  ))}
    
  </tbody>
</table>
</>
  );
}

export default Users;
