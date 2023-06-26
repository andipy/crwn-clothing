import React from 'react';
import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component.jsx'

const Home = () => {
  return (
    <>
      <Directory />
      <Outlet />
    </>
  );
}

export default Home;
