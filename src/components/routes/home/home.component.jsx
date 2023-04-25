import React from 'react';
import { Outlet } from 'react-router-dom';

import Directory from '../../directory/directory.component.jsx'

const Home = () => {  

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
    <>
      <Directory categories={categories} />
      <Outlet />
    </>
  );
}

export default Home;
