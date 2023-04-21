import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;

    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsUrl} className="btn btn-dark btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
//19c312175037427d8eb5e72335c7ad1c
export default NewsItem;
