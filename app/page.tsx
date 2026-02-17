import CorporatePackage from "./Component/Home/CorporatePackage/CorporatePackage";
import FinalCta from "./Component/Home/FinalCta/FinalCta";
import HeroSection from "./Component/Home/HeroSection/HeroSection";
import MintDifference from "./Component/Home/MintDifference/MintDifference";
import MintExperience from "./Component/Home/MintExperience/MintExperience";
import FoucsPackage from "./Component/Home/Packages/FoucsPackage";
import StacklinkBacked from "./Component/Home/StarlinkBacked/StacklinkBacked";
import SuccessStories from "./Component/Home/SuccessStories/SuccessStories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MintExperience />
      <FoucsPackage />
      <CorporatePackage />
      <StacklinkBacked />
      <SuccessStories />
      <MintDifference />
      <FinalCta />
    </div>
  );
}
