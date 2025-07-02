import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import axios from "axios";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async (e) => {
    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/users/${user._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear user state and local storage
      setUser(null);
      localStorage.removeItem("token");

      console.log("Account deleted");

      // Redirect to login or home page
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      {deleting ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          <p className="mt-4 text-red-600 font-medium">
            Deleting your account...
          </p>
        </div>
      ) : (
        <div>
          <p className="text-red-600 font-medium">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="my-6 tracking-wide border border-red-400 text-lg font-semibold p-2 px-6 rounded-lg transition duration-300 hover:text-white hover:bg-red-600 disabled:opacity-60"
          >
            Yes, Delete Account
          </button>{" "}
          &nbsp;
          <button
            onClick={() => navigate("/users/profile")}
            className="my-6 tracking-wide border border-red-400 text-lg font-semibold p-2 px-6 rounded-lg transition duration-300 hover:text-white hover:bg-red-600 disabled:opacity-60"
          >
            No, Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
