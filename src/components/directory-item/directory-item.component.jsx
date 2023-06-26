import React from "react";
import { useNavigate } from "react-router-dom";

import { DirectoryItemContainer, Body, BackgroundImage } from "./directory-item.style";

const DirectoryItem = ({ category }) => {

    const navigate = useNavigate();

    const { imageUrl, title, subtitle, route } = category;

    const onNavigateHandler = () => navigate(route)

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage style={{backgroundImage: `url(${imageUrl})`}} />
            <Body>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;