import BelowNavbarContent from "../components/BelowNavbarContent";
import BlogCategories from "../components/BlogCategories";
import NavBar from "../components/navbar/NavBar";
import RecentPost from "../components/RecentPosts";
import FeaturedPost from "../components/FeaturedPost";
import BottomContent from "../components/BottomContent";
import SliderImagesAndFooter from "../components/SliderImagesAndFooter";
import { useState } from "react";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [newsletterPanel, setNewsletterPanel] = useState(false);
   
  return (
    <div className="h-[100vh] z-40 ">
      <NewsLetter newsletterPanel={newsletterPanel} setNewsletterPanel={setNewsletterPanel} />
      <NavBar setNewsletterPanel={setNewsletterPanel} />
      <BelowNavbarContent />
      <RecentPost />
      <BlogCategories />
      <FeaturedPost />
      <BottomContent />
      <SliderImagesAndFooter />
    </div>
  );
};

export default Home;
