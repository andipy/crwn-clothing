import React, { Component } from "react";

import Card from "../card/card.component";

import "./cardlist.style.css";

const CardList = ({ monsters }) => {
    return (
        <div className="card-list">
            {monsters.map(monster => {
                return (
                    <Card key={monster.id} monster={monster} />                        
                )
            })}
        </div>
    )
}

export default CardList;

// class CardList extends Component {
//     render() {
//         const { monsters } = this.props;
//         return (
//             <div className="card-list">
//                 {monsters.map(monster => {
//                     return (
//                         <Card monster={monster} />                        
//                     )
//                 })}
//             </div>
//         )
//     }
// }

