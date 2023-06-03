import React, { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    // if so, increment the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    // return new array with modified cartItems
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    // find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    // check if quantity is equal to one
    if ( existingCartItem.quantity === 1 )  {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }

    // if more than 1, return back cartItems with decremented quantity
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
}

const completelyRemoveCartItem = (cartItems, productToCompletelyRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToCompletelyRemove.id);

    if ( existingCartItem ) {
        return cartItems.filter((cartItem) => cartItem.id !== productToCompletelyRemove.id)
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    completelyRemoveItemFromCart: () => {},
    cartCount: 0,
    cartTotalValue: 0,
    setCartTotalValue: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalValue, setCartTotalValue] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const updateCartTotalValue = cartItems.reduce((acc, cartItem) => {
            return acc + cartItem.price * cartItem.quantity;
        }, 0);
        setCartTotalValue(updateCartTotalValue);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }
    const completelyRemoveItemFromCart = (productToCompletelyRemove) => {
        setCartItems(completelyRemoveCartItem(cartItems, productToCompletelyRemove))
    }

    return (
        <CartContext.Provider value={{isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, completelyRemoveItemFromCart, cartCount, cartTotalValue}}>{children}</CartContext.Provider>
    )
}