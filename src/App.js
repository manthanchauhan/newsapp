import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {progress: 0}

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <React.StrictMode>
          <Navbar/>
          <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          height={4}/>
          <Routes>
            <Route path="/" element={<News key="general" pageSize={12} country={"in"} category={"general"} setProgress={this.setProgress}/>}/>
            <Route path="/business" element={<News key="business" pageSize={12} country={"in"} category={"business"} setProgress={this.setProgress}/>}/>
            <Route path="/entertainment" element={<News key="entertainment" pageSize={12} country={"in"} category={"entertainment"} setProgress={this.setProgress}/>}/>
            <Route path="/health" element={<News key="health" pageSize={12} country={"in"} category={"health"} setProgress={this.setProgress}/>}/> 
            <Route path="/science" element={<News key="science" pageSize={12} country={"in"} category={"science"} setProgress={this.setProgress}/>}/> 
            <Route path="/sports" element={<News key="sports" pageSize={12} country={"in"} category={"sports"} setProgress={this.setProgress}/>}/>
            <Route path="/technology" element={<News key="technology" pageSize={12} country={"in"} category={"technology"} setProgress={this.setProgress}/>}/>
          </Routes>
          
        </React.StrictMode>
      </div>
    )
  }
}
