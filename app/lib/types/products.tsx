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

export interface SpecificationItem {
    label: string;
    value: string;
}

// Group of specifications
export interface Specifications {
    groupTitle: string;
    items: SpecificationItem[];
}
// API product (what comes from backend)
export interface Product {
    _id: string;
    name: string;
    price: number;
    slug: string;

    brand?: {
        name: string;
    };

    category?: {
        name: string;
    };

    images?: ProductImage[];

    shortDescriptionHTML?: string;
    descriptionHTML?: string;
    specifications?: Specifications[];

    productCode?: string;
    showPrice?: boolean;

    discount?: Discount;
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