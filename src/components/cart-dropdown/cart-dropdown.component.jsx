import React, { useContext } from "react";
import './cart-dropdown.style.scss';

import Button from '../button/button.component.jsx'
import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
            </div>
            <Button>Go to checkout</Button>
        </div>
    )
}

export default CartDropdown;