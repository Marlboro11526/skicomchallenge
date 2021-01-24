import { useEffect, useState } from "react";

function Users() {
  const basePath = process.env.REACT_APP_API_BASE_URL;
  const resortsController = process.env.REACT_APP_API_RESORTS_PATH;

  const [resorts, setResorts] = useState(null);
  const [editable, setEditable] = useState("");
  const [editedText, setEditedText] = useState("");

  const fetchData = async () => {
    await fetch(`${basePath + resortsController}`)
      .then((res) => res.json())
      .then((data) => {
        setResorts(data);
        setEditable("");
        setEditedText("");
        document.getElementById("new-resort-field").value = "";
      })
      .catch(console.log);
  };

  const addResort = async () => {
    if (!editedText) {
      setEditable("");
      return;
    }

    await fetch(`${basePath + resortsController}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editedText }),
    })
      .then(() => {
        fetchData();
      })
      .catch(console.log);
  };

  const updateResort = async (resortId) => {
    if (!editedText) {
      setEditable("");
      return;
    }

    await fetch(`${basePath + resortsController}/${resortId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editedText }),
    })
      .then(() => {
        fetchData();
      })
      .catch(console.log);
  };

  const deleteResort = async (resortId) => {
    await fetch(`${basePath + resortsController}/${resortId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchData();
      })
      .catch(console.log);
  };

  const onInputChange = (e) => {
    setEditedText(e.target.value);
  };

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
          {resorts &&
            resorts.map((item) => (
              <tr key={item._id.$oid}>
                {editable !== item._id.$oid ? (
                  <>
                    <td>{item.name}</td>
                    <td onClick={() => setEditable(item._id.$oid)}>🖉</td>
                  </>
                ) : (
                  <>
                    <td>
                      <input onChange={onInputChange} type="text" />
                    </td>
                    <td onClick={() => updateResort(item._id.$oid)}>
                      {editedText ? "🖫" : "✖"}
                    </td>
                  </>
                )}
                <td onClick={() => deleteResort(item._id.$oid)}>🗑</td>
              </tr>
            ))}
          <tr>
            <td>
              <input
                id="new-resort-field"
                placeholder="New resort..."
                onChange={onInputChange}
                type="text"
              />
            </td>
            <td onClick={() => addResort()}>{editedText ? "🖫" : ""}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Users;
