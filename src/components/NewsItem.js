import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;

    return (
      <div className="my-3">
        <div className="card" style={{minHeight: '350px'}}>
          <img src={imageUrl} style={{height: '180px'}} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title" style={{height: '75px', overflow: 'hidden'}}>{title}</h5>
            <p className="card-text" style={{height: '75px', overflow: 'hidden', marginBottom: '8px'}}>
              {description}
            </p>
            <a href={newsUrl} style={{color: 'black'}} className="btn btn-link btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
