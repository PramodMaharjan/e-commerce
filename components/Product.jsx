import { urlFor } from '../lib/client';
import Link from 'next/link';

const Product = ({
    product: { name, image, price, slug, details }
}) => {
    return (
        <Link href={`/product/${slug.current}`}>
            <div className='product-card'>
                <img
                    src={urlFor(image && image[0])}
                    alt='Product-Image'
                    height={250}
                    width={250}
                    className='product-image'
                />
                <p className='product-name'>{name}</p>
                <p className='product-price'>${price}</p>
            </div>
        </Link>
    );
}

export default Product;