package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entity.Admin;
import com.example.entity.Doctor;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, Long> {

	public Doctor findByMobileAndPassword(String mobile, String password);

	List<Doctor> findBySpecializationAndHospitalLocation(String specialization, String hospitalLocation);

    @Query(value = "{}", fields = "{'specialization' : 1}")
    List<Doctor> findDistinctBySpecialization();

    @Query(value = "{}", fields = "{'hospitalLocation' : 1}")
    List<Doctor> findDistinctByHospitalLocation();
}
