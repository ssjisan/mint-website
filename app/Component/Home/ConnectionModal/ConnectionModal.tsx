"use client";

import { useState, useEffect } from "react";
import axios from "../../../lib/axios";
import toast from "react-hot-toast";
import "./ConnectionModal.scss";

interface Package {
  _id: string;
  packageName: string;
  speedMbps: number;
  price: number;
  type: "residential" | "corporate";
}

interface ConnectionModalProps {
  selectedPackage: Package | null;
  onClose: () => void;
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
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    setCaptchaA(a);
    setCaptchaB(b);
    setCaptchaAnswer("");
  };
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async () => {
    // Validations
    if (!name || !phone || !email || !address) {
      return toast.error("Please fill all required fields.");
    }

    if (parseInt(captchaAnswer) !== captchaA + captchaB) {
      return toast.error("Captcha answer is incorrect.");
    }

    try {
      const payload: any = {
        name,
        phone,
        email,
        address,
        packageId: selectedPackage?._id,
        packageType: selectedPackage?.type,
      };

      if (selectedPackage?.type === "corporate") {
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
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to submit request");
    }
  };

  if (!selectedPackage) return null;

  return (
    <div className="connection-modal-backdrop">
      <div className="connection-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h3>Connection Request</h3>
        <p>Package: {selectedPackage.packageName}</p>
        <p>Price: BDT {selectedPackage.price.toLocaleString()}</p>
        <p>
          Speed:{" "}
          {selectedPackage.speedMbps >= 1024
            ? `${selectedPackage.speedMbps / 1024} Gbps`
            : `${selectedPackage.speedMbps} Mbps`}
        </p>

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
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        {selectedPackage.type === "corporate" && (
          <div className="form-group">
            <label>Company Name*</label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}

        {/* CAPTCHA */}
        <div className="form-group">
          <label>
            Solve: {captchaA} + {captchaB} = ?
          </label>
          <input
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Request
        </button>
      </div>
    </div>
  );
}
