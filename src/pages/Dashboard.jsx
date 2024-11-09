import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useState , useEffect } from "react"
export const Dashboard = () => {
    const [balance , setBalance] = useState(0);
    useEffect(() => {
        axios.get("https://paytm-backend-0jb0.onrender.com/api/v1/account/balance" , {
            headers: {
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBalance(response.data.balance)
            })
    }, [])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}