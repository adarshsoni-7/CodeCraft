import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
 

const UserLogout = () => {
  const {setUser} = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${token},` },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error.response.data);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);
  return null;
};

export default UserLogout;
