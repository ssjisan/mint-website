"use client";
import "./ProductBasic.scss"
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
}) {
    return (
        <div className="p-3">

            {/* Product Name */}
            <h2 className="mb-3">{name}</h2>

            {/* Brand + Product Code */}
            <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                {brand?.name && (
                    <span className="badge bg-light text-dark border px-3 py-2">
                        <span className="text-muted me-1">Brand:</span>
                        <strong>{brand.name}</strong>
                    </span>
                )}

                {productCode && (
                    <span className="badge bg-light text-secondary border px-3 py-2">
                        {productCode}
                    </span>
                )}
            </div>

            {/* Price Section */}
            <div className="mb-3">
                {showPrice ? (
                    discount?.isActive ? (
                        <div className="d-flex align-items-center gap-3">
                            <h1 className="text-primary mb-0">৳{finalPrice}</h1>
                            <span className="text-muted text-decoration-line-through fs-5">
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
            <div className="mb-3">
                <button className="btn btn-primary">
                    Pre-order
                </button>
            </div>

            {/* Short Description */}
            {shortDescriptionHTML && (
                <div
                    className="mb-3"
                    dangerouslySetInnerHTML={{ __html: shortDescriptionHTML }}
                />
            )}

            {/* View More Button */}
            {onViewMore && (
                <button
                    className="btn btn-link p-0 text-decoration-underline"
                    onClick={onViewMore}
                >
                    View more details
                </button>
            )}
        </div>
    );
}

