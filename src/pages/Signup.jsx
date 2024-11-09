import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("Sign Up Error :"); // State to track error message
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true); // Set loading to true when the sign-up process starts
    setError(""); // Clear any previous error messages
    try {
      const response = await axios.post("https://paytm-backend-0jb0.onrender.com/api/v1/user/signup", {
        username,
        firstname,
        lastname,
        password
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (e) {
      
      console.error("Sign-up error:", e);
      setError(error+e.response.data.error); // Set error message
    } finally {
      setLoading(false); // Set loading to false when the sign-up process ends
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Create your account"} />
          <InputBox onChange={e => setFirstname(e.target.value)} placeholder="John" label={"First Name"} />
          <InputBox onChange={e => setLastname(e.target.value)} placeholder="Doe" label={"Last Name"} />
          <InputBox onChange={e => setUsername(e.target.value)} placeholder="Email" label={"Email"} />
          <InputBox onChange={e => setPassword(e.target.value)} placeholder="Password" label={"Password"} type="password" />
          <div className="pt-4">
            <Button onClick={handleSignup} label={"Sign up"} />
          </div>
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-4">
              {error}
            </div>
          )}
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

