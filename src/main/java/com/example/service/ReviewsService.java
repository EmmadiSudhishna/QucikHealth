package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Doctor;
import com.example.entity.Reviews;

public interface ReviewsService {

	Reviews createReview(Reviews review);
	Optional<Reviews> getReviewById(long reviewId);
	List<Reviews> getAllReviews();
	void deleteReview(long reviewId);
	boolean updateReviews(long reviewId, Reviews reviews);
	boolean isReviewExist(long reviewId);
	List<Reviews> getUserReviews(long userId);
	List<Reviews> getReviewsByDoctorId(long doctorId);

}
