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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.Doctor;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.DoctorService;

@RestController
@RequestMapping("/api/v1")
public class DoctorController {
	
	@Autowired
	DoctorService docservice;
	 @Autowired
	    private FileController fileController; 
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	

	@PostMapping("addDoctor")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
		doctor.setDoctorId(databaseaSequencesGeneratorService.generateSequence(Doctor.SEQUENCE_NAME));
        return docservice.createdoctor(doctor);
    }
	
	@PostMapping(value="/doctorLogin")
	public ResponseEntity<Object> doctorLogin(@RequestBody Doctor doctor){
	    Doctor doctor1 = docservice.loginValidate(doctor);
	    return new ResponseEntity<>(doctor1, HttpStatus.OK);
	}
	
	
	
	
	@GetMapping("getDoctorById/{doctorId}")
    public Optional<Doctor> getDoctorById(@PathVariable("doctorId") long doctorId) {
        return docservice.getDoctorById(doctorId);
    }

    @GetMapping("/getAllDoctors")
    public List<Doctor> getAllDoctors() {
        return docservice.getAllDoctors();
    }

    @DeleteMapping("deleteDoctor/{doctorId}")
    public void deleteDoctor(@PathVariable("doctorId") long doctorId) {
        docservice.deleteDoctors(doctorId);
    }
    
    @PutMapping(value = "/updateDoctors/{doctorId}")
    public ResponseEntity<Object> updatedoctor(@PathVariable("doctorId") long doctorId, @RequestBody Doctor doctor) {
        boolean updated = docservice.updateDoctors(doctor);
        if (updated) {
            return new ResponseEntity<>("Doctor updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }
    }
    
    
    
    /*@GetMapping("/getDoctorsBySpecializationAndLocation/{specialization}/{location}")
    public List<Doctor> getDoctorsBySpecializationAndLocation(@PathVariable String specialization, @PathVariable String location) {
        return docservice.getDoctorsBySpecializationAndLocation(specialization, location);
    }*/
    
    @GetMapping("/getDoctorsBySpecializationAndLocation/{specialization}/{location}")
    public List<Doctor> getDoctorsBySpecializationAndLocation(@PathVariable String specialization, @PathVariable String location) {
        List<Doctor> doctors = docservice.getDoctorsBySpecializationAndLocation(specialization, location);
        // Iterate through the list of doctors and fetch detailed information including consultation fee
        for (Doctor doctor : doctors) {
            // Fetch detailed doctor information using the doctorId
            Optional<Doctor> optionalDoctor = docservice.getDoctorById(doctor.getDoctorId());
            if (optionalDoctor.isPresent()) {
                // Update the doctor object with detailed information
                Doctor detailedDoctor = optionalDoctor.get();
                doctor.setConsultationFee(detailedDoctor.getConsultationFee());
                // You can include other details here if needed
            }
        }
        return doctors;
    }


    @GetMapping("/getAllSpecializations")
    public List<String> getAllSpecializations() {
        return docservice.getAllSpecializations();
    }

    @GetMapping("/getAllLocations")
    public List<String> getAllLocations() {
        return docservice.getAllLocations();
    }
    
    
    @PutMapping("/doctors/{id}/updateStatus")
    public ResponseEntity<Object> updateDoctorStatus(@PathVariable("id") Long id, @RequestParam("newStatus") String newStatus) {
        docservice.updateDoctorStatus(id, newStatus);
        Optional<Doctor> updatedDoctor = docservice.getDoctorById(id);
        if (updatedDoctor.isPresent()) {
            return new ResponseEntity<>(updatedDoctor.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }
    }

    
    
    
    
}
