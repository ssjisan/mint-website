import FinalCta from "@/app/Component/Home/FinalCta/FinalCta";
import Footer from "@/app/Component/Home/Footer/Footer";
import Navbar from "@/app/Component/Navbar/Navbar";
import SuccessStoriesDetails from "@/app/Component/SuccessStories/SuccessStoriesDetails/SuccessStoriesDetails";

export default function page() {
  return <div>
    <Navbar />
    <SuccessStoriesDetails />
    <FinalCta />
    <Footer />
  </div>;
}
