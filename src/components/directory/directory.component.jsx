import React from "react";

import './directory.style.scss';

import CategoryItem from '../category-item/category-item.component.jsx';

const Directory = () => {

    const categories = [
        {
          "id": 1,
          "title": "hats",
          "subtitle": "Shop now",
          "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
        },
        {
          "id": 2,
          "title": "jackets",
          "subtitle": "Shop now",
          "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
        },
        {
          "id": 3,
          "title": "sneakers",
          "subtitle": "Shop now",
          "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
        },
        {
          "id": 4,
          "title": "womens",
          "subtitle": "Shop now",
          "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
        },
        {
          "id": 5,
          "title": "mens",
          "subtitle": "Shop now",
          "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
        }
      ];

    return (
      <div className='directory-container'>
          { categories.map(category => {
              return (
              <CategoryItem category={category} />
              )
          }) }
      </div>
    )
}

export default Directory;