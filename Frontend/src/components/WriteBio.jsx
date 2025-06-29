import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import axios from "axios";

const UpdateBio = () => {  
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/${user._id}/bio`,
        { bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser((prev) => ({
        ...prev,
        ...res.data.updatedUserByBio,
      }));
       
      setBio("");
      navigate(-1);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-6">
      <label htmlFor="bio" className="font-medium text-xl my-4 tracking-wide">
        Bio
      </label>
      <br />
      <textarea  rows={5}
        className="rounded-lg text-lg p-2 bg-[#dfdfdf] focus:outline-none w-[30%] mt-4"
        placeholder="Enter your new bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      >
        </textarea>
     
      <button
        onClick={handleUpdate}
        disabled={saving}
        className="absolute  my-6 ml-2 tracking-wide border border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition duration-300 hover:text-white hover:bg-black disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
       
    </div>
  );
};

export default UpdateBio;
