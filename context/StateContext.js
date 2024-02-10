import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();
const SateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    let foundProduct;

    const increaseQuantity = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decreaseQuantity = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    }
                } else {
                    return {
                        ...cartProduct
                    }
                }
            })
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id);
        const newCartItems = cartItems.filter(item => item._id !== product._id);
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.quantity * foundProduct.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        const toggleCartItem = (operator) => {
            const updatedCartItems = [...cartItems];
            const indexToUpdate = updatedCartItems.findIndex(item => item._id === id);
            if (indexToUpdate !== -1) {
                updatedCartItems[indexToUpdate] = {
                    ...updatedCartItems[indexToUpdate],
                    quantity: operator === '+' ?
                        updatedCartItems[indexToUpdate].quantity + 1 :
                        updatedCartItems[indexToUpdate].quantity - 1
                };
            }
            return updatedCartItems;
        }
        foundProduct = cartItems.find(item => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)
        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setCartItems(toggleCartItem('+'))
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems(toggleCartItem('-'))
                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }
    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            increaseQuantity,
            decreaseQuantity,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
        }}>
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context)

export default SateContext;