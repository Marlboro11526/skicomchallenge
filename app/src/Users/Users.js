import './Form.css';
import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState(null);
    const [frequencies, setFrequencies] = useState(null);

    const fetchData = async () => {
      if(!users){
        await fetch("http://localhost:8000/users").then(res => res.json()).then(async _users => {
          setUsers(_users)
          let frequencyTable = {};
          await _users.forEach(user => {
            return frequencyTable[user.favorite_resort] = isNaN(frequencyTable[user.favorite_resort]) ? 0 : frequencyTable[user.favorite_resort] + 1;
          });
          setFrequencies(frequencyTable);
          console.log(frequencies);

        }).catch(e => console.log(e));

        
      }
  }



  const sortUsers = type => {
    switch(type){
      case "name": break;
      case "email": break;
      case "resort": break;
      default: break;
    }
  }

  useEffect(() => {
    fetchData();
  })

  return (
<>
<table className="table-auto">
  <thead>
    <tr>
      <th onClick={sortUsers("name")}>Full Name</th>
      <th onClick={sortUsers("email")}>Email Address</th>
      <th onClick={sortUsers("resort")}>Favorite Resort</th>
    </tr>
  </thead>
  <tbody>
    {users && users.map(item => <tr key={item._id.$oid}>
    <td>{`${item.first_name} ${item.last_name}`}</td>
    <td>{item.email}</td>
    <td>{item.favorite_resort}</td>
  </tr>)}
  </tbody>
</table>

<table className="table-auto">
  <thead>
    <tr>
      <th>Resort</th>
      <th>Registered Users</th>
    </tr>
  </thead>
  <tbody>

  </tbody>
</table>
</>
  );
}

export default Users;
