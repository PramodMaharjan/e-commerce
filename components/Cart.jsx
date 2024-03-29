import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast';
const Cart = () => {
    const { setShowCart, totalQuantities, cartItems, totalPrice, toggleCartItemQuantity, onRemove } = useStateContext();
    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems),
        });

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div className='cart-wrapper'>
            <div className='cart-container'>
                <button
                    type='button'
                    className='cart-heading'
                    onClick={() => setShowCart(prevState => !prevState)}
                >
                    <AiOutlineLeft />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>({totalQuantities} items)</span>
                </button>
                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={150} />
                        <h3>Your shopping bag is empty.</h3>
                        <Link href='/'>
                            <button
                                type='button'
                                className='btn'
                                onClick={() => setShowCart(prevState => !prevState)}
                            >
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
                <div className='product-container'>
                    {cartItems.length >= 1 && cartItems.map((item, index) => (
                        <div className='product' key={item._id}>
                            <img src={urlFor(item?.image[0])} alt='Cart-Product-Image' className='cart-product-image' />
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className='flex bottom'>
                                    <p className='quantity-desc'>
                                        <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                                        <span className='num'>{item.quantity}</span>
                                        <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                                    </p>
                                    <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button
                                type='button'
                                className='btn'
                                onClick={handleCheckout}
                            >
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;