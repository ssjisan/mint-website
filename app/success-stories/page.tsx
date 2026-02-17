import React from "react";
import FinalCta from "../Component/Home/FinalCta/FinalCta";
import SuccessStoriesList from "../Component/SuccessStories/SuccessStoriesList/SuccessStoriesList";

export default function page() {
  return <div><SuccessStoriesList />
    <FinalCta />
  </div>;
}
