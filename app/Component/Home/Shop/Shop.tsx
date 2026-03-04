"use client";

import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import ProductCard from "../../Shop/ProductCard";
import { Product } from "../../../lib/types/products";
import "./Shop.scss";
import PreOrderModal from "../../PreOrderModal/PreOrderModal";
import Link from "next/link";

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // ✅ Fetch Featured Products
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);

                const res = await axios.get("/featured-products", {
                    params: {
                        limit: 8, // optional
                    },
                });

                setProducts(res.data.products || []);
            } catch (error) {
                console.error("Error loading featured products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="shop-container container">
            <div className="starlink-shop-header">
                <h2 className="heading-h3">
                    Official Starlink Kits in Bangladesh — Exclusive Deals from Mint
                </h2>
            </div>

            {loading ? (
                <div className="row g-4" style={{ padding: "40px 0px" }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={index}
                        >
                            <div className="product-skeleton-card">
                                <div className="skeleton image" />
                                <div className="skeleton title" />
                                <div className="skeleton text" />
                                <div className="skeleton button" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row g-4" style={{ padding: "40px 0px" }}>
                    {products.map((product) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={product._id}
                        >
                            <ProductCard
                                product={product}
                                onPreOrderClick={() =>
                                    setSelectedProduct(product)
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "24px 0px",
                }}
            >
                <Link
                    href="/shop"
                    className="button secondary-outline-button"
                    style={{ width: "220px" }}
                >
                    Explore Full Shop
                </Link>
            </div>

            {selectedProduct && (
                <PreOrderModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}