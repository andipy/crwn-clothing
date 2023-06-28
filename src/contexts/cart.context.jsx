import React, { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotalValue: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {...state, ...payload}
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload}            
        default:
            throw new Error("cart reducer case not handled")
    }
}

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

const deleteCartItem = (cartItems, productToCompletelyRemove) => {
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
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotalValue: 0,
    setCartTotalValue: () => {}
});

export const CartProvider = ({children}) => {

    const [ { cartItems, isCartOpen, cartCount, cartTotalValue }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        // generate new cart total
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    
        // generate new cart count
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS, 
                { 
                    cartItems: newCartItems,
                    cartTotalValue: newCartTotal,
                    cartCount: newCartCount
                }
            )

        )

    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const deleteItemFromCart = (productToCompletelyRemove) => {
        const newCartItems = deleteCartItem(cartItems, productToCompletelyRemove);
        updateCartItemsReducer(newCartItems);
    }
    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_IS_CART_OPEN,
                bool
            )
        )
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        cartItems,
        cartCount,
        cartTotalValue
    }

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}