package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Medicine;
import com.example.entity.Prescription;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, Long>  {

}
