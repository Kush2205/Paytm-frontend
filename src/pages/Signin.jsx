import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
export const Signin = () => {


  const [username, setUser] = useState();
  const [password, setPassword] = useState();
 const navigate = useNavigate();

   const handleClick = async () => {
    const response = await axios.post("https://paytm-backend-0jb0.onrender.com/api/v1/user/signin", { username, password });
    if (response.status === 200) {
      const token = localStorage.getItem("token");
      if(token){
        localStorage.removeItem("token");
      }
      else{
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
     
    }
   }


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => setUser(e.target.value)} placeholder="Email" label={"Email"} />
        <InputBox onChange={e => setPassword(e.target.value)} placeholder="Password" label={"Password"} type="password" />
        <div className="pt-4">
          <Button onClick={handleClick} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}