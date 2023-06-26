import React, { useContext } from "react";
import './product-card.style.scss'

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component.jsx';

import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ product }) => {

    const { addItemToCart } = useContext(CartContext);

    const { name, price, imageUrl } = product;

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt="" />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => addItemToCart(product)}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;