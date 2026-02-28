"use client";
import { useMemo, useState } from "react";
import "./ProductGallery.scss";
import Image from "next/image";
import { ProductImage } from "../../../lib/types/products";

interface ProductGalleryProps {
    images?: ProductImage[];
}


export default function ProductGallery({
    images = [],
}: ProductGalleryProps) {
    const defaultIndex = useMemo(() => {
        if (!images.length) return 0;
        const primaryIndex = images.findIndex((img) => img.isPrimary);
        return primaryIndex !== -1 ? primaryIndex : 0;
    }, [images]);

    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    // If images array changes completely, reset active index
    if (activeIndex >= images.length) {
        setActiveIndex(defaultIndex);
    }

    if (!images.length) {
        return <div className="text-muted">No images available</div>;
    }

    const activeImage = images[activeIndex];

    return (
        <div className="product-image-gallery">
            {/* Main Viewer */}
            <div className="image-viewer">
                <Image
                    src={activeImage.url}
                    alt={activeImage.alt || "product"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="thumbnail-wrapper">
                {images.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`thumbnail ${activeIndex === index ? "active" : ""
                            }`}
                    >
                        <Image
                            src={img.url}
                            alt={img.alt || "thumbnail"}
                            fill
                            sizes="80px"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}