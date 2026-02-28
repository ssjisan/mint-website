// lib/types/products.ts

export interface Discount {
    type: 'none' | 'percentage' | 'fixed';
    value: number;
    isActive: boolean;
}

// Image from backend
export interface ProductImage {
    url: string;
    alt?: string;
    isPrimary?: boolean;
}

// API product (what comes from backend)
export interface Product {
    _id: string;
    name: string;
    price: number;
    discount?: Discount;
    image?: {
        url: string;
    };
    slug: string;

}

// Props for ProductCard component
export interface ProductCardProps {
    name: string;
    slug: string;
    price: number;
    image?: string;
    discount?: Discount;
}

export interface ProductQueryParams {
    isPublished: boolean;
    brand?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
}