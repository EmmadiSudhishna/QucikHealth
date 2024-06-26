package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.example.entity.Doctor;



public interface DoctorService {
	 Doctor createdoctor(Doctor doctor);
	    Optional<Doctor> getDoctorById(long doctorId);
	    List<Doctor> getAllDoctors();
	    void deleteDoctors(long doctorId);
	    boolean updateDoctors(Doctor doctor);
	    boolean isDoctorExist(long doctorId);
	    public Doctor loginValidate(Doctor doctor);
	    
	    List<Doctor> getDoctorsBySpecializationAndLocation(String specialization, String location);

	    List<String> getAllSpecializations();

	    List<String> getAllLocations();
	    
	    boolean updateDoctorCertificate(long doctorId, String fileName);
	    
	    void updateDoctorStatus(Long id, String newStatus);
}
