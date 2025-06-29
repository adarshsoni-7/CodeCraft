import { useState } from "react";
import useUser from "../context/useUser";
import axios from "axios";

const UpdateEmail = () => {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/${user._id}/email`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        ...res.data.updatedUserByEmail,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-6">
      <label htmlFor="email" className="font-medium text-xl my-4 tracking-wide">
        Email
      </label>
      <br />
      <input
         
        type="text"
        className="rounded-lg text-lg p-2 bg-[#dfdfdf] focus:outline-none w-[20%] mt-4"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="-bottom-4 my-6 ml-2 tracking-wide border border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition duration-300 hover:text-white hover:bg-black disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default UpdateEmail;
