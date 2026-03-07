"use client";

import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import ReactParallaxTilt from "react-parallax-tilt";
import GlowingStar from "../../Assets/GlowingStar";
import PricingPlan from "../../Assets/PricingPlan";
import TickMarked from "../../Assets/TickMarked";
import Image from "next/image";
import toast from "react-hot-toast";
import "./FoucsPackage.scss";
import { Package } from "@/app/lib/types/package";
import ConnectionModal from "../ConnectionModal/ConnectionModal";
import ResidentialIcon from "../../Assets/ResidentialIcon";

export default function FoucsPackage() {
  const [pkg, setPkg] = useState<Package | null>(null);

  /* ---------------- Fetch residential package ---------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/packages/residential");

        // pick first or featured one
        setPkg(res.data.packages?.[0]);
      } catch {
        toast.error("Failed to load package");
      }
    };

    load();
  }, []);

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setModalOpen(true);
  };

  if (!pkg) return null;

  return (
    <div className="foucs-package-container container" >
      {/* ---------------- Header ---------------- */}
      <div className="title-for-focus-package">
        <div className="title-body">
          <div className="icon-body">
            <ResidentialIcon />
          </div>
          <p className="heading-h6">Residential</p>
        </div>
        <PricingPlan />
      </div>

      {/* ---------------- Card ---------------- */}
      <div className="focus-package-card-container">
        <div className="focus-package-card">
          <div className="glow-wrapper">
            <GlowingStar />
          </div>

          {/* Dynamic Name + Price */}
          <div className="package-name-volume">
            <h4 className="body">{pkg?.packageName}</h4>
            <p className="body-one">৳{pkg?.price}/month</p>
          </div>

          {/* Dynamic Speed */}
          <h2 className="heading-h2">{pkg?.speedMbps} Mbps</h2>

          <button
            className="button primary-fill-button"
            onClick={() => openModal(pkg)}
          >
            GET RESIDENTIAL
          </button>

          {/* Dynamic Features */}
          <div className="package-points-deck">
            {pkg?.items?.map((item) => (
              <div className="package-point" key={item.id}>
                <div className="package-point-bullet">
                  <TickMarked />
                </div>
                <p className="subtitle">{item?.title}</p>
              </div>
            ))}
          </div>
        </div>
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
