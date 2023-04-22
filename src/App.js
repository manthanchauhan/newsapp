import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={12} defaultImageUrl={"https://images.moneycontrol.com/static-mcnews/2022/07/stocks_nifty_sensex-770x433.jpg"}/>
      </div>
    )
  }
}
