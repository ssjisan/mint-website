import Image from 'next/image';
import './ProductCard.scss';
import { ProductCardProps } from "../../lib/types/products"
import Link from 'next/link';

export default function ProductCard({
    name,
    slug,
    price,
    image,
    discount,
}: ProductCardProps) {
    // Calculate discounted price if active
    let finalPrice = price;
    if (discount?.isActive) {
        if (discount.type === 'percentage') {
            finalPrice = price - (price * discount.value) / 100;
        } else if (discount.type === 'fixed') {
            finalPrice = price - discount.value;
        }

        finalPrice = Math.max(0, Math.ceil(finalPrice));
    }

    // Text to show on discount chip
    const discountText = discount?.isActive
        ? discount.type === 'percentage'
            ? `${discount.value}% OFF`
            : `৳${discount.value} OFF`
        : null;

    return (
        <Link className='product-card' href={`/product/${slug}`}>
            <div className='product-card-image'>
                {image ? (
                    <Image src={image} alt={name} fill />
                ) : (
                    <div className='placeholder'>No Image</div>
                )}

                {/* Discount Chip */}
                {discountText && <div className='discount-chip'>{discountText}</div>}
            </div>

            <div className='product-card-lower-part'>
                <div className='product-card-info'>
                    <h5>{name}</h5>
                    {discount?.isActive ? (
                        <p>
                            ৳{finalPrice.toLocaleString()}
                            <span className='original-price'>৳{price.toLocaleString()}</span>
                        </p>
                    ) : (
                        <p>৳{price.toLocaleString()}</p>
                    )}
                </div>

                <div className='pre-order-button'>
                    <button className='button primary-fill-button'>Pre-order</button>
                </div>
            </div>
        </Link>
    );
}