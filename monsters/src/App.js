import React, { useState, useEffect, Component } from 'react';

import CardList from './components/card-list/cardlist.component';
import SearchBox from './components/search-box/searchbox.component';

import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState("");
  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchField(searchFieldString);
  }

  const [monsters, setMonsters] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users))
      .catch(error => console.log("There was an unexpected error :(", error));
  }, [])

  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  useEffect(() => {
    setFilteredMonsters(monsters.filter(item => item.name.toLowerCase().includes(searchField)));
  }, [monsters, searchField])

  console.log("render");

  return(
    <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox
          className={"monster-search-box"}
          type={"search"}
          placeholder={"Search a monster"}
          onChangeHandler={onSearchChange}          
        />     
        <CardList monsters={filteredMonsters} />
      </div>
  )
}

export default App;

// class App extends Component {

//   constructor() {
//     console.log("constructor")
//     super();

//     this.state = {
//       monsters: [],
//       searchString: ""
//     }
//   }

//   componentDidMount() {
//     console.log("component mount")
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(users => this.setState(() => {
//         return (
//           {
//             monsters: users
//           }
//         )
//       }, () => {
//         console.log(this.state.monsters)
//       }))
//       .catch(error => console.log("There was an unexpected error :(", error));      
//   }

//   onSearchChange = (e) => {
//     const searchField = e.target.value.toLowerCase();
//     this.setState(() => { return {searchString: searchField} });
//   }

//   render() {
//     console.log("render");

//     const { monsters, searchString } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter(item => item.name.toLowerCase().includes(searchString));

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>
//         <SearchBox
//           className={"monster-search-box"}
//           type={"search"}
//           placeholder={"Search a monster"}
//           onChangeHandler={onSearchChange}          
//         />        
//         <CardList monsters={filteredMonsters} />        
//       </div>
//     );
//   }  
// }