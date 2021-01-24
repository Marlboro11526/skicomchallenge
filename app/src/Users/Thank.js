import { useEffect, useState } from 'react';

export default function Thank() {

    const [user, setUser] = useState("");

    
useEffect(() => {

    fetch(`http://localhost:8000/users/${window.location.pathname.replace("/thankyou/", "")}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setUser(data.first_name);
    });
}, [])


    return <div>
    Thank you, {user}!
    </div>
}