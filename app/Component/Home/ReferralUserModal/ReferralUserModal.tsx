"use client";

import { useEffect, useState } from "react";
import axios from "@/app/lib/axios";
import toast from "react-hot-toast";
import "./ReferralUserModal.scss";
import axiosLib from "axios";

type Props = {
  onClose: () => void;
  onSuccess: (user: any) => void;
};

export default function ReferralUserModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const STORAGE_KEY = "mint_referral_user";
  const BASE = "http://localhost:3000/referral";

  const handleSubmit = async () => {
    if (!name || !phone) {
      toast.error("Name and phone required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/referral-setup", {
        name,
        phone,
      });

      const user = res.data.data;

      // store locally
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

      // copy link
      const link = `${BASE}?ref=${user.referralId}`;

      await navigator.clipboard.writeText(link);

      toast.success("Referral link copied!");

      onSuccess(user);
      onClose();
    } catch (err: unknown) {
      if (axiosLib.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Referral Setup</h2>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="01XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="get-now-button"
          >
            {loading ? "Processing..." : "Generate Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
