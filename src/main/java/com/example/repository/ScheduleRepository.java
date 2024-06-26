package com.example.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Appointments;
import com.example.entity.Schedule;

@Repository
public interface ScheduleRepository extends MongoRepository<Schedule, Long> {
	
	List<Schedule>getSchedulesByDoctorId(long doctorId);

}
