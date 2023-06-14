import React, { Component } from "react";

import "./searchbox.style.css";

const SearchBox = ({ className, type, placeholder, onChangeHandler }) => {
    return (
        <input
            className={`search-box ${className}`}
            type={type}
            placeholder={placeholder}
            onChange={onChangeHandler}
        />
    )
}

export default SearchBox;

// class SearchBox extends Component {

//     render() {
//         return (
//             <input
//                 className={`search-box ${this.props.className}`}
//                 type={this.props.type}
//                 placeholder={this.props.placeholder}
//                 onChange={this.props.onChangeHandler}
//             />
//         )
//     }

// }