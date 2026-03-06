"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "../../lib/axios";
import "./SurveyForm.scss";
import toast from "react-hot-toast";
import axiosLib from "axios";

interface Question {
    _id: string;
    questionText: string;
    type: "rating" | "yes_no" | "comment";
}

interface SurveyTemplate {
    _id: string;
    title: string;
    description?: string;
    questions: Question[];
}

export default function SurveyForm() {
    const { id } = useParams();

    const [template, setTemplate] = useState<SurveyTemplate | null>(null);
    const [answers, setAnswers] = useState<Record<string, string | number>>({});
    const [step, setStep] = useState(1);
    const router = useRouter();

    const [customerInfo, setCustomerInfo] = useState({
        customerName: "",
        customerId: "",
        email: "",
        phone: "",
    });

    // ========================
    // Fetch Template
    // ========================
    useEffect(() => {
        if (!id) return;

        const fetchTemplate = async () => {
            try {
                const res = await axios.get(`/survey-template/${id}`);
                setTemplate(res.data.data);
            } catch (err) {
                if (axiosLib.isAxiosError(err)) {
                    const errorMessage =
                        err.response?.data?.message ||
                        "Failed to load template";
                    toast.error(errorMessage);
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        };

        fetchTemplate();
    }, [id]);

    // ========================
    // Handle Answer Change
    // ========================
    const handleChange = (questionId: string, value: string | number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    // ========================
    // Render Question Input
    // ========================
    const renderInput = (q: Question) => {
        switch (q.type) {
            case "rating":
                return (
                    <div style={{ display: "flex", gap: "10px" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{
                                    cursor: "pointer",
                                    fontSize: "28px",
                                    color: Number(answers[q._id]) >= star ? "#8e44ad" : "#ccc",
                                }}
                                onClick={() => handleChange(q._id, star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                );

            case "yes_no":
                return (
                    <div className="survey-yes-no-deck">
                        <div
                            className={`survey-yes-no ${answers[q._id] === "yes" ? "survey-yes-no-active" : ""
                                }`}
                            onClick={() => handleChange(q._id, "yes")}
                        >
                            Yes
                        </div>

                        <div
                            className={`survey-yes-no ${answers[q._id] === "no" ? "survey-yes-no-active" : ""
                                }`}
                            onClick={() => handleChange(q._id, "no")}
                        >
                            No
                        </div>
                    </div>
                );

            case "comment":
                return (
                    <textarea
                        rows={4}
                        style={{ width: "100%" }}
                        placeholder="Write your feedback..."
                        onChange={(e) => handleChange(q._id, e.target.value)}
                    />
                );

            default:
                return null;
        }
    };

    // ========================
    // Submit Survey
    // ========================
    const handleSubmit = async () => {
        try {
            const formattedAnswers = Object.keys(answers).map((key) => ({
                questionId: key,
                answer: answers[key],
            }));

            await axios.post("/survey-response", {
                templateId: id,
                ...customerInfo,
                answers: formattedAnswers,
            });

            router.push("/")
            toast.success("Survey submitted successfully!");
            setAnswers({});
            setCustomerInfo({
                customerName: "",
                customerId: "",
                email: "",
                phone: "",
            });
            setStep(1);
        } catch (err: unknown) {
            if (axiosLib.isAxiosError(err)) {
                const errorMessage =
                    err.response?.data?.message ||
                    "Submission failed";
                toast.error(errorMessage);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    // ========================
    // UI
    // ========================
    return (
        <div className="container survey-form-container">
            <div className="survey-form">

                <div className="form-content-header">
                    <h3 className="heading-h3">{template?.title}</h3>
                    <p className="subtitle">{template?.description}</p>
                </div>

                {/* CONTENT AREA */}
                <div className="survey-content">
                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            {template?.questions?.map((q: Question, i) => (
                                <div key={q._id} className="question-item">
                                    <p className="subtitle">
                                        {i + 1}. {q.questionText}
                                    </p>
                                    {renderInput(q)}
                                </div>
                            ))}
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <input
                                type="text"
                                placeholder="Name"
                                value={customerInfo.customerName}
                                onChange={(e) =>
                                    setCustomerInfo({
                                        ...customerInfo,
                                        customerName: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Customer ID"
                                value={customerInfo.customerId}
                                onChange={(e) =>
                                    setCustomerInfo({
                                        ...customerInfo,
                                        customerId: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={customerInfo.email}
                                onChange={(e) =>
                                    setCustomerInfo({
                                        ...customerInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={customerInfo.phone}
                                onChange={(e) =>
                                    setCustomerInfo({
                                        ...customerInfo,
                                        phone: e.target.value,
                                    })
                                }
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="survey-footer">
                {step === 1 && (
                    <button onClick={() => setStep(2)} className="button secondary-fill-button">
                        Next
                    </button>
                )}

                {step === 2 && (
                    <>
                        <button onClick={() => setStep(1)} className="button inherit-outline-button">
                            Back
                        </button>

                        <button onClick={handleSubmit} className="button secondary-fill-button">
                            Submit Survey
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}