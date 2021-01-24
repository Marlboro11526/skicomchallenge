import { useEffect, useState } from 'react';

export default function Thank() {

    const [user, setUser] = useState("");

    
useEffect(() => {
    setUser(window.location.pathname.replace("/thankyou/", ""));
}, [])


    return <div>
    thanks {user}!
    </div>
}