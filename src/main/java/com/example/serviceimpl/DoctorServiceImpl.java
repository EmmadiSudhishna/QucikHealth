package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Doctor;
import com.example.repository.DoctorRepository;
import com.example.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService {
	@Autowired
    private DoctorRepository doctorRepository;

	

	@Override
	public Doctor loginValidate(Doctor doctor) {
		Doctor doctor1= doctorRepository.findByMobileAndPassword(doctor.getMobile(), doctor.getPassword());
		System.out.println("what is there in Doctor=" + doctor1);
		return doctor1;
	}

	
	@Override
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}

	@Override
	public Doctor createdoctor(Doctor doctor) {
		// TODO Auto-generated method stub
		return doctorRepository.save(doctor);
	}

	@Override
	public Optional<Doctor> getDoctorById(long doctorId) {
		// TODO Auto-generated method stub
		return doctorRepository.findById(doctorId);
	}

	@Override
	public void deleteDoctors(long doctorId) {
		// TODO Auto-generated method stub
		doctorRepository.deleteById(doctorId);
	}
	
	@Override
	public boolean updateDoctors(Doctor doctor) {
		// TODO Auto-generated method stub
		if (isDoctorExist(doctor.getDoctorId())) {
            doctorRepository.save(doctor);
            return true;
        }

		return false;
	}


	@Override
	public boolean isDoctorExist(long doctorId) {
		// TODO Auto-generated method stub
		return doctorRepository.existsById(doctorId);
	}
	
	
	
	 @Override
	    public List<Doctor> getDoctorsBySpecializationAndLocation(String specialization, String location) {
	        return doctorRepository.findBySpecializationAndHospitalLocation(specialization, location);
	    }

	    @Override
	    public List<String> getAllSpecializations() {
	        List<Doctor> doctors = doctorRepository.findDistinctBySpecialization();
	        return doctors.stream().map(Doctor::getSpecialization).distinct().collect(Collectors.toList());
	    }

	    @Override
	    public List<String> getAllLocations() {
	        List<Doctor> doctors = doctorRepository.findDistinctByHospitalLocation();
	        return doctors.stream().map(Doctor::getHospitalLocation).distinct().collect(Collectors.toList());
	    }

	    @Override
	    public boolean updateDoctorCertificate(long doctorId, String filename) {
	        Optional<Doctor> optionalDoctor = getDoctorById(doctorId);
	        if (optionalDoctor.isPresent()) {
	            Doctor doctor = optionalDoctor.get();
	            // Update the doctor's certificate field with the filename
	            doctor.setCertificate(filename);
	            doctorRepository.save(doctor);
	            return true;
	        }
	        return false;
	    }
	    
	    @Override
	    @Transactional
	    public void updateDoctorStatus(Long id, String newStatus) {
	        Doctor doctor = doctorRepository.findById(id).orElse(null);
	        if (doctor != null) {
	            doctor.setStatus(newStatus);
	            doctorRepository.save(doctor);
	        }
	    }
	//By annotating a method with @Transactional, Spring manages transactions for that method. 
	    //A transaction ensures that a series of operations (like fetching an entity from the 
	    //database, modifying it, and saving it back) are treated as a single unit of work. 
	    //If any part of the transaction fails (due to an exception, for example), Spring will roll back (undo) the changes made in that transaction,
	    //maintaining data consistency.


	

}
