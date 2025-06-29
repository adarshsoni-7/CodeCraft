import { useState } from "react";
import useUser from "../context/useUser";
import axios from "axios";

const EditUsername = () => {
  const { user, setUser } = useUser();
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/${user._id}/username`,
        { fullname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.updatedUser);

       
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-6">
      <label
        htmlFor="fullname"
        className="font-medium text-xl my-4 tracking-wide"
      >
        Username
      </label>
      <br />
      <input
        id="fullname"
        type="text"
        className="rounded-lg text-lg p-2 bg-[#dfdfdf] focus:outline-none w-[20%] mt-4"
        placeholder="Enter your fullname"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
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

export default EditUsername;
