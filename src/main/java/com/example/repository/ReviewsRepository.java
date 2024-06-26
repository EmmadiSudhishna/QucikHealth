package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Payment;
import com.example.entity.Reviews;

@Repository
public interface ReviewsRepository extends MongoRepository<Reviews, Long> {

	
	 List<Reviews> findByUserId(long userId);
	 List<Reviews> findByDoctorId(long doctorId);
}
