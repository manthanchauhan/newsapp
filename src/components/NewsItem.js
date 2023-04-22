import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;

    return (
      <div className="my-3">
        <div className="card" style={{minHeight: '450px'}}>
          <img src={imageUrl} style={{height: '180px'}} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title" style={{height: '100px', overflow: 'hidden'}}>{title}</h5>
            <p className="card-text" style={{height: '100px', overflow: 'hidden'}}>
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
