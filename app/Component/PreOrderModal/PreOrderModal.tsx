'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from '../../lib/axios';
import './PreOrderModal.scss';
import { Product } from '../../lib/types/products';
import toast from 'react-hot-toast';
import Placeholder from "../../../public/Sub Container.png";
import axiosLib from "axios";
import Link from 'next/link';

interface Props {
    product: Product;
    onClose: () => void;
}
interface Captcha {
    id: string;
    question: string;
}
interface FormData {
    name: string;
    phone: string;
    email: string;
    address: string;
    captchaAnswer: string;
}

export default function PreOrderModal({ product, onClose }: Props) {
    const [captcha, setCaptcha] = useState<Captcha | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        address: '',
        captchaAnswer: '',
    });

    // 1. Fetch captcha
    useEffect(() => {
        const fetchCaptcha = async () => {
            try {
                const res = await axios.get('/captcha');
                setCaptcha(res.data.captcha);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCaptcha();
    }, []);

    // 2. ✅ COUNTDOWN TIMER LOGIC
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isSubmitted && countdown > 0) {
            // Decrease countdown every 1 second
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (isSubmitted && countdown === 0) {
            // Close modal when time reaches zero
            onClose();
        }

        // Cleanup interval on unmount or when dependencies change
        return () => clearInterval(timer);
    }, [isSubmitted, countdown, onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const displayImage =
        product.images?.find(img => img.isPrimary)?.url ||
        product.images?.[0]?.url ||
        (product).image?.url ||
        Placeholder;

    const handleSubmit = async () => {
        if (!captcha) return;
        try {
            await axios.post('/product-pre-order', {
                productId: product._id,
                ...formData,
                captchaId: captcha.id,
            });
            setIsSubmitted(true);
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
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{isSubmitted ? 'Order Confirmed' : 'Pre-Order'}</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    {!isSubmitted ? (
                        <>
                            <div className="product-preview">
                                <div className="preview-image">
                                    <Image src={displayImage} alt={product.name} width={64} height={64} />
                                </div>
                                <div className="preview-info">
                                    <h4>{product.name}</h4>
                                    <p>৳{product.price}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <input name="name" placeholder="Full Name" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input name="phone" placeholder="Phone Number" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input name="email" placeholder="Email (Optional)" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <textarea name="address" placeholder="Address" onChange={handleChange} />
                            </div>
                            {captcha && (
                                <div className="form-group captcha-box">
                                    <label>{captcha.question}</label>
                                    <input name="captchaAnswer" placeholder="Answer" onChange={handleChange} />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="success-message-container text-center py-4">
                            <div className="success-icon mb-3" style={{ fontSize: '3rem' }}>🎉</div>
                            <h2 className="fw-bold mb-3" style={{ color: '#28a745' }}>Congratulations!</h2>
                            <p className="fs-5">
                                Your pre-order for <strong>{product.name}</strong> has been submitted successfully.
                            </p>
                            <p className="mt-4">
                                This window will close automatically in <strong style={{ color: '#dc3545' }}>{countdown} seconds</strong>.
                            </p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    {!isSubmitted ? (
                        <>
                            <button className="button cancel-btn" onClick={onClose}>Cancel</button>
                            <button className="button primary-fill-button" onClick={handleSubmit}>Submit</button>
                        </>
                    ) : (
                        <Link href="/" className="button primary-fill-button w-100 text-center text-decoration-none" onClick={onClose}>
                            Go to Home
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}