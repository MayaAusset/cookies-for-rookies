/* import React from 'react';
//import './Rating.css';

const Rating = (rating) => {

  
  
    //let n = this.props.children
    return (
      <div className="Rating">
        {rating >= 0.5 ? '★' : '☆'}
        {rating >= 1.5 ? '★' : '☆'}
        {rating >= 2.5 ? '★' : '☆'}
        {rating >= 3.5 ? '★' : '☆'}
        {rating >= 4.5 ? '★' : '☆'}
      </div>
    );
  
}

export default Rating; */

import React, { Component } from 'react';
//import './Rating.css';

class Rating extends Component {
  render() {
    let n = this.props.children
    return (
      <div className="Rating">
        {n >= 1 ? '★' : '☆'}
        {n >= 2 ? '★' : '☆'}
        {n >= 3 ? '★' : '☆'}
        {n >= 4 ? '★' : '☆'}
        {n >= 5 ? '★' : '☆'}
      </div>
    );
  }
}

export default Rating;
