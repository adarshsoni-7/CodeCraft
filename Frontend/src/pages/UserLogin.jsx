import React, { useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
 
 

const UserLogIn = () => {
    const navigate = useNavigate();
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email: email, password: password };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);         
        setEmail("");
        setPassword("");
        console.log(response.data.signedUser);
        setUser(response.data.signedUser);
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-24">CodeCraft</h2>

      <div className="bg-white absolute left-[37%] top-[5%] w-[30%] px-12 py-10 min-h-[80vh] rounded-xl">
        <form onSubmit={handleSubmit}>
          <Link to={"/signup"} className="p-2 bg-black text-white rounded-xl my-8 text-center absolute w-[20%] -top-5 right-2 ">
            Sign up
          </Link>
          <h2 className="text-xl font-semibold mb-4">Log in to your account</h2>
          <label htmlFor="email">Email</label>
          <br />
          <input required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 px-4 bg-gray-100 rounded-lg w-full my-3 placeholder: text-sm"
            id="email"
            type="email"
            placeholder="Enter your email"
          />{" "}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 px-4 bg-gray-100 rounded-lg w-full my-3 placeholder: text-sm"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          <br />
          <input 
            readOnly
            className="accent-slate-900 my-3"
            id="checkbox"
            type="checkbox"
            checked
          />
          <label className="text-sm font-medium" htmlFor="checkbox">
            {" "}
            I agree to all the{" "}
            <span className="underline">Terms and Conditions</span>
          </label>{" "}
          <br />
          <button className="w-full p-2 bg-black text-white rounded-lg my-8 text-center">
            Log in
          </button>
          <p
            className="text-xs text-gray-700 text-center relative my-4"
            id="option"
          >
            Or
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogIn;
