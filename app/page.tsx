import CorporatePackage from "./Component/Home/CorporatePackage/CorporatePackage";
import FinalCta from "./Component/Home/FinalCta/FinalCta";
import HeroSection from "./Component/Home/HeroSection/HeroSection";
import MintDifference from "./Component/Home/MintDifference/MintDifference";
import MintExperience from "./Component/Home/MintExperience/MintExperience";
import FoucsPackage from "./Component/Home/Packages/FoucsPackage";
import SoC from "./Component/Home/SoC/SoC";
import StacklinkBacked from "./Component/Home/StarlinkBacked/StacklinkBacked";
import SuccessStories from "./Component/Home/SuccessStories/SuccessStories";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section id="why-mint">
        <MintDifference />
      </section>
      <section id="pricing">
        <FoucsPackage />
      </section>
      <CorporatePackage />
      <section id="security">
        <SoC />
      </section>
      <section id="starlink-connectivity">
        <StacklinkBacked />
      </section>
      <section id="stories">
        <SuccessStories />
      </section>
      <section id="experience">
        <MintExperience />
      </section>
      <FinalCta />
    </div>
  );
}
