import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import SampleResponse from "../sampleResponse.json";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  newDotOrgApiKey = "19c312175037427d8eb5e72335c7ad1c";

  static defaultProps = {
    country: "in",
    pageSize: 12,
    defaultImageUrl:
      "https://images.moneycontrol.com/static-mcnews/2022/07/stocks_nifty_sensex-770x433.jpg",
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    defaultImageUrl: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.titleCase(props.category)} - NewsLion`;
  }

  titleCase = (str) => {
    let words = str.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };

  async componentDidMount() {
    await this.fetchData(1);
  }

  handleNextClick = async () => {
    await this.fetchData(this.state.page + 1);
    this.setState({
      page: this.state.page + 1,
    });
  };

  handlePreviousClick = async () => {
    await this.fetchData(this.state.page - 1);
    this.setState({
      page: this.state.page - 1,
    });
  };

  getNewsFromApi = async (page) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.newDotOrgApiKey}&pageSize=${this.props.pageSize}&page=${page}&category=${this.props.category}`;
    let data = await fetch(url);

    let parsedData;

    if (data.status !== 200) {
      parsedData = SampleResponse;
    } else {
      parsedData = await data.json();
    }

    return parsedData;
  }

  fetchData = async (page) => {
    let parsedData = await this.getNewsFromApi(page);

    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
  };

  showPrevButton = () => {
    return !(this.state.page === 1);
  };

  showNextButton = () => {
    return !(this.state.totalResults <= this.state.page * this.props.pageSize);
  };

  getBtnContentJustification = () => {
    if (this.showPrevButton() && this.showNextButton()) {
      return "between";
    } else if (this.showPrevButton()) {
      return "start";
    } else {
      return "end";
    }
  };

  fetchMoreData = async ()=>{
    let parsedData = await this.getNewsFromApi(this.state.page+1);
    
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedData.articles)
    });
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-left">
          Top{" "}
          {this.props.category === "general"
            ? ""
            : `${this.titleCase(this.props.category)} `}
          Headlines
        </h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-4 col-xxl-3"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : this.props.defaultImageUrl
                    }
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
