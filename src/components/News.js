import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
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
    await this.fetchData(1);
  }

  handleNextClick = async ()=>{
    await this.fetchData(this.state.page+1);
    this.setState({
      page: this.state.page+1
    })
  }

  handlePreviousClick = async ()=>{
    await this.fetchData(this.state.page-1);
    this.setState({
      page: this.state.page-1
    })
  }

  fetchData = async (page)=>{
    this.setState({
      loading: true
    })

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=19c312175037427d8eb5e72335c7ad1c&pageSize=${this.props.pageSize}&page=${page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    })
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsLion - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 col-xxl-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage ? element.urlToImage : this.props.defaultImageUrl}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page === 1} className="btn btn-dark mx-2" onClick={this.handlePreviousClick}>&larr; Prev</button>
        <button type="button" disabled={this.state.totalResults <= this.state.page * this.props.pageSize} className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
