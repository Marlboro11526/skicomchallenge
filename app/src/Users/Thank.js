import { useEffect, useState } from "react";

export default function Thank() {
  const basePath = process.env.REACT_APP_API_BASE_URL;
  const usersController = process.env.REACT_APP_API_USERS_PATH;

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
    <div class="thank-you-screen">
      <p>Thank you, {user}!</p>
    </div>
  );
}
