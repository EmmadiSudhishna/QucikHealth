package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.Reviews;
import com.example.repository.ReviewsRepository;
import com.example.service.ReviewsService;

@Service
public class ReviewsServiceImpl implements ReviewsService{

	@Autowired
	private ReviewsRepository reviewrepository;

	@Override
	public Reviews createReview(Reviews review) {
		return reviewrepository.save(review);
	}

	@Override
	public Optional<Reviews> getReviewById(long reviewId) {
		return reviewrepository.findById(reviewId);
	}

	@Override
	public List<Reviews> getAllReviews() {
		return reviewrepository.findAll();
	}

	@Override
	public void deleteReview(long reviewId) {
		reviewrepository.deleteById(reviewId);
	}
	
	 @Override
	    public boolean updateReviews(long reviewId, Reviews review) {
	        Optional<Reviews> existingReviewOptional = reviewrepository.findById(reviewId);
	        if (existingReviewOptional.isPresent()) {
	            Reviews existingReview = existingReviewOptional.get();
	            // Update the existing review with the new data
	            existingReview.setRating(review.getRating());
	            existingReview.setReview(review.getReview());
	            // Save the updated review
	            reviewrepository.save(existingReview);
	            return true;
	        } else {
	            return false; // Review with given ID not found
	        }
	    }


	@Override
	public boolean isReviewExist(long reviewId) {
		// TODO Auto-generated method stub
		return reviewrepository.existsById(reviewId);
	}
	
	@Override
    public List<Reviews> getUserReviews(long userId) {
        return reviewrepository.findByUserId(userId);
    }
	
	  @Override
	    public List<Reviews> getReviewsByDoctorId(long doctorId) { 
	        return reviewrepository.findByDoctorId(doctorId);
	    }
	
	

}
