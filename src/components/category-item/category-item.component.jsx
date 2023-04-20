import React from "react";

import './category-item.style.scss';

const CategoryItem = ({ category }) => {
    const { id, imageUrl, title, subtitle } = category;

    return (
        <div className="category-container" key={id}>
            <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}} />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}

export default CategoryItem;