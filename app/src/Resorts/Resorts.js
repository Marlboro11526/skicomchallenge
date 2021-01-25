import { useEffect, useState } from "react";

import "./Resorts.css";

function Users() {
  const basePath = process.env.REACT_APP_API_BASE_URL;
  const resortsController = "/resorts";

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
    if (!editedText.trim()) {
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
    if (!editedText.trim()) {
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
      <div class="description">
        <p>Here you can add and manipulate resort registrations.</p>
        <p>
          Click 🖉 to begin editing an existing resort, then click 🖫 to save the
          changes.
        </p>
        <p>Click 🗑 to delete an existing resort.</p>
        <p>
          Begin typing at the bottom field, then click 🖫 to register a new
          resort.
        </p>
      </div>
      <div class="table-wrapper">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Registered Resorts</th>
            </tr>
          </thead>
          <tbody>
            {resorts &&
              resorts.map((item) => (
                <tr key={item._id.$oid}>
                  {editable !== item._id.$oid ? (
                    <>
                      <td>{item.name}</td>
                      <td
                        title="Click to edit resort"
                        onClick={() => {
                          setEditable(item._id.$oid);
                          setEditedText("");
                          document.getElementById("new-resort-field").value =
                            "";
                        }}
                      >
                        🖉
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <input
                          placeholder="New resort name..."
                          onChange={onInputChange}
                          type="text"
                        />
                      </td>
                      <td
                        title={
                          editedText.trim()
                            ? "Click to save edits"
                            : "Click to cancel edit"
                        }
                        onClick={() => updateResort(item._id.$oid)}
                      >
                        {editedText.trim() ? "🖫" : "✖"}
                      </td>
                    </>
                  )}
                  <td onClick={() => deleteResort(item._id.$oid)}>🗑</td>
                </tr>
              ))}
            <tr>
              <td>
                <input
                  onClick={() => {
                    setEditable("");
                    setEditedText("");
                  }}
                  id="new-resort-field"
                  placeholder="New resort..."
                  onChange={onInputChange}
                  type="text"
                />
              </td>
              <td title="Click to add resort" onClick={() => addResort()}>
                {editedText.trim() && !editable ? "🖫" : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
