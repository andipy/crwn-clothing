import React from "react";

import './directory-item.style.scss';

const DirectoryItem = ({ category }) => {
    const { id, imageUrl, title, subtitle } = category;

    return (
        <div className="directory-item-container" key={id}>
            <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}} />
            <div className="body">
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}

export default DirectoryItem;