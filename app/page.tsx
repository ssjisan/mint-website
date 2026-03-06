import CorporatePackage from "./Component/Home/CorporatePackage/CorporatePackage";
import FinalCta from "./Component/Home/FinalCta/FinalCta";
import Footer from "./Component/Home/Footer/Footer";
import HeroSection from "./Component/Home/HeroSection/HeroSection";
import MintDifference from "./Component/Home/MintDifference/MintDifference";
import FoucsPackage from "./Component/Home/Packages/FoucsPackage";
import Shop from "./Component/Home/Shop/Shop";
import SoC from "./Component/Home/SoC/SoC";
import StacklinkBacked from "./Component/Home/StarlinkBacked/StacklinkBacked";
import SuccessStories from "./Component/Home/SuccessStories/SuccessStories";
import Navbar from "./Component/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MintDifference />
      <section id="residential">
        <FoucsPackage />
      </section>
      <section id="enterprise">
        <CorporatePackage />
      </section>
      <section id="security">
        <SoC />
      </section>
      <StacklinkBacked />
      <Shop />
      <section id="stories">
        <SuccessStories />
      </section>
      <FinalCta />
      <Footer />
    </div>
  );
}
