import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl } = props;

  const getPublishedAgoString = () => {
    let publishedAtString = props.publishedAt;

    if (publishedAtString === null) {
      return null;
    }

    let publishedAtDate = new Date(publishedAtString).getTime();
    let currDate = new Date().getTime();

    let yearDiff = Math.floor(
      (currDate - publishedAtDate) / (1000 * 60 * 60 * 24 * 365)
    );

    if (yearDiff > 0) {
      return yearDiff + ` year${yearDiff > 1 ? "s" : ""}`;
    }

    let monthDiff = Math.floor(
      (currDate - publishedAtDate) / (1000 * 60 * 60 * 24 * 30)
    );

    if (monthDiff > 0) {
      return monthDiff + ` month${monthDiff > 1 ? "s" : ""}`;
    }

    let dayDiff = Math.floor(
      (currDate - publishedAtDate) / (1000 * 60 * 60 * 24)
    );

    if (dayDiff > 0) {
      return dayDiff + ` day${dayDiff > 1 ? "s" : ""}`;
    }

    let hourDiff = Math.floor((currDate - publishedAtDate) / (1000 * 60 * 60));

    if (hourDiff > 0) {
      return hourDiff + ` hour${hourDiff > 1 ? "s" : ""}`;
    }

    let minuteDiff = Math.floor((currDate - publishedAtDate) / (1000 * 60));

    if (minuteDiff > 0) {
      return minuteDiff + ` minute${minuteDiff > 1 ? "s" : ""}`;
    }

    return "few seconds";
  };

  const getAuthorName = () => {
    if (props.author !== null) {
      return props.author;
    }

    if (props.source !== null) {
      let sourceName = props.source.name;

      if (sourceName !== null) {
        return sourceName;
      }
    }

    return "Anonymous";
  };

  return (
    <div className="my-3">
      <div className="card" style={{ minHeight: "350px" }}>
        <img
          src={imageUrl}
          style={{ height: "180px" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{ height: "75px", overflow: "hidden" }}
          >
            {title}
          </h5>
          <p className="card-text">
            {getPublishedAgoString() && (
              <small className="text-body-secondary">{`Published ${getPublishedAgoString()} ago`}</small>
            )}
            <br />
            <small className="text-body-secondary">{`By ${getAuthorName()}`}</small>
          </p>
          <p
            className="card-text"
            style={{ height: "75px", overflow: "hidden", marginBottom: "8px" }}
          >
            {description}
          </p>
          <a
            href={newsUrl}
            style={{ color: "black", paddingLeft: "0px" }}
            className="btn btn-link btn-sm stretched-link"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
