"use client";

import GlowingStarCorporateOne from "../../Assets/GlowingStarCorporateOne";
import GlowingStarCorporateThree from "../../Assets/GlowingStarCorporateThree";
import GlowingStarCorporateTwo from "../../Assets/GlowingStarCorporateTwo";
import TickMarked from "../../Assets/TickMarked";
import "./CorporatePackage.scss";

interface CorporatePackageData {
  title: string;
  speed: string;
  price: string;
  points: string[];
  buttonText: string;
  buttonClass: string;
  GlowComponent: React.FC;
}

const packages: CorporatePackageData[] = [
  {
    title: "Business Starter",
    speed: "200 Mbps",
    price: "BDT 20,000 / Month",
    points: ["SME Dedicated Bandwidth", "SLA Guarantee", "Account Manager"],
    buttonText: "Choose 200MB",
    GlowComponent: GlowingStarCorporateOne,
    buttonClass: "primary-fill-button-corporate-one",
  },
  {
    title: "Corporate Pro",
    speed: "500 Mbps",
    price: "BDT 40,000 / Month",
    points: ["Enterprise Grade Speed", "Premium SLA", "Redundant Connectivity"],
    buttonText: "Choose 500MB",
    GlowComponent: GlowingStarCorporateTwo,
    buttonClass: "primary-fill-button-corporate-two",
  },
  {
    title: "Ultimate Core",
    speed: "1 Gbps",
    price: "BDT 60,000 / Month",
    points: ["Data-Center Grade", "Zero Contention Ratio", "24/7 NOC Access"],
    buttonText: "Choose 1Gbps",
    GlowComponent: GlowingStarCorporateThree,
    buttonClass: "primary-fill-button-corporate-three",
  },
];

export default function CorporatePackage() {
  return (
    <div className="corporate-package-container container">
      <div className="title-for-focus-package">
        <p className="heading-h6">ENTERPRISE & CORPORATE</p>
      </div>
      <div className="row g-4">
        {packages.map((pkg, index) => {
          const Glow = pkg.GlowComponent;
          return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={index}>
              <div className="corporate-package-card">
                <div className="glow-wrapper-two">
                  <Glow />
                </div>
                <div className="package-name-volume">
                  {" "}
                  <h4 className="body">{pkg.title}</h4>{" "}
                  <p className="body-one">{pkg.price}</p>{" "}
                </div>
                <h2 className="heading-h4">{pkg.speed}</h2>{" "}
                <button className={`button ${pkg.buttonClass}`}>
                  {" "}
                  {pkg.buttonText}{" "}
                </button>{" "}
                <div className="package-points-deck">
                  {" "}
                  {pkg.points.map((point, i) => (
                    <div className="package-point" key={i}>
                      {" "}
                      <div className="package-point-bullet">
                        {" "}
                        <TickMarked />{" "}
                      </div>{" "}
                      <p className="subtitle">{point}</p>{" "}
                    </div>
                  ))}{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
