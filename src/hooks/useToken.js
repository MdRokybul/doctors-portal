import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        fetch(`https://doctors-portal-server-lyart-iota.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem("AccessToken", data.accessToken);
                    setToken(data.accessToken);
                }
            })
    }, [email]);
    return [token];
}
export default useToken;