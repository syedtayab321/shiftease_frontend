import React, { useState } from 'react';
import './../../assets/Providercss/Reviews.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    { id: 1, clientName: 'John Doe', review: 'Great service, highly recommend!', rating: 5, date: '2024-08-20' },
    { id: 2, clientName: 'Jane Smith', review: 'Very satisfied with the home shifting package.', rating: 4, date: '2024-08-18' },
    { id: 3, clientName: 'Sam Wilson', review: 'Good experience, but could be improved.', rating: 3, date: '2024-08-15' }
  ]);

  return (
    <div className="reviews-page-container">
      <h2 className="reviews-page-header">Client Reviews</h2>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-card">
              <h3 className="review-client-name">{review.clientName}</h3>
              <p className="review-text">{review.review}</p>
              <p className="review-rating">Rating: {review.rating} / 5</p>
              <p className="review-date">{review.date}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews found</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
