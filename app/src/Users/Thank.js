import { useEffect, useState } from "react";

import "./Thank.css";

export default function Thank() {
  const basePath = process.env.REACT_APP_API_BASE_URL;
  const usersController = "/users";

  const [user, setUser] = useState("");

  useEffect(() => {
    let userId = window.location.pathname.replace("/thankyou/", "");

    fetch(`${basePath + usersController}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.first_name);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="thank-you-screen">
      <p>
        Thank you, <span>{user}</span>!
      </p>
    </div>
  );
}
