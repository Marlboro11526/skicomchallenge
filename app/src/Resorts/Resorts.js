import { useEffect, useState } from 'react';

function Users() {
    const [resorts, setResorts] = useState(null);
    const [editable, setEditable] = useState("");
    const [editedText, setEditedText] = useState("");


    const fetchData = async () => {
        await fetch("http://localhost:8000/resorts")
        .then(res => res.json())
        .then(data => setResorts(data))
        .catch(console.log);

        setEditable("");
        setEditedText(""); 
  }

  const addResort = async (resort) => {
    await fetch("http://localhost:8000/resorts");
}

const updateResort = async (id) => {

    if(!editedText){
        setEditable("");
        return;
    }

    await fetch(`http://localhost:8000/resorts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: editedText })
    }).then(
    () => {
        fetchData();
    }
    );

}

  const deleteResort = async (resortId) => {
    await fetch(`http://localhost:8000/resorts/${resortId}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log)
    .catch(console.log);

    fetchData();
  }

  const enableEdit = e => {
      e.target.contentEditable = true;
      e.target.defaultValue = "";
      e.target.value = "";

  }

  const onInputChange = e => {
      setEditedText(e.target.value);
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
<>
<table className="table-auto">
    <thead>
        <tr>
            <th>Resort Name</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
  <tbody>
  {resorts && resorts.map(item => <tr key={item._id.$oid}>
    { editable !== item._id.$oid ? 
        <>
            <td>{item.name}</td>
            <td onClick={() => setEditable(item._id.$oid)}>🖉</td>
        </>
        : 
        <>
            <td><input onChange={onInputChange} type="text"/></td>
            <td onClick={() => updateResort(item._id.$oid)}>{editedText ? "🖫" : "✖"}</td>
        </>
        }
    <td onClick={() => deleteResort(item._id.$oid)}>🗑</td>
  </tr>)}
    
  </tbody>
</table>

</>
  );
}

export default Users;
