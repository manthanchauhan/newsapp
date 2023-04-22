import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import SampleResponse from "../sampleResponse.json"
import PropTypes from 'prop-types'

export class News extends Component {
  newDotOrgApiKey = "19c312175037427d8eb5e72335c7ad1c";

  static defaultProps = {
    country: 'in',
    pageSize: 12,
    defaultImageUrl: 'https://images.moneycontrol.com/static-mcnews/2022/07/stocks_nifty_sensex-770x433.jpg',
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    defaultImageUrl: PropTypes.string,
    category: PropTypes.string,
  }

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

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.newDotOrgApiKey}&pageSize=${this.props.pageSize}&page=${page}&category=${this.props.category}`;
    let data = await fetch(url);

    let parsedData;

    if (data.status !== 200){
      parsedData = SampleResponse;
    } else {
      parsedData = await data.json();
    }

    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    })
    console.log(this.state)
    console.log(parsedData)
    console.log(data)
  }

  showPrevButton = ()=>{
    return !(this.state.page === 1);
  }

  showNextButton = ()=>{
    return !(this.state.totalResults <= this.state.page * this.props.pageSize);
  }

  getBtnContentJustification = ()=>{
    if (this.showPrevButton() && this.showNextButton()){
      return "between";
    } else if (this.showPrevButton()){
      return "start";
    } else {
      return "end";
    }
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
        <div className={`container d-flex justify-content-${this.getBtnContentJustification()}`}>
        {this.showPrevButton() && <button type="button" className="btn btn-dark mx-2" onClick={this.handlePreviousClick}>&larr;</button>}
        {this.showNextButton() && <button type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick}>&rarr;</button>}
        </div>
      </div>
    );
  }
}

export default News;
