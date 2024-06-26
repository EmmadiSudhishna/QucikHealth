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
import com.example.entity.Pharmacy;
import com.example.entity.PrescriptionTransferRequest;
import com.example.entity.User;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.PharmacyService;
import com.example.service.PrescriptionService;

@RestController
@RequestMapping("api/v1")
public class PharmacyController {
	
	@Autowired
	private PharmacyService pharmacyservice;
	
	
	@Autowired
	private PrescriptionService prescriptionService;
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addPharmacy")
	public Pharmacy createPharmacy(@RequestBody Pharmacy pharmacy) {
		pharmacy.setPharmacyId(databaseaSequencesGeneratorService.generateSequence(Pharmacy.SEQUENCE_NAME));
		return pharmacyservice.createPharmacy(pharmacy);
	}
	
	@PostMapping(value="/pharmacyLogin")
	public ResponseEntity<Object> pharmacyLogin(@RequestBody Pharmacy pharmacy){
	    Pharmacy pharmacy1 = pharmacyservice.loginValidate(pharmacy);
	    return new ResponseEntity<>(pharmacy1, HttpStatus.OK);
	}
	
	@GetMapping("getPharmacyById/{pharmacyId}")
    public Optional<Pharmacy> getPharmacyById(@PathVariable("pharmacyId") long pharmacyId) {
        return pharmacyservice.getPharmacyById(pharmacyId);
    }
	
	
	@GetMapping("/getAllPharmacies")
    public List<Pharmacy> getAllPrescriptions() {
        return pharmacyservice.getAllPharmacies();
    }

    @DeleteMapping("deletePharmacy/{pharmacyId}")
    public void deletePharmacy(@PathVariable("pharmacyId") long pharmacyId) {
    	pharmacyservice.deletePharmacyById(pharmacyId);
    }
    
    @PutMapping(value = "/updatePharmacy/{pharmacyId}")
    public ResponseEntity<Object> updatePharmacy(@PathVariable("pharmacyId") long pharmacyId, @RequestBody Pharmacy pharmacy) {
        boolean updated = pharmacyservice.updatePharmacy(pharmacy);
        if (updated) {
            return new ResponseEntity<>("Pharmacy updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Pharmacy not found", HttpStatus.NOT_FOUND);
        }
    }
    
    
    @PostMapping("/prescriptions/transfer/{pharmacyId}")
	public ResponseEntity<String> transferPrescriptions(@PathVariable("pharmacyId") long pharmacyId, @RequestBody PrescriptionTransferRequest request) {
		boolean success = prescriptionService.transferPrescriptions(pharmacyId, request.getPrescriptions(), request.getAppointmentId());
		if (success) {
			return new ResponseEntity<>("Your prescription is ordered to the pharmacy", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to transfer prescriptions", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


}
