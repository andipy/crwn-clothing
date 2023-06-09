import React from "react";
import { Link } from "react-router-dom";
import './category-preview.style.scss';

import ProductCard from '../product-card/product-card.component.jsx'

const CategoryPreview = ({ title, products }) => {
    return (
        <div className="category-preview-container">
            <h2>
                <Link to={`/shop/${title}`}>
                    <span className="title">{title.toUpperCase()}</span>
                </Link>                
            </h2>
            <div className="preview">
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoryPreview;