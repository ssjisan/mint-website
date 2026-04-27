import { Suspense } from "react";
import Footer from "../Component/Home/Footer/Footer";
import Navbar from "../Component/Navbar/Navbar";
import FormConnection from "../Component/Referral/FormConnection";
import ReferralHeroSection from "../Component/Referral/ReferralHero/ReferralHeroSection";

export default function page() {
  return (
    <div>
      <Navbar />
      <ReferralHeroSection />
      <section id="referral-form" style={{ scrollMarginTop: "100px" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <FormConnection />
        </Suspense>
      </section>
      <Footer />
    </div>
  );
}
