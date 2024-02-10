import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import Cart from './Cart';

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    return (
        <div className='navbar-container'>
            <p>
                <Link href='/' passHref>
                    <a className='navbar-logo'>GYMSHARK</a>
                </Link>
            </p>
            <button type='button' className='cart-icon' onClick={() => setShowCart(prevState => !prevState)}>
                <AiOutlineShopping />
                <span className='cart-item-qty'>{totalQuantities}</span>
            </button>
            {showCart && <Cart />}
        </div>
    );
}

export default Navbar;