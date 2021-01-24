import { useEffect, useState } from 'react';

function Users() {
    const [resorts, setResorts] = useState(null);
    const [editable, setEditable] = useState("");
    const [editedText, setEditedText] = useState("");


    const fetchData = async () => {
        await fetch("http://localhost:8000/resorts")
        .then(res => res.json())
        .then(data => {
            setResorts(data);
            setEditable("");
            setEditedText("");
            document.getElementById('new-resort-field').value = "";
        })
        .catch(console.log);
  }

  const addResort = async () => {
    if(!editedText){
        setEditable("");
        return;
    }

    await fetch(`http://localhost:8000/resorts/`, {
        method: 'POST',
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
    <tr>
        <td><input id="new-resort-field" placeholder="New resort..." onChange={onInputChange} type="text"/></td> 
        <td onClick={() => addResort()}>{editedText ? "🖫" : ""}</td>
    </tr>
  </tbody>
</table>

</>
  );
}

export default Users;
