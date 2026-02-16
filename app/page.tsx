import CorporatePackage from "./Component/Home/CorporatePackage/CorporatePackage";
import FinalCta from "./Component/Home/FinalCta/FinalCta";
import Footer from "./Component/Home/Footer/Footer";
import HeroSection from "./Component/Home/HeroSection/HeroSection";
import MintDifference from "./Component/Home/MintDifference/MintDifference";
import MintExperience from "./Component/Home/MintExperience/MintExperience";
import FoucsPackage from "./Component/Home/Packages/FoucsPackage";
import SuccessStories from "./Component/Home/SuccessStories/SuccessStories";
import Navbar from "./Component/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MintExperience />
      <FoucsPackage />
      <CorporatePackage />
      <SuccessStories />
      <MintDifference />
      <FinalCta />
      <Footer />
    </div>
  );
}
