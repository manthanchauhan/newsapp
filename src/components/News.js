import React, {useState, useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import SampleResponse from "../sampleResponse.json";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const titleCase = (str) => {
    let words = str.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };

  const fetchData = async (page, ifShowPgb) => {
    props.setProgress(10)

    let parsedData = await getNewsFromApi(page, ifShowPgb);

    if (ifShowPgb){
      props.setProgress(90)
    }

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
  };

  useEffect(() => {
    props.setProgress(0);
    fetchData(1, true).then(()=>{props.setProgress(100);})
    document.title = `${titleCase(props.category)} - NewsLion`;

  }, [])

  const getNewsFromApi = async (page, ifShowPgb) => {
    if (ifShowPgb){
      props.setProgress(20)
    }
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.newsDotOrgApiKey}&pageSize=${props.pageSize}&page=${page}&category=${props.category}`;
    let data = await fetch(url);
    
    if (ifShowPgb){
      props.setProgress(50)
    }

    let parsedData;

    if (data.status !== 200) {
      parsedData = SampleResponse;
    } else {
      parsedData = await data.json();
    }

    if (ifShowPgb){
      props.setProgress(80)
    }

    return parsedData;
  }

  const fetchMoreData = async ()=>{
    let parsedData = await getNewsFromApi(page+1, false);
    
    setPage(page+1)
    setArticles(articles.concat(parsedData.articles))
  }

    return (
      <div className="container my-3">
        <h1 className="text-left" style={{marginTop: '70px'}}>
          Top{" "}
          {props.category === "general"
            ? ""
            : `${titleCase(props.category)} `}
          Headlines
        </h1>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
          <div className="row">
            {articles.map((element) => {
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
                        : props.defaultImageUrl
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

News.defaultProps = {
  country: "in",
  pageSize: 12,
  defaultImageUrl:
    "https://images.moneycontrol.com/static-mcnews/2022/07/stocks_nifty_sensex-770x433.jpg",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  defaultImageUrl: PropTypes.string,
  category: PropTypes.string,
};

export default News;
