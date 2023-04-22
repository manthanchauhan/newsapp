import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <React.StrictMode>
          <Navbar/> 
          <Routes>
            <Route path="/" element={<News key="general" pageSize={12} country={"in"} category={"general"}/>}/>
            <Route path="/business" element={<News key="business" pageSize={12} country={"in"} category={"business"}/>}/>
            <Route path="/entertainment" element={<News key="entertainment" pageSize={12} country={"in"} category={"entertainment"}/>}/>
            <Route path="/health" element={<News key="health" pageSize={12} country={"in"} category={"health"}/>}/> 
            <Route path="/science" element={<News key="science" pageSize={12} country={"in"} category={"science"}/>}/> 
            <Route path="/sports" element={<News key="sports" pageSize={12} country={"in"} category={"sports"}/>}/>
            <Route path="/technology" element={<News key="technology" pageSize={12} country={"in"} category={"technology"}/>}/>
          </Routes>
        </React.StrictMode>
      </div>
    )
  }
}
