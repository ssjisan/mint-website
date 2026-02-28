'use client';
import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import ProductCard from './ProductCard';
import { Product, ProductQueryParams } from '../../lib/types/products';
import './ShopPage.scss';
import FilterDrawer from '../ShopFilter/FilterDrawer';
import PreOrderModal from '../PreOrderModal/PreOrderModal';

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    // Load Brands
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const [brandRes, categoryRes] = await Promise.all([
                    axios.get("/brands"),
                    axios.get("/categories"),
                ]);
                setBrands(brandRes.data);
                setCategories(categoryRes.data);
            } catch (error) {
                console.error('Brand fetch error:', error);
            }
        };

        fetchBrands();
    }, []);

    // Load Products (with brand filter)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const params: ProductQueryParams = { isPublished: true };

                if (selectedBrands.length > 0) {
                    params.brand = selectedBrands.join(',');
                }

                if (selectedCategories.length > 0) {
                    params.category = selectedCategories.join(',');
                }
                if (minPrice) {
                    params.minPrice = minPrice;
                }

                if (maxPrice) {
                    params.maxPrice = maxPrice;
                }
                const res = await axios.get('/all-products', { params });
                setProducts(res.data.products || res.data);
            } catch (err) {
                console.error('Error loading products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedBrands, selectedCategories, minPrice, maxPrice]);
    const shopPrimaryImage = selectedProduct?.images?.[0] || null;
    return (
        <div className='shop-page-container'>
            <div className='shop-page-header'>
                <button
                    className='product-filter-button button'
                    onClick={() => setIsFilterOpen(true)}
                >
                    Filter
                </button>

                <h4>All Products</h4>
                <p>Showing {products.length} results</p>
            </div>

            {loading ? (
                <div className="row g-4" style={{ padding: '40px 0px' }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-2"
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
                <div className='row g-4' style={{ padding: '40px 0px' }}>
                    {products.map(product => {
                        return (
                            <div
                                className='col-12 col-sm-6 col-md-4 col-lg-2'
                                key={product._id}
                            >
                                <ProductCard

                                    product={product}
                                    onPreOrderClick={() => setSelectedProduct(product)}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {isFilterOpen && (
                <div className="filter-overlay">
                    <div className="filter-panel">
                        <FilterDrawer
                            brands={brands}
                            categories={categories}
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            onClose={() => setIsFilterOpen(false)}
                        />
                    </div>

                    <div
                        className="overlay-bg"
                        onClick={() => setIsFilterOpen(false)}
                    />
                </div>
            )}
            {selectedProduct && (
                <PreOrderModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    primaryImage={shopPrimaryImage}

                />
            )}
        </div>
    );
}