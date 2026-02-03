"use client";

import { useEffect, useState } from "react";
import ReactParallaxTilt from "react-parallax-tilt";
import Image from "next/image";
import toast from "react-hot-toast";

import TickMarked from "../../Assets/TickMarked";
import GlowingStarCorporateOne from "../../Assets/GlowingStarCorporateOne";
import GlowingStarCorporateTwo from "../../Assets/GlowingStarCorporateTwo";
import GlowingStarCorporateThree from "../../Assets/GlowingStarCorporateThree";

import "./CorporatePackage.scss";
import { Package } from "@/app/lib/types/package";
import axios from "../../../lib/axios";
import ConnectionModal from "../ConnectionModal/ConnectionModal";
const corporateUI = [
  {
    Glow: GlowingStarCorporateOne,
    buttonClass: "primary-fill-button-corporate-one",
  },
  {
    Glow: GlowingStarCorporateTwo,
    buttonClass: "primary-fill-button-corporate-two",
  },
  {
    Glow: GlowingStarCorporateThree,
    buttonClass: "primary-fill-button-corporate-three",
  },
];

export default function CorporatePackage() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    axios.get("/packages/corporate").then((res) => {
      setPackages(res.data.packages);
    });
  }, []);
  const formatSpeed = (speedMbps: number) => {
    if (speedMbps >= 1024) {
      // Convert to Gbps
      const gbps = speedMbps / 1024;
      return `${gbps % 1 === 0 ? gbps : gbps.toFixed(2)} Gbps`; // Round to 2 decimals if needed
    }
    return `${speedMbps} Mbps`;
  };
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  };

  return (
    <div className="corporate-package-container container">
      <div className="title-for-corporate-package">
        <div className="title-body">
          <div className="icon-body">
            <Image src="/flash.png" alt="enterprise" fill />
          </div>
          <p className="heading-h6">Enterprise</p>
        </div>
      </div>

      <div className="row g-4">
        {packages.map((pkg, index) => {
          const UI = corporateUI[index % corporateUI.length];
          const Glow = UI.Glow;

          return (
            <div className="col-12 col-md-6 col-lg-4" key={pkg._id}>
              <ReactParallaxTilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffffff00"
                glarePosition="all"
                transitionSpeed={400}
              >
                <div
                  className={`corporate-package-card ${
                    index === 1 ? "famous-package" : ""
                  }`}
                >
                  <div className="glow-wrapper-two">
                    <Glow />
                  </div>

                  <div className="package-name-volume">
                    <h4 className="body">{pkg.packageName}</h4>
                    <p className="body-one">
                      BDT {pkg.price.toLocaleString()} / Month
                    </p>
                  </div>

                  <h2 className="heading-h4">{formatSpeed(pkg.speedMbps)}</h2>

                  <button
                    className={`button ${UI.buttonClass}`}
                    onClick={() => openModal(pkg)}
                  >
                    Choose {formatSpeed(pkg.speedMbps)}
                  </button>

                  <div className="package-points-deck">
                    {pkg?.items?.map((point, i) => (
                      <div className="package-point" key={point.id || i}>
                        <div className="package-point-bullet">
                          <TickMarked />
                        </div>
                        <p className="subtitle">{point.title}</p>{" "}
                        {/* Use title */}
                      </div>
                    ))}
                  </div>
                </div>
              </ReactParallaxTilt>
            </div>
          );
        })}
      </div>
      {modalOpen && (
        <ConnectionModal
          selectedPackage={selectedPackage}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
