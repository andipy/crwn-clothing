import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from '../button/button.component.jsx'
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.style.jsx";

import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
    
    const navigate = useNavigate();

    const { cartItems } = useContext(CartContext);

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ?
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
                :
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={() => navigate('/checkout')}>Go to checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;