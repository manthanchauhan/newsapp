import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  defaultImageUrl = "https://images.moneycontrol.com/static-mcnews/2022/07/stocks_nifty_sensex-770x433.jpg";
  pageSize = 12;

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: null
    };
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=19c312175037427d8eb5e72335c7ad1c&pageSize=${this.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    })
  }

  handleNextClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=19c312175037427d8eb5e72335c7ad1c&page=${this.state.page+1}&pageSize=${this.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
      page: this.state.page+1
    })
  }

  handlePreviousClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=19c312175037427d8eb5e72335c7ad1c&page=${this.state.page-1}&pageSize=${this.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
      page: this.state.page-1
    })
  }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsLion - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage ? element.urlToImage : this.defaultImageUrl}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page === 1} className="btn btn-dark mx-2" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button type="button" disabled={this.state.totalResults <= this.state.page * this.pageSize} className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
