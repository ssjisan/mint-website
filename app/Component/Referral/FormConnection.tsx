"use client";

import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
import "./FormConnection.scss";
import axiosLib from "axios"
import { useRouter } from "next/navigation";
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

interface ConnectionRequestPayload {
    name: string;
    phone: string;
    email: string;
    address: string;
    packageId?: string;
    packageType?: "residential" | "corporate";
    companyName?: string;
    referral?: boolean;
    captchaAnswer: string;
    captchaId?: string;
}

export default function FormConnection() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [captcha, setCaptcha] = useState<Captcha | null>(null);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchCaptcha = async () => {
            try {
                const res = await axios.get("/captcha");
                setCaptcha(res.data.captcha);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCaptcha();
    }, []);

    useEffect(() => {

        axios.get("/packages").then((res) => {
            const fetchedPackages = res.data.packages;
            setPackages(fetchedPackages);

        });
    }, []);

    const handleSubmit = async () => {
        if (!name || !phone || !email || !address) {
            return toast.error("Please fill all required fields.");
        }

        if (!selectedPkg) {
            return toast.error("Please select a package.");
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
                packageId: selectedPkg._id,
                packageType: selectedPkg.type,
                referral: true,
                captchaAnswer,
                captchaId: captcha.id
            };

            if (selectedPkg.type === "corporate") {
                if (!companyName) {
                    return toast.error(
                        "Company name is required for corporate packages."
                    );
                }
                payload.companyName = companyName;
            }

            const res = await axios.post("/connection-request", payload);

            if (res.data.success) {
                toast.success("Connection request submitted successfully!");

                // Reset form
                setName("");
                setPhone("");
                setEmail("");
                setAddress("");
                setCompanyName("");
                router.push("/");
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

    return (
        <div className="form-connection-wrapper">
            <div className="form-connection-card">
                <h3>Connection Request</h3>

                {/* Package Selector */}
                <div className="form-group">
                    <label>Select Package*</label>
                    <select
                        value={selectedPkg?._id || ""}
                        onChange={(e) =>
                            setSelectedPkg(
                                packages.find((p) => p._id === e.target.value) || null
                            )
                        }
                    >
                        <option value="" disabled>
                            -- Select a Package --
                        </option>

                        {packages.map((pkg) => (
                            <option key={pkg._id} value={pkg._id}>
                                {pkg.packageName} ({pkg.speedMbps} Mbps) - BDT{" "}
                                {pkg.price.toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

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

                    {selectedPkg?.type === "corporate" && (
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