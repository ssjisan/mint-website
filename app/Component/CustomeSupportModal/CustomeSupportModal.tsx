"use client";

import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import axiosLib from "axios";
import "./CustomeSupportModal.scss";
import toast from "react-hot-toast";

interface Captcha {
    id: string;
    question: string;
}

interface FormData {
    name: string;
    phone: string;
    email: string;
    officeName: string;
    address: string;
    message: string;
    captchaAnswer: string;
}

export default function CustomeSupportModal({
    onClose,
    defaultServiceName,
}: {
    onClose: () => void;
    defaultServiceName: string;
}) {
    const [captcha, setCaptcha] = useState<Captcha | null>(null);

    const [form, setForm] = useState<FormData>({
        name: "",
        phone: "",
        email: "",
        officeName: "",
        address: "",
        message: "",
        captchaAnswer: "",
    });

    // ✅ Fetch Captcha
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

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captcha) {
            toast.error("Captcha not loaded.");
            return;
        }

        try {
            await axios.post("/custom-support", {
                ...form,
                serviceName: defaultServiceName, // 🔥 hardcoded
                captchaId: captcha.id,
            });

            toast.success("Request submitted successfully!");
            onClose();
        } catch (err: unknown) {
            if (axiosLib.isAxiosError(err)) {
                const errorMessage =
                    err.response?.data?.message ||
                    "Something went wrong";
                toast.error(errorMessage);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="support-modal-overlay">
            <div className="support-modal">
                <div className="support-modal-header">
                    <h3>Talk to Sales</h3>
                    <button onClick={onClose} style={{ color: "#fff" }}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="support-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone *"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="officeName"
                        placeholder="Office Name"
                        value={form.officeName}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message *"
                        value={form.message}
                        onChange={handleChange}
                        required
                        minLength={10}
                    />

                    {/* ✅ CAPTCHA */}
                    {captcha && (
                        <div className="captcha-box">
                            <label>{captcha.question}</label>
                            <input
                                type="text"
                                name="captchaAnswer"
                                placeholder="Answer *"
                                value={form.captchaAnswer}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="button secondary-fill-button" style={{ marginTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}