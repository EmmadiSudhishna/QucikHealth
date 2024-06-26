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
import com.example.entity.MedicalHistory;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.MedicalHistoryService;


@RestController
@RequestMapping("/api/v1")
public class MedicalHistoryController {
	
	@Autowired
	MedicalHistoryService medicalhistoryservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	

	 @PostMapping("/createMedicalHistory")
	    public MedicalHistory createMedicalHistory(@RequestBody MedicalHistory medicalhistory) {
	    	medicalhistory.setMedicalId(databaseaSequencesGeneratorService.generateSequence(MedicalHistory.SEQUENCE_NAME));
	        return medicalhistoryservice.createMedicalHistory(medicalhistory);
	    }
	 
	 @GetMapping("/getMedicalHistoryByMedicalId/{medicalId}")
	    public Optional<MedicalHistory> getMedicalHistoryByMedicalId(@PathVariable("medicalId") long medicalId) {
	        return medicalhistoryservice.getMedicalHistoryByMedicalId(medicalId);
	    }

	    /*@GetMapping("/getAllMedicalHistory")
	    public List<MedicalHistory> getAllMedicalHistory() {
	        return medicalhistoryservice.getAllMedicalHistory();
	    }*/
	 @GetMapping("/medical-history/{userId}")
	    public ResponseEntity<List<MedicalHistory>> getAllMedicalHistoryByUserId(@PathVariable int userId) {
	        List<MedicalHistory> medicalHistory = medicalhistoryservice.getMedicalHistoryByUserId(userId);
	        return new ResponseEntity<>(medicalHistory, HttpStatus.OK);
	    }
	    
	    @DeleteMapping("/deleteMedicalHistory/{medicalId}")
	    public void deleteMedicalHistory(@PathVariable("medicalId") long medicalId) {
	    	medicalhistoryservice.deleteMedicalHistory(medicalId);
	    }
	    
	    @PutMapping(value = "/updateMedicalHistory/{medicalId}")
	    public ResponseEntity<Object> updateMedicalHistory(@PathVariable("medicalId") long medicalId, @RequestBody MedicalHistory medicalhistory) {
	        boolean updated = medicalhistoryservice.updateMedicalHistory(medicalhistory);
	        if (updated) {
	            return new ResponseEntity<>("MedicalHistory updated successfully", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("MedicalHistory not found", HttpStatus.NOT_FOUND);
	        }
	    }
	    
	    @GetMapping("/user/{userId}")
	    public ResponseEntity<List<MedicalHistory>> getMedicalHistoryByUserId(@PathVariable int userId) {
	        List<MedicalHistory> medicalHistory = medicalhistoryservice.getMedicalHistoryByUserId(userId);
	        return new ResponseEntity<>(medicalHistory, HttpStatus.OK);
	    }
	    
	    


	
	
	
	
}
