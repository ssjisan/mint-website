import CorporatePackage from "./Component/Home/CorporatePackage/CorporatePackage";
import HeroSection from "./Component/Home/HeroSection/HeroSection";
import MintDifference from "./Component/Home/MintDifference/MintDifference";
import MintExperience from "./Component/Home/MintExperience/MintExperience";
import FoucsPackage from "./Component/Home/Packages/FoucsPackage";
import Navbar from "./Component/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MintExperience />
      <FoucsPackage />
      <CorporatePackage />
      <MintDifference />
    </div>
  );
}
