import BelowNavbarContent from "../components/BelowNavbarContent";
import BlogCategories from "../components/BlogCategories";
import NavBar from "../components/NavBar";
import RecentPost from "../components/RecentPosts";
import FeaturedPost from "../components/FeaturedPost"
import BottomContent from "../components/BottomContent";
import SliderImagesAndFooter from "../components/SliderImagesAndFooter";

const Home = () => {
  return (
    <div className="h-min-[100vh] p-6">
      <NavBar />
      <BelowNavbarContent />
      <RecentPost />
      <BlogCategories />
      <FeaturedPost />
      <BottomContent />
      <SliderImagesAndFooter/>
    </div>
  );
};

export default Home;
