import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">    
        <h1 className="text-[18rem] font-extrabold ">404</h1>
        <p className="text-3xl">Oops! Something went wrong...</p>
        <p className="text-gray-500 mt-2">We can’t find the page you’re looking for.</p>
        <Link to={"/home"}>
        <button    
        className=" my-6 ml-2 tracking-wide border border-[#c2c1c1ec]  font-semibold p-2 px-6 rounded-lg transition duration-300 hover:text-white hover:bg-black disabled:opacity-60"
      >
       Return Home
      </button></Link>
         
    </div>
  );
}

export default NotFound;