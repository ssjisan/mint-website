"use client";

import { useState, useEffect } from "react";
import axios from "../../../lib/axios";
import toast from "react-hot-toast";
import "./ConnectionModal.scss";
import Close from "../../Assets/Close";

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
interface ConnectionRequestPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  packageId?: string;
  packageType?: "residential" | "corporate";
  companyName?: string;
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
  // Generate simple captcha
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    setCaptchaA(a);
    setCaptchaB(b);
    setCaptchaAnswer("");
  };

  useEffect(() => {
    generateCaptcha();
    // Fetch packages from API
    axios.get("/packages").then((res) => setPackages(res.data.packages));
  }, []);

  useEffect(() => {
    setSelectedPkg(selectedPackage);
  }, [selectedPackage]);

  const handleSubmit = async () => {
    if (!name || !phone || !email || !address) {
      return toast.error("Please fill all required fields.");
    }
    if (parseInt(captchaAnswer) !== captchaA + captchaB) {
      return toast.error("Captcha answer is incorrect.");
    }

    try {
      const payload: ConnectionRequestPayload = {
        name,
        phone,
        email,
        address,
        packageId: selectedPkg?._id,
        packageType: selectedPkg?.type,
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
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to submit request");
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
