"use client";

import { useState, useEffect } from "react";
import axios from "../../../lib/axios";
import toast from "react-hot-toast";
import "./ConnectionModal.scss";
import Close from "../../Assets/Close";
import axiosLib from "axios"
interface Package {
  _id: string;
  packageName: string;
  speedMbps: number;
  price: number;
  type: "residential" | "corporate";
}

interface Captcha {
  id: string;
  question: string;
}

interface ConnectionModalProps {
  selectedPackage: Package | null;
  onClose: () => void;
}
interface ConnectionRequestPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  packageId?: string;
  packageType?: "residential" | "corporate";
  companyName?: string;
  referral?: boolean;
  captchaId?: string;
  captchaAnswer?: string;
}
export default function ConnectionModal({
  selectedPackage,
  onClose,
}: ConnectionModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [captcha, setCaptcha] = useState<Captcha | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(
    selectedPackage,
  );

  useEffect(() => {
    // When the modal is open, prevent background scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll when modal closes
      document.body.style.overflow = "";
    };
  }, []);
  const fetchCaptcha = async () => {
    try {
      const res = await axios.get("/captcha");
      setCaptcha(res.data.captcha);
      setCaptchaAnswer("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCaptcha()
    axios.get("/packages").then((res) => setPackages(res.data.packages));
  }, []);

  useEffect(() => {
    setSelectedPkg(selectedPackage);
  }, [selectedPackage]);

  const handleSubmit = async () => {
    if (!name || !phone || !email || !address) {
      return toast.error("Please fill all required fields.");
    }
    if (!captcha) {
      return toast.error("Captcha not loaded.");
    }

    try {
      const payload: ConnectionRequestPayload = {
        name,
        phone,
        email,
        address,
        packageId: selectedPkg?._id,
        packageType: selectedPkg?.type,
        referral: false,
        captchaId: captcha.id,
        captchaAnswer,
      };

      if (selectedPkg?.type === "corporate") {
        if (!companyName)
          return toast.error(
            "Company name is required for corporate packages.",
          );
        payload.companyName = companyName;
      }

      const res = await axios.post("/connection-request", payload);
      if (res.data.success) {
        toast.success("Connection request submitted successfully!");
        onClose();
      }
    } catch (err: unknown) {
      if (axiosLib.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Something went wrong';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  if (!selectedPkg) return null;

  return (
    <div className="connection-drawer-backdrop">
      <div className="connection-drawer">
        <button className="close-btn" onClick={onClose}>
          <Close />
        </button>
        <h3>Connection Request</h3>

        {/* Package Selector */}
        <div className="form-group">
          <label>Select Package*</label>
          <select
            value={selectedPkg._id}
            onChange={(e) =>
              setSelectedPkg(
                packages.find((p) => p._id === e.target.value) || null,
              )
            }
          >
            {packages?.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.packageName} - BDT {pkg.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Inputs */}
        <div className="form-grid">
          <div className="form-group">
            <label>Name*</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Phone*</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Address*</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {selectedPkg.type === "corporate" && (
            <div className="form-group">
              <label>Company Name*</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          )}
        </div>

        {captcha && (
          <div className="form-group">
            <label>{captcha.question}</label>
            <input
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Answer"
            />
          </div>
        )}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Request
        </button>
      </div>
    </div>
  );
}
