import { useEffect, useState } from "react";

function Users() {
  const basePath = process.env.REACT_APP_API_BASE_URL;
  const usersController = "/users";
  const resortsController = "/resorts";

  const [users, setUsers] = useState(null);
  const [resorts, setResorts] = useState(null);
  const [sortedBy, setSortedBy] = useState("");
  const [frequencies, setFrequencies] = useState({});

  const fetchData = async () => {
    await fetch(`${basePath + usersController}`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.log);

    await fetch(`${basePath + resortsController}`)
      .then((res) => res.json())
      .then((data) => setResorts(data))
      .catch(console.log);
  };

  const sortUsers = (type) => {
    let sortedUsers = [];
    switch (type) {
      case "first":
        sortedUsers = [
          ...users.sort((a, b) => (a.first_name > b.first_name ? 1 : -1)),
        ];
        break;
      case "last":
        sortedUsers = [
          ...users.sort((a, b) => (a.last_name > b.last_name ? 1 : -1)),
        ];
        break;
      case "email":
        sortedUsers = [...users.sort((a, b) => (a.email > b.email ? 1 : -1))];
        break;
      case "resort":
        sortedUsers = [
          ...users.sort((a, b) =>
            a.favorite_resort > b.favorite_resort ? 1 : -1
          ),
        ];
        break;
      default:
        break;
    }
    setSortedBy(type);
    setUsers(sortedUsers);
  };

  const getResortName = (resortId) => {
    let resort = resorts.find((r) => r._id.$oid === resortId);

    let resortName = resort ? resort.name : resortId;

    return resortName;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let reduction =
      users &&
      users.reduce((sums, user) => {
        sums[user.favorite_resort] = (sums[user.favorite_resort] || 0) + 1;
        return sums;
      }, []);

    setFrequencies(reduction);
  }, [users]);

  return (
    <>
      <div className="description">
        <p>
          Here you can see the currently registered users, as well as resorts
          grouped by how many times they've been 'favorited'.
        </p>
        <p>
          You can click on the user tables headers to sort by each field type!
          Not on the frequency table... yet....
        </p>
        <p>
          A user could have a favorite resort that is no longer in the database.
          In this cases, the resort id is shown instead of the name.
        </p>
      </div>
      <div className="table-wrapper">
        <table className="table-auto">
          <thead>
            <tr>
              <th onClick={() => sortUsers("first")}>
                First Name {sortedBy === "first" ? "▼" : ""}
              </th>
              <th onClick={() => sortUsers("last")}>
                Last Name {sortedBy === "last" ? "▼" : ""}
              </th>

              <th onClick={() => sortUsers("email")}>
                Email Address {sortedBy === "email" ? "▼" : ""}
              </th>
              <th onClick={() => sortUsers("resort")}>
                Favorite Resort {sortedBy === "resort" ? "▼" : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item) => (
                <tr key={item._id.$oid}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{resorts && getResortName(item.favorite_resort)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="table-wrapper">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Resort</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {frequencies &&
              Object.entries(frequencies).map(([key, value]) => (
                <tr key={key}>
                  <td>{resorts && getResortName(key)}</td>
                  <td>{value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
