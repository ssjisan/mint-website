"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "../../lib/axios";

import ProductGallery from "./ProductGallery/ProductGallery";
import ProductBasic from "./ProductBasic/ProductBasic";
import ProductDescription from "./ProductDescription";
import "./ProductDetatils.scss"

export default function ProductDetails() {
    const { slug } = useParams();
    console.log(slug);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const detailsRef = useRef(null);

    const scrollToDetails = () => {
        detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        if (!slug) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/product/${slug}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    // ✅ Sort images (Primary first)
    const sortedImages = useMemo(() => {
        if (!product?.images) return [];
        return [...product.images].sort(
            (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0)
        );
    }, [product]);

    // ✅ Price calculation
    const price = Number(product?.price || 0);

    const finalPrice = useMemo(() => {
        if (!product?.discount?.isActive) return price;

        const { type, value } = product.discount;
        let calculated = price;

        if (type === "fixed") {
            calculated = price - Number(value || 0);
        }

        if (type === "percentage") {
            calculated = price - (price * Number(value || 0)) / 100;
        }

        if (calculated < 0) calculated = 0;

        return Math.ceil(calculated);
    }, [product, price]);

    if (loading) return <div className="container product-details-container">Loading...</div>;
    if (!product) return <div className="container product-details-container">Product not found</div>;

    return (
        <div className="container product-details-container">
            <div className="row g-4">
                {/* LEFT - GALLERY */}
                <div className="col-12 col-md-5">
                    <ProductGallery images={sortedImages} />
                </div>

                {/* RIGHT - BASIC INFO */}
                <div className="col-12 col-md-7">
                    <ProductBasic
                        name={product.name}
                        brand={product.brand}
                        category={product.category}
                        price={price}
                        finalPrice={finalPrice}
                        showPrice={product.showPrice}
                        shortDescriptionHTML={product.shortDescriptionHTML}
                        productCode={product.productCode}
                        discount={product.discount}
                        onViewMore={scrollToDetails}
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="col-12 col-md-8">
                    <div ref={detailsRef} style={{ scrollMarginTop: "100px" }}>
                        <ProductDescription
                            descriptionHTML={product.descriptionHTML}
                            specifications={product.specifications}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}