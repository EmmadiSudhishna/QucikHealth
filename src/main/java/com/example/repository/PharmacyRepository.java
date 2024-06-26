package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.MedicalHistory;
import com.example.entity.Pharmacy;
import com.example.entity.User;

@Repository
public interface PharmacyRepository  extends MongoRepository<Pharmacy, Long> {

	public Pharmacy findByMobileAndPassword(String mobile, String password);

}
