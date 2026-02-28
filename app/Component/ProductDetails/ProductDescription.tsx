"use client";

import { useRef } from "react";


export default function ProductDescription({ descriptionHTML, specifications }) {
    const specRef = useRef(null);
    const descRef = useRef(null);

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
                <button onClick={scrollToSpec} className="btn btn-primary">
                    Specification
                </button>
                <button onClick={scrollToDesc} className="btn btn-outline-primary">
                    Description
                </button>
            </div>

            {/* ================= SPECIFICATION ================= */}
            <div
                ref={specRef}
                className="p-4  rounded"
                style={{ scrollMarginTop: "100px" }}
            >
                <h5 className="mb-4">Specification</h5>

                {specifications?.map((group, index) => (
                    <div key={index} className="mb-4">

                        {/* Group Title */}
                        <div
                            className="px-3 py-2 mb-3 rounded"
                            style={{
                                background: "#eeeafa",
                            }}
                        >
                            <strong style={{ color: "#792DF8" }}>
                                {group.groupTitle}
                            </strong>
                        </div>

                        {/* Items */}
                        {group.items?.map((item, idx) => (
                            <div key={idx} className="mb-3">

                                <div className="row">
                                    {/* Label */}
                                    <div className="col-12 col-sm-4 col-md-3 text-muted fw-medium">
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
                className="p-4  rounded mt-4"
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

