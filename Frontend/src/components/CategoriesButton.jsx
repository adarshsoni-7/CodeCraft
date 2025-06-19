import { Link } from "react-router-dom";
const categoryList = [
  "Hobbies",
  "Gaming",
  "Automotive",
  "Pet Care",
  "Science",
  "Work Life",
  "Social Issues",
  "Entertainment",
  "Travel & Culture",
  "Technology",
  "Lifestyle",
];

const CategoriesButton = () => {
  return (
    <div className="p-6 text-center mb-14">
      {categoryList.map((cat) => (
        <Link to={`/category/${cat}`} key={cat}>
          {" "}
          <button className="mr-14 my-6 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold px-5 py-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
            {cat}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesButton;
