"use client";
import "./ProductBasic.scss"
import { Discount } from "../../../lib/types/products";
import ContentRenderer from "@/app/lib/html2text";

interface Brand {
    name: string;
}

interface ProductBasicProps {
    name: string;
    brand?: Brand;
    price: number;
    finalPrice?: number;
    shortDescriptionHTML?: string;
    productCode?: string;
    showPrice?: boolean;
    discount?: Discount;
    onViewMore?: () => void;
    category?: { name?: string };
    onPreOrder?: () => void;
}


export default function ProductBasic({
    name,
    brand,
    price,
    finalPrice,
    shortDescriptionHTML,
    productCode,
    showPrice,
    discount,
    onViewMore,
    onPreOrder
}: ProductBasicProps) {
    return (
        <div>
            <h2 className="product-name">{name}</h2>
            <div className="info-deck">
                {brand?.name && (
                    <div className="info-deck-badge">
                        <span className="badge-title">Brand:</span>
                        <strong>{brand.name}</strong>
                    </div>
                )}

                {productCode && (
                    <div className="info-deck-badge">
                        <span className="badge-title">Code:</span>
                        <strong>{productCode}</strong>
                    </div>

                )}
            </div>

            {/* Price Section */}
            <div className="price-deck">
                {showPrice ? (
                    discount?.isActive ? (
                        <div className="d-flex align-items-center gap-3">
                            <h1>৳{finalPrice}</h1>
                            <span className="text-decoration-line-through fs-5">
                                ৳{price}
                            </span>
                        </div>
                    ) : (
                        <h3 className="mb-0">৳{price}</h3>
                    )
                ) : (
                    <h5 className="text-muted">Call us for detailed price</h5>
                )}
            </div>

            {/* Pre Order Button */}
            <div className="pre-order-button-deck">
                <button className="button pre-order-button" onClick={onPreOrder}>
                    Pre-order
                </button>
            </div>

            {shortDescriptionHTML && (
                <div className="mb-3">
                    <ContentRenderer html={shortDescriptionHTML} />
                </div>
            )}

            {/* View More Button */}
            {onViewMore && (
                <button
                    className="details-page-view-more-button"
                    onClick={onViewMore}
                >
                    View more details
                </button>
            )}
        </div>
    );
}

