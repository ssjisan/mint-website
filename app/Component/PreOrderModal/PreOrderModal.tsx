'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from '../../lib/axios';
import './PreOrderModal.scss';
import { Product } from '../../lib/types/products';
import toast from 'react-hot-toast';
import Placeholder from "../../../public/Sub Container.png"
interface Props {
    product: Product;
    onClose: () => void;
    primaryImage?: {
        url: string;
        alt?: string;
    } | null;
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
export default function PreOrderModal({ product,
    onClose,
    primaryImage, }: Props) {
    const [captcha, setCaptcha] = useState<Captcha | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        address: '',
        captchaAnswer: '',
    });

    // Fetch captcha when modal opens

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
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        if (!captcha) return;
        try {
            await axios.post('/product-pre-order', {
                productId: product._id,
                ...formData,
                captchaId: captcha.id,
            });

            alert('Pre-order submitted!');
            onClose();
        } catch (err: unknown) {
            toast.error(err.response?.data?.message || 'Error');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                {/* Header */}
                <div className="modal-header">
                    <h3>Pre-Order</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Body */}
                <div className="modal-body">

                    {/* Product Preview */}
                    <div className="product-preview">
                        <div className="preview-image">
                            <Image
                                src={primaryImage?.url || Placeholder}
                                alt={product.name}
                                width={64}
                                height={64}
                            />
                        </div>

                        <div className="preview-info">
                            <h4>{product.name}</h4>
                            <p>৳{product.price}</p>
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="form-group">
                        <input
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            name="phone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            name="email"
                            placeholder="Email (Optional)"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Captcha */}
                    {captcha && (
                        <div className="form-group captcha-box">
                            <label>{captcha.question}</label>
                            <input
                                name="captchaAnswer"
                                placeholder="Answer"
                                onChange={handleChange}
                            />
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="modal-footer">
                    <button className="button cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="button primary-fill-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
}