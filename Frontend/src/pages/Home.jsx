import BelowNavbarContent from "../components/BelowNavbarContent";
import BlogCategories from "../components/BlogCategories";
import NavBar from "../components/NavBar";
import RecentPost from "../components/RecentPost";

const Home = () => {
  return (
    <div className="h-min-[100vh] p-6">
      <NavBar />
      <BelowNavbarContent/>
      <RecentPost />
      <BlogCategories/>
    </div>
  );
};

export default Home;
