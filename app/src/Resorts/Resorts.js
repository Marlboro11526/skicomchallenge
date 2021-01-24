import { useEffect, useState } from 'react';

function Users() {
    const [resorts, setResorts] = useState(null);
    const [sortedBy, setSortedBy] = useState("");
    const [frequencies, setFrequencies] = useState({});

    const fetchData = async () => {
        await fetch("http://localhost:8000/resorts")
        .then(res => res.json())
        .then(data => setResorts(data))
        .catch(console.log);
  }

  const addResort = async (resort) => {
    await fetch("http://localhost:8000/resorts");
}

const updateResort = async (resort) => {
    await fetch("http://localhost:8000/resorts");
}

  const deleteResort = async (resort) => {
      await fetch("http://localhost:8000/resorts");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
<>
<table className="table-auto">
  <tbody>
  {resorts && resorts.map(item => <tr key={item._id.$oid}>
    <td>{item.name}</td>
    <td>🖉</td>
    <td>✖</td>
  </tr>)}
    
  </tbody>
</table>

</>
  );
}

export default Users;
