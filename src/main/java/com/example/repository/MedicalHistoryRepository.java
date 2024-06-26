package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.MedicalHistory;
import com.example.entity.Medicine;

@Repository
public interface MedicalHistoryRepository extends MongoRepository<MedicalHistory, Long> {
	List<MedicalHistory>findByUserId(int userId);

}
