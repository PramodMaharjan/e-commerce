import { HeroBanner, FooterBanner, Product } from '../components';
import { client } from '../lib/client';

const index = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Bold Moves, Bold Threads.</p>
      </div>
      <div className='products-container'>
        {products?.map(product => <Product product={product} key={product._id} />)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[1]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData }
  }
}


export default index
