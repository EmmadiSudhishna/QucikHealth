package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Doctor;
import com.example.entity.Reviews;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.ReviewsService;

@RestController
@RequestMapping("/api/v1")
public class ReviewsController {
	
	@Autowired
	private ReviewsService reviewsservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addReview")
    public Reviews addReview(@RequestBody Reviews review) {
		review.setReviewId(databaseaSequencesGeneratorService.generateSequence(Reviews.SEQUENCE_NAME));
        return reviewsservice.createReview(review);
    }
	
	@GetMapping("getReviewById/{reviewId}")
    public Optional<Reviews> getReviewById(@PathVariable("reviewId") long reviewId) {
        return reviewsservice.getReviewById(reviewId);
    }

    @GetMapping("/getAllReviews")
    public List<Reviews> getAllReviews() {
        return reviewsservice.getAllReviews();
    }

    @DeleteMapping("deleteReview/{reviewId}")
    public void deleteReview(@PathVariable("reviewId") long reviewId) {
    	reviewsservice.deleteReview(reviewId);
    }
    
    @PutMapping(value = "/updateReviews/{reviewId}")
    public ResponseEntity<Object> updatereview(@PathVariable("reviewId") long reviewId, @RequestBody Reviews review) {
        boolean updated = reviewsservice.updateReviews(reviewId, review);
        if (updated) {
            return new ResponseEntity<>("Review updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Review not found", HttpStatus.NOT_FOUND);
        }
    }

    
    @GetMapping("/userReviews/{userId}")
    public ResponseEntity<List<Reviews>> getUserReviews(@PathVariable("userId") long userId) {
        List<Reviews> userReviews = reviewsservice.getUserReviews(userId);
        if (userReviews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userReviews, HttpStatus.OK);
    }
    
    @GetMapping("/reviews/doctor/{doctorId}")
    public ResponseEntity<List<Reviews>> getReviewsByDoctorId(@PathVariable("doctorId") long doctorId) {
        List<Reviews> reviews = reviewsservice.getReviewsByDoctorId(doctorId);
        if (reviews.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }






}
