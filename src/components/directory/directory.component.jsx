import React from "react";

import './directory.style.scss';

import DirectoryItem from '../directory-item/directory-item.component.jsx';

const Directory = ({categories}) => {
    return (
      <div className='directory-container'>
          { categories.map(category => {
              return (
              <DirectoryItem category={category} />
              )
          }) }
      </div>
    )
}

export default Directory;