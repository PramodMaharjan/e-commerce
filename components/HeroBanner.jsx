import { urlFor } from '../lib/client';
import Link from 'next/link';

const HeroBanner = ({ heroBanner: {
    smallText,
    midText,
    largeText1,
    image,
    product,
    buttonText,
    desc
} }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="hero-banner-small">{smallText}</p>
                <h3>{midText}</h3>
                <h1>{largeText1}</h1>
                <img src={urlFor(image)} alt="Hero-Banner-Image" className="hero-banner-image" />
                <div>
                    <Link href={`/product/${product}`}>
                        <button type='button'>{buttonText}</button>
                    </Link>
                    <div className="desc">
                        {/* <h5>Description</h5> */}
                        <p>{desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;