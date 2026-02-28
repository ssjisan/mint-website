'use client';

import Image from 'next/image';
import './ProductCard.scss';
import { Product } from "../../lib/types/products";
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
    onPreOrderClick: () => void;
}

export default function ProductCard({
    product,
    onPreOrderClick,
}: ProductCardProps) {

    let finalPrice = product.price;

    if (product.discount?.isActive) {
        if (product.discount.type === 'percentage') {
            finalPrice =
                product.price -
                (product.price * product.discount.value) / 100;
        } else if (product.discount.type === 'fixed') {
            finalPrice =
                product.price - product.discount.value;
        }

        finalPrice = Math.max(0, Math.ceil(finalPrice));
    }
    const discountText = product.discount?.isActive
        ? product.discount.type === 'percentage'
            ? `${product.discount.value}% OFF`
            : `৳${product.discount.value} OFF`
        : null;

    return (
        <Link href={`/product/${product.slug}`} className='product-card'>
            <div className='product-card-image'>
                {product.image?.url ? (
                    <Image
                        src={product.image.url}
                        alt={product.name}
                        fill
                    />
                ) : (
                    <div className='placeholder'>No Image</div>
                )}
                {discountText && <div className='discount-chip'>{discountText}</div>}
            </div>

            <div className='product-card-lower-part'>
                <div className='product-card-info'>
                    <h5>{product.name}</h5>
                    {product.discount?.isActive ? (
                        <p>
                            ৳{finalPrice.toLocaleString()}
                            <span className='original-price'>৳{product.price.toLocaleString()}</span>
                        </p>
                    ) : (
                        <p>৳{product.price.toLocaleString()}</p>
                    )}
                </div>

                <div className='pre-order-button'>
                    <button
                        className='button primary-fill-button'
                        onClick={(e) => {
                            e.preventDefault();
                            onPreOrderClick();
                        }}
                    >
                        Pre-order
                    </button>
                </div>
            </div>
        </Link>
    );
}