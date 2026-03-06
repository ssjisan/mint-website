import React from "react";
import FinalCta from "../Component/Home/FinalCta/FinalCta";
import SuccessStoriesList from "../Component/SuccessStories/SuccessStoriesList/SuccessStoriesList";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Home/Footer/Footer";

export default function page() {
  return <div>
    <Navbar />
    <SuccessStoriesList />
    <FinalCta />
    <Footer />
  </div>;
}
