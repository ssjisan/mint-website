"use client";

import { useRef } from "react";
import { Specifications } from "../../../lib/types/products";
import "./ProductDescription.scss"

interface ProductDescriptionProps {
    descriptionHTML?: string;
    specifications?: Specifications[];
}

export default function ProductDescription({
    descriptionHTML,
    specifications,
}: ProductDescriptionProps) {
    {
        const specRef = useRef<HTMLDivElement | null>(null);
        const descRef = useRef<HTMLDivElement | null>(null);

        const scrollToSpec = () => {
            specRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        const scrollToDesc = () => {
            descRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        return (
            <div className="mt-5">

                {/* Top Buttons */}
                <div className="d-flex gap-3 mb-4">
                    <button onClick={scrollToSpec} className="tab-button filled">
                        Specification
                    </button>
                    <button onClick={scrollToDesc} className="tab-button outlined">
                        Description
                    </button>
                </div>

                {/* ================= SPECIFICATION ================= */}
                <div
                    ref={specRef}
                    className="p-4  rounded description-container"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <h5 className="mb-4">Specification</h5>

                    {specifications?.map((group, index) => (
                        <div key={index} className="mb-4">

                            {/* Group Title */}
                            <div
                                className="px-3 py-2 mb-3 rounded specification-part"
                            >
                                <strong>
                                    {group.groupTitle}
                                </strong>
                            </div>

                            {/* Items */}
                            {group.items?.map((item, idx) => (
                                <div key={idx} className="mb-3">

                                    <div className="row">
                                        {/* Label */}
                                        <div className="col-12 col-sm-4 col-md-3 specification-label fw-medium">
                                            {item.label}
                                        </div>

                                        {/* Value */}
                                        <div className="col-12 col-sm-8 col-md-9 fw-medium">
                                            {item.value}
                                        </div>
                                    </div>

                                    <hr className="my-2" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* ================= DESCRIPTION ================= */}
                <div
                    ref={descRef}
                    className="p-4  rounded mt-4 description-container"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <h5 className="mb-4">Description</h5>

                    {descriptionHTML && (
                        <div dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
                    )}
                </div>
            </div>
        );
    }
}